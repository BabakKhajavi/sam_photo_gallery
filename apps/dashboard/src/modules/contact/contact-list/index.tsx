import { useCallback, useState, useMemo } from 'react';
import { ConfirmationModal, GenericTable } from '@packages/organisms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import TableSearch from '@packages/organisms/src/search/table-search';
import { PrimaryCheckbox } from '@packages/atoms';
import { IContact } from '@packages/common';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useAppNavigate, useDashboardAlert } from '../../../hooks';
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from '../contact-api-slice';
import { BoxLoading } from '@packages/molecules';
import { DashboardPaths } from '../../../types';

export function ContactListContainer() {
  useDashboardAlert();
  const { navigateToPage } = useAppNavigate();
  const { data: contacts, isLoading } = useGetContactsQuery(undefined, {
    refetchOnMountOrArgChange: 120, // fresh after two minutes after the last fetch
  });
  const [deleteContact] = useDeleteContactMutation();

  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSearchString = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const filteredContacts = useMemo(() => {
    if (!contacts) {
      return [];
    }

    if (!searchString) {
      return contacts;
    }

    const lowerCaseSearchString = searchString.toLowerCase();

    return contacts.filter(
      (contact) =>
        contact.address.toLowerCase().includes(lowerCaseSearchString) ||
        contact.phone.toLowerCase().includes(lowerCaseSearchString) ||
        contact.email.toLowerCase().includes(lowerCaseSearchString),
    );
  }, [searchString, contacts]);

  const handleButtonClick = useCallback(() => {
    navigateToPage(
      DashboardPaths.CONTACT_DETAIL,
      'Create Contact',
      DashboardPaths.CONTACT,
      'Contact List',
      'new',
    );
  }, [navigateToPage]);

  const handleEditClick = useCallback(
    (params: GridRowParams | GridRenderCellParams) => {
      const item = params.row as IContact;

      navigateToPage(
        DashboardPaths.CONTACT_DETAIL,
        'Edit Contact',
        DashboardPaths.CONTACT,
        'Contact List',
        item.id,
      );
    },
    [navigateToPage],
  );

  const handleDeleteClick = useCallback((params: GridRenderCellParams) => {
    const item = params.row as IContact;
    setSelectedDeleteId(item?.id ?? null);
    setIsOpen(true);
  }, []);

  const handleSubmitDelete = useCallback(async () => {
    if (selectedDeleteId) {
      await deleteContact(selectedDeleteId).unwrap();
    }
    setIsOpen(false);
  }, [deleteContact, selectedDeleteId]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'address',
        headerName: 'Address',
        flex: 1,
      },
      {
        field: 'phone',
        headerName: 'Phone',
        width: 150,
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        sortable: true,
      },
      {
        field: 'is_main',
        headerName: 'Main Contact?',
        type: 'number',
        width: 110,
        align: 'center',
        renderCell: (params) => {
          const row = params.row as IContact;
          return <PrimaryCheckbox checked={row?.is_main ?? false} />;
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
        placeholder="Search by address, phone or email"
        buttonText="Create Contact"
        handleButtonClick={handleButtonClick}
      />

      <GenericTable columns={columns} rows={filteredContacts ?? []} />

      {isOpen && (
        <ConfirmationModal
          title={'Confirm Delete Contact'}
          message={
            'By clicking confirm, this contact will be removed permanently. If you are sure, press confirm.'
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleAction={handleSubmitDelete}
        />
      )}
    </Box>
  );
}
