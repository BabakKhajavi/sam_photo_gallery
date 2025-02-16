import { useCallback, useState, useMemo } from 'react';
import { ConfirmationModal, GenericTable } from '@packages/organisms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import TableSearch from '@packages/organisms/src/search/table-search';
import { IJumbotron } from '@packages/common';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useAppNavigate, useDashboardAlert } from '../../../hooks';
import {
  useDeleteJumbotronMutation,
  useGetJumbotronsQuery,
} from '../jumbotron-api-slice';
import { BoxLoading } from '@packages/molecules';
import { PrimaryCheckbox } from '@packages/atoms';
import { DashboardPaths } from '../../../types';

export function JumbotronListContainer() {
  useDashboardAlert();
  const { navigateToPage } = useAppNavigate();
  const { data: jumbotrons, isLoading } = useGetJumbotronsQuery(undefined, {
    refetchOnMountOrArgChange: 120, // fresh after two minutes after the last fetch
  });
  const [deleteJumbotron] = useDeleteJumbotronMutation();

  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSearchString = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const filteredJumbotrons = useMemo(() => {
    if (!jumbotrons) {
      return [];
    }

    if (!searchString) {
      return jumbotrons;
    }

    const lowerCaseSearchString = searchString.toLowerCase();

    return jumbotrons.filter(
      (gallery) =>
        gallery.title.toLowerCase().includes(lowerCaseSearchString) ||
        gallery.subtitle.toLowerCase().includes(lowerCaseSearchString),
    );
  }, [searchString, jumbotrons]);

  const handleButtonClick = useCallback(() => {
    navigateToPage(
      DashboardPaths.JUMBOTRON_DETAIL,
      'Create Jumbotron',
      DashboardPaths.JUMBOTRON,
      'Jumbotron List',
      'new',
    );
  }, [navigateToPage]);

  const handleEditClick = useCallback(
    (params: GridRowParams | GridRenderCellParams) => {
      const item = params.row as IJumbotron;

      navigateToPage(
        DashboardPaths.JUMBOTRON_DETAIL,
        'Edit Jumbotron',
        DashboardPaths.JUMBOTRON,
        'Jumbotron List',
        item.id,
      );
    },
    [navigateToPage],
  );

  const handleDeleteClick = useCallback((params: GridRenderCellParams) => {
    const item = params.row as IJumbotron;
    setSelectedDeleteId(item?.id ?? null);
    setIsOpen(true);
  }, []);

  const handleSubmitDelete = useCallback(async () => {
    if (selectedDeleteId) {
      await deleteJumbotron(selectedDeleteId).unwrap();
    }
    setIsOpen(false);
  }, [deleteJumbotron, selectedDeleteId]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'title',
        headerName: 'Title',
        width: 150,
      },
      {
        field: 'subtitle',
        headerName: 'Subtitle',
        flex: 1,
      },
      {
        field: 'is_main_jumbotron',
        headerName: 'Display in Header?',
        type: 'number',
        width: 110,
        align: 'center',
        renderCell: (params) => {
          const row = params.row as IJumbotron;
          return <PrimaryCheckbox checked={row?.is_main_jumbotron ?? false} />;
        },
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
        buttonText="Create Jumbotron"
        handleButtonClick={handleButtonClick}
      />

      <GenericTable columns={columns} rows={filteredJumbotrons ?? []} />

      {isOpen && (
        <ConfirmationModal
          title={'Confirm Delete Jumbotron'}
          message={
            'By clicking confirm, this gallery will be removed permanently. If you are sure, press confirm.'
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleAction={handleSubmitDelete}
        />
      )}
    </Box>
  );
}
