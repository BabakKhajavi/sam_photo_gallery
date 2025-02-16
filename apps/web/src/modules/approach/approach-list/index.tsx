import { useCallback, useState, useMemo, FC } from 'react';
import { ConfirmationModal, GenericTable } from '@packages/organisms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import TableSearch from '@packages/organisms/src/search/table-search';
import { IPlan } from '@packages/common';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useAppNavigate, useDashboardAlert } from '../../../hooks';
import {
  useDeleteApproachMutation,
  useGetApproachesQuery,
} from '../approach-api-slice';
import { BoxLoading } from '@packages/molecules';
import { DashboardPaths } from '../../../types';

export const ApproachListContainer: FC = () => {
  useDashboardAlert();
  const { data: approaches, isLoading } = useGetApproachesQuery(undefined, {
    refetchOnMountOrArgChange: 120, // fresh after two minutes after the last fetch
  });
  const [deleteApproach] = useDeleteApproachMutation();
  const { navigateToPage } = useAppNavigate();

  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSearchString = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const filteredApproaches = useMemo(() => {
    if (!approaches) {
      return [];
    }

    if (!searchString) {
      return approaches;
    }

    const lowerCaseSearchString = searchString.toLowerCase();

    return approaches.filter(
      (approach) =>
        approach.title.toLowerCase().includes(lowerCaseSearchString) ||
        approach.summary.toLowerCase().includes(lowerCaseSearchString) ||
        approach.description.toLowerCase().includes(lowerCaseSearchString),
    );
  }, [searchString, approaches]);

  const handleButtonClick = useCallback(() => {
    navigateToPage(
      DashboardPaths.APPROACH_DETAIL,
      'Create Approach',
      DashboardPaths.APPROACH,
      'Approach List',
      'new',
    );
  }, [navigateToPage]);

  const handleEditClick = useCallback(
    (params: GridRowParams | GridRenderCellParams) => {
      const item = params.row as IPlan;

      navigateToPage(
        DashboardPaths.APPROACH_DETAIL,
        'Edit Approach',
        DashboardPaths.APPROACH,
        'Approach List',
        item.id,
      );
    },
    [navigateToPage],
  );

  const handleDeleteClick = useCallback((params: GridRenderCellParams) => {
    const item = params.row as IPlan;
    setSelectedDeleteId(item?.id ?? null);
    setIsOpen(true);
  }, []);

  const handleSubmitDelete = useCallback(async () => {
    if (selectedDeleteId) {
      await deleteApproach(selectedDeleteId).unwrap();
    }
    setIsOpen(false);
  }, [deleteApproach, selectedDeleteId]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'step',
        headerName: 'Step',
        flex: 1,
      },
      {
        field: 'title',
        headerName: 'Title',
        width: 150,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        headerAlign: 'center',
        width: 150,
        renderCell: (params) => (
          <>
            <IconButton
              color="primary"
              onClick={() => handleEditClick(params)}
              sx={{ fontSize: '14px' }}
            >
              <EditIcon sx={{ fontSize: 18 }} /> Edit
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleDeleteClick(params)}
              sx={{ fontSize: '14px' }}
            >
              <DeleteIcon sx={{ fontSize: 18 }} /> Delete
            </IconButton>
          </>
        ),
      },
    ],
    [handleEditClick, handleDeleteClick],
  );

  if (isLoading) {
    return <BoxLoading />;
  }

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: '10px',
        minHeight: '650px',
      }}
    >
      <TableSearch
        searchString={searchString}
        handleSearchString={handleSearchString}
        placeholder="Search by title, summary or description"
        buttonText="Create Approach"
        handleButtonClick={handleButtonClick}
      />

      <GenericTable columns={columns} rows={filteredApproaches ?? []} />

      {isOpen && (
        <ConfirmationModal
          title={'Confirm Delete Approach'}
          message={
            'By clicking confirm, this approach will be removed permanently. If you are sure, press confirm.'
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleAction={handleSubmitDelete}
        />
      )}
    </Box>
  );
};
