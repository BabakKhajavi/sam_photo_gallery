import { useCallback, useState, useMemo } from 'react';
import { ConfirmationModal, GenericTable } from '@packages/organisms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import TableSearch from '@packages/organisms/src/search/table-search';
import { IAdvertisement } from '@packages/common';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useAppNavigate, useDashboardAlert } from '../../../hooks';
import {
  useDeleteAdvertisementMutation,
  useGetAdvertisementsQuery,
} from '../advertisement-api-slice';
import { BoxLoading } from '@packages/molecules';
import { DashboardPaths } from '../../../types';

export function AdvertisementListContainer() {
  useDashboardAlert();
  const { navigateToPage } = useAppNavigate();
  const { data: advertisements, isLoading } = useGetAdvertisementsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: 120, // fresh after two minutes after the last fetch
    },
  );
  const [deleteAdvertisement] = useDeleteAdvertisementMutation();

  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSearchString = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const filteredAdvertisements = useMemo(() => {
    if (!advertisements) {
      return [];
    }

    if (!searchString) {
      return advertisements;
    }

    const lowerCaseSearchString = searchString.toLowerCase();

    return advertisements.filter((advertisement) =>
      advertisement.type.toLowerCase().includes(lowerCaseSearchString),
    );
  }, [searchString, advertisements]);

  const handleButtonClick = useCallback(() => {
    navigateToPage(
      DashboardPaths.ADVERTISEMENT_DETAIL,
      'Create Advertisement',
      DashboardPaths.ADVERTISEMENT,
      'Advertisement List',
      'new',
    );
  }, [navigateToPage]);

  const handleEditClick = useCallback(
    (params: GridRowParams | GridRenderCellParams) => {
      const item = params.row as IAdvertisement;

      navigateToPage(
        DashboardPaths.APPROACH_DETAIL,
        'Edit Advertisement',
        DashboardPaths.APPROACH,
        'Advertisement List',
        item.id,
      );
    },
    [navigateToPage],
  );

  const handleDeleteClick = useCallback((params: GridRenderCellParams) => {
    const item = params.row as IAdvertisement;
    setSelectedDeleteId(item?.id ?? null);
    setIsOpen(true);
  }, []);

  const handleSubmitDelete = useCallback(async () => {
    if (selectedDeleteId) {
      await deleteAdvertisement(selectedDeleteId).unwrap();
    }
    setIsOpen(false);
  }, [deleteAdvertisement, selectedDeleteId]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'type',
        headerName: 'Address',
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
        placeholder="Search by address, phone or email"
        buttonText="Create Advertisement"
        handleButtonClick={handleButtonClick}
      />

      <GenericTable columns={columns} rows={filteredAdvertisements ?? []} />

      {isOpen && (
        <ConfirmationModal
          title={'Confirm Delete Advertisement'}
          message={
            'By clicking confirm, this advertisement will be removed permanently. If you are sure, press confirm.'
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleAction={handleSubmitDelete}
        />
      )}
    </Box>
  );
}
