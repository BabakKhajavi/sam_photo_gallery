import { useCallback, useState, useMemo } from 'react';
import { ConfirmationModal, GenericTable } from '@packages/organisms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import TableSearch from '@packages/organisms/src/search/table-search';
import { ICategory } from '@packages/common';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useAppNavigate, useDashboardAlert } from '../../../hooks';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '../category-api-slice';
import { BoxLoading } from '@packages/molecules';
import { DashboardPaths } from '../../../types';

export function CategoryListContainer() {
  useDashboardAlert();
  const { navigateToPage } = useAppNavigate();

  const { data: categories, isLoading } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: 120, // fresh after two minutes after the last fetch
  });
  const [deleteCategory] = useDeleteCategoryMutation();

  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSearchString = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const filteredCategories = useMemo(() => {
    if (!categories) {
      return [];
    }

    if (!searchString) {
      return categories;
    }

    const lowerCaseSearchString = searchString.toLowerCase();

    return categories.filter((city) =>
      city.title.toLowerCase().includes(lowerCaseSearchString),
    );
  }, [searchString, categories]);

  const handleButtonClick = useCallback(() => {
    navigateToPage(
      DashboardPaths.CATEGORY_DETAIL,
      'Create Category',
      DashboardPaths.CATEGORY,
      'Category List',
      'new',
    );
  }, [navigateToPage]);

  const handleEditClick = useCallback(
    (params: GridRowParams | GridRenderCellParams) => {
      const item = params.row as ICategory;

      navigateToPage(
        DashboardPaths.CATEGORY_DETAIL,
        'Edit Category',
        DashboardPaths.CATEGORY,
        'Category List',
        item.id,
      );
    },
    [navigateToPage],
  );

  const handleDeleteClick = useCallback((params: GridRenderCellParams) => {
    const item = params.row as ICategory;
    setSelectedDeleteId(item?.id ?? null);
    setIsOpen(true);
  }, []);

  const handleSubmitDelete = useCallback(async () => {
    if (selectedDeleteId) {
      await deleteCategory(selectedDeleteId).unwrap();
    }
    setIsOpen(false);
  }, [deleteCategory, selectedDeleteId]);

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
        buttonText="Create Category"
        handleButtonClick={handleButtonClick}
      />

      <GenericTable columns={columns} rows={filteredCategories ?? []} />

      {isOpen && (
        <ConfirmationModal
          title={'Confirm Delete Category'}
          message={
            'By clicking confirm, this city will be removed permanently. If you are sure, press confirm.'
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleAction={handleSubmitDelete}
        />
      )}
    </Box>
  );
}
