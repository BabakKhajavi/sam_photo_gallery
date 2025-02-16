import { useCallback, useState, useMemo } from 'react';
import { ConfirmationModal, GenericTable } from '@packages/organisms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import TableSearch from '@packages/organisms/src/search/table-search';
import { IHome } from '@packages/common';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useAppNavigate, useDashboardAlert } from '../../../hooks';
import {
  useDeleteWelcomeMutation,
  useGetWelcomeQuery,
} from '../welcome-api-slice';
import { BoxLoading } from '@packages/molecules';
import { DashboardPaths } from '../../../types';

export function WelcomeListContainer() {
  useDashboardAlert();
  const { navigateToPage } = useAppNavigate();
  const { data: welcome, isLoading } = useGetWelcomeQuery(undefined, {
    refetchOnMountOrArgChange: 120, // fresh after two minutes after the last fetch
  });
  const [deleteWelcome] = useDeleteWelcomeMutation();

  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSearchString = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const filteredWelcome = useMemo(() => {
    if (!welcome) {
      return [];
    }

    if (!searchString) {
      return welcome;
    }

    const lowerCaseSearchString = searchString.toLowerCase();

    return welcome.filter(
      (welcome) =>
        welcome.title.toLowerCase().includes(lowerCaseSearchString) ||
        welcome.subtitle.toLowerCase().includes(lowerCaseSearchString) ||
        welcome.description.toLowerCase().includes(lowerCaseSearchString) ||
        welcome.sub_description.toLowerCase().includes(lowerCaseSearchString),
    );
  }, [searchString, welcome]);

  const handleButtonClick = useCallback(() => {
    navigateToPage(
      DashboardPaths.WELCOME_DETAIL,
      'Create Welcome',
      DashboardPaths.WELCOME,
      'Welcome List',
      'new',
    );
  }, [navigateToPage]);

  const handleEditClick = useCallback(
    (params: GridRowParams | GridRenderCellParams) => {
      const item = params.row as IHome;

      navigateToPage(
        DashboardPaths.WELCOME_DETAIL,
        'Edit Welcome',
        DashboardPaths.WELCOME,
        'Welcome List',
        item.id,
      );
    },
    [navigateToPage],
  );

  const handleDeleteClick = useCallback((params: GridRenderCellParams) => {
    const item = params.row as IHome;
    setSelectedDeleteId(item?.id ?? null);
    setIsOpen(true);
  }, []);

  const handleSubmitDelete = useCallback(async () => {
    if (selectedDeleteId) {
      await deleteWelcome(selectedDeleteId).unwrap();
    }
    setIsOpen(false);
  }, [deleteWelcome, selectedDeleteId]);

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
        buttonText="Create Welcome"
        handleButtonClick={handleButtonClick}
      />

      <GenericTable columns={columns} rows={filteredWelcome ?? []} />

      {isOpen && (
        <ConfirmationModal
          title={'Confirm Delete Welcome'}
          message={
            'By clicking confirm, this welcome will be removed permanently. If you are sure, press confirm.'
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleAction={handleSubmitDelete}
        />
      )}
    </Box>
  );
}
