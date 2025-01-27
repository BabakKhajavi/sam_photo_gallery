import { useCallback, useState, useMemo } from 'react';
import { ConfirmationModal, GenericTable } from '@packages/organisms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import TableSearch from '@packages/organisms/src/search/table-search';
import { IFindUs } from '@packages/common';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useAppNavigate, useDashboardAlert } from '../../../hooks';
import {
  useDeleteFindUsMutation,
  useGetFindUsQuery,
} from '../findus-api-slice';
import { BoxLoading } from '@packages/molecules';
import { DashboardPaths } from '../../../types';

export function FindUsListContainer() {
  useDashboardAlert();
  const { navigateToPage } = useAppNavigate();
  const { data: findus, isLoading } = useGetFindUsQuery(undefined, {
    refetchOnMountOrArgChange: 120, // fresh after two minutes after the last fetch
  });
  const [deleteFindUs] = useDeleteFindUsMutation();

  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSearchString = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const filteredFindUss = useMemo(() => {
    if (!findus) {
      return [];
    }

    if (!searchString) {
      return findus;
    }

    const lowerCaseSearchString = searchString.toLowerCase();
    return findus.filter((findus) =>
      findus.type.toLowerCase().includes(lowerCaseSearchString),
    );
  }, [searchString, findus]);

  const handleButtonClick = useCallback(() => {
    navigateToPage(
      DashboardPaths.FIND_US_DETAIL,
      'Create Find Us',
      DashboardPaths.FIND_US,
      'Find Us List',
      'new',
    );
  }, [navigateToPage]);

  const handleEditClick = useCallback(
    (params: GridRowParams | GridRenderCellParams) => {
      const item = params.row as IFindUs;

      navigateToPage(
        DashboardPaths.FIND_US_DETAIL,
        'Edit Find Us',
        DashboardPaths.FIND_US,
        'Find Us List',
        item.id,
      );
    },
    [navigateToPage],
  );

  const handleDeleteClick = useCallback((params: GridRenderCellParams) => {
    const item = params.row as IFindUs;
    setSelectedDeleteId(item?.id ?? null);
    setIsOpen(true);
  }, []);

  const handleSubmitDelete = useCallback(async () => {
    if (selectedDeleteId) {
      await deleteFindUs(selectedDeleteId).unwrap();
    }
    setIsOpen(false);
  }, [deleteFindUs, selectedDeleteId]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'type',
        headerName: 'FindUs Type',
        flex: 1,
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
        placeholder="Search by type"
        buttonText="Create FindUs"
        handleButtonClick={handleButtonClick}
      />

      <GenericTable columns={columns} rows={filteredFindUss ?? []} />

      {isOpen && (
        <ConfirmationModal
          title={'Confirm Delete FindUs'}
          message={
            'By clicking confirm, this findus will be removed permanently. If you are sure, press confirm.'
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleAction={handleSubmitDelete}
        />
      )}
    </Box>
  );
}
