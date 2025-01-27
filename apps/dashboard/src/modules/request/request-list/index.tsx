import { useCallback, useState, useMemo } from 'react';
import { ConfirmationModal, GenericTable } from '@packages/organisms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import TableSearch from '@packages/organisms/src/search/table-search';
import { IRequest } from '@packages/common';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useAppNavigate, useDashboardAlert } from '../../../hooks';
import {
  useDeleteRequestMutation,
  useGetRequestsQuery,
} from '../request-api-slice';
import { BoxLoading } from '@packages/molecules';
import { PrimaryCheckbox } from '@packages/atoms';
import { DashboardPaths } from '../../../types';

export function RequestListContainer() {
  useDashboardAlert();
  const { navigateToPage } = useAppNavigate();
  const { data: requests, isLoading } = useGetRequestsQuery(undefined, {
    refetchOnMountOrArgChange: 120, // fresh after two minutes after the last fetch
  });
  const [deleteRequest] = useDeleteRequestMutation();

  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSearchString = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const filteredRequests = useMemo(() => {
    if (!requests) {
      return [];
    }

    if (!searchString) {
      return requests;
    }

    const lowerCaseSearchString = searchString.toLowerCase();

    return requests.filter(
      (gallery) =>
        gallery.datetime.toLowerCase().includes(lowerCaseSearchString) ||
        gallery.customer_name.toLowerCase().includes(lowerCaseSearchString) ||
        gallery.email.toLowerCase().includes(lowerCaseSearchString) ||
        gallery.phone.toLowerCase().includes(lowerCaseSearchString),
    );
  }, [searchString, requests]);

  const handleButtonClick = useCallback(() => {
    navigateToPage(
      DashboardPaths.REQUEST_DETAIL,
      'Create Request',
      DashboardPaths.REQUEST,
      'Request List',
      'new',
    );
  }, [navigateToPage]);

  const handleEditClick = useCallback(
    (params: GridRowParams | GridRenderCellParams) => {
      const item = params.row as IRequest;

      navigateToPage(
        DashboardPaths.REQUEST_DETAIL,
        'Edit Request',
        DashboardPaths.REQUEST,
        'Request List',
        item.id,
      );
    },
    [navigateToPage],
  );

  const handleDeleteClick = useCallback((params: GridRenderCellParams) => {
    const item = params.row as IRequest;
    setSelectedDeleteId(item?.id ?? null);
    setIsOpen(true);
  }, []);

  const handleSubmitDelete = useCallback(async () => {
    if (selectedDeleteId) {
      await deleteRequest(selectedDeleteId).unwrap();
    }
    setIsOpen(false);
  }, [deleteRequest, selectedDeleteId]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'datetime',
        headerName: 'Datetime',
        width: 150,
      },
      {
        field: 'customer_name',
        headerName: 'Customer Name',
        flex: 1,
      },
      {
        field: 'phone',
        headerName: 'Phone',
        flex: 1,
      },
      {
        field: 'is_online',
        headerName: 'Online Request?',
        type: 'number',
        width: 110,
        align: 'center',
        renderCell: (params) => {
          const row = params.row as IRequest;
          return <PrimaryCheckbox checked={row?.is_online ?? false} />;
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
        buttonText="Create Request"
        handleButtonClick={handleButtonClick}
      />

      <GenericTable columns={columns} rows={filteredRequests ?? []} />

      {isOpen && (
        <ConfirmationModal
          title={'Confirm Delete Request'}
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
