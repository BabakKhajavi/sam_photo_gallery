import { useCallback, useState, useMemo } from 'react';
import { ConfirmationModal, GenericTable } from '@packages/organisms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import TableSearch from '@packages/organisms/src/search/table-search';
import { ISubcategory } from '@packages/common';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useAppNavigate, useDashboardAlert } from '../../../hooks';
import {
  useDeleteSubcategoryMutation,
  useGetSubcategoriesQuery,
} from '../subcategory-api-slice';
import { BoxLoading } from '@packages/molecules';
import { DashboardPaths } from '../../../types';

export function SubcategoryListContainer() {
  useDashboardAlert();
  const { navigateToPage } = useAppNavigate();
  const { data: subcategories, isLoading } = useGetSubcategoriesQuery(
    undefined,
    {
      refetchOnMountOrArgChange: 120, // fresh after two minutes after the last fetch
    },
  );
  const [deleteSubcategory] = useDeleteSubcategoryMutation();

  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSearchString = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const filteredSubcategories = useMemo(() => {
    if (!subcategories) {
      return [];
    }

    if (!searchString) {
      return subcategories;
    }

    const lowerCaseSearchString = searchString.toLowerCase();

    return subcategories.filter(
      (subcategory) =>
        subcategory.title.toLowerCase().includes(lowerCaseSearchString) ||
        subcategory.description.toLowerCase().includes(lowerCaseSearchString),
    );
  }, [searchString, subcategories]);

  const handleButtonClick = useCallback(() => {
    navigateToPage(
      DashboardPaths.SUBCATEGORY_DETAIL,
      'Create Subcategory',
      DashboardPaths.SUBCATEGORY,
      'Subcategory List',
      'new',
    );
  }, [navigateToPage]);

  const handleEditClick = useCallback(
    (params: GridRowParams | GridRenderCellParams) => {
      const item = params.row as ISubcategory;

      navigateToPage(
        DashboardPaths.SUBCATEGORY_DETAIL,
        'Edit Subcategory',
        DashboardPaths.SUBCATEGORY,
        'Subcategory List',
        item.id,
      );
    },
    [navigateToPage],
  );

  const handleDeleteClick = useCallback((params: GridRenderCellParams) => {
    const item = params.row as ISubcategory;
    setSelectedDeleteId(item?.id ?? null);
    setIsOpen(true);
  }, []);

  const handleSubmitDelete = useCallback(async () => {
    if (selectedDeleteId) {
      await deleteSubcategory(selectedDeleteId).unwrap();
    }
    setIsOpen(false);
  }, [deleteSubcategory, selectedDeleteId]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'title',
        headerName: 'Title',
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
        placeholder="Search by name"
        buttonText="Create Subcategory"
        handleButtonClick={handleButtonClick}
      />

      <GenericTable columns={columns} rows={filteredSubcategories ?? []} />

      {isOpen && (
        <ConfirmationModal
          title={'Confirm Delete Subcategory'}
          message={
            'By clicking confirm, this subcategory will be removed permanently. If you are sure, press confirm.'
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleAction={handleSubmitDelete}
        />
      )}
    </Box>
  );
}
