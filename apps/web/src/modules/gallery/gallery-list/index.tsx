import { useCallback, useState, useMemo } from 'react';
import { ConfirmationModal, GenericTable } from '@packages/organisms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import TableSearch from '@packages/organisms/src/search/table-search';
import { IGallery } from '@packages/common';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useAppNavigate, useDashboardAlert } from '../../../hooks';
import {
  useDeleteGalleryMutation,
  useGetGalleriesQuery,
} from '../gallery-api-slice';
import { BoxLoading } from '@packages/molecules';
import { PrimaryCheckbox } from '@packages/atoms';
import { DashboardPaths } from '../../../types';

export function GalleryListContainer() {
  useDashboardAlert();
  const { navigateToPage } = useAppNavigate();
  const { data: galleries, isLoading } = useGetGalleriesQuery(undefined, {
    refetchOnMountOrArgChange: 120, // fresh after two minutes after the last fetch
  });
  const [deleteGallery] = useDeleteGalleryMutation();

  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSearchString = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const filteredGalleries = useMemo(() => {
    if (!galleries) {
      return [];
    }

    if (!searchString) {
      return galleries;
    }

    const lowerCaseSearchString = searchString.toLowerCase();

    return galleries.filter(
      (gallery) =>
        gallery.title.toLowerCase().includes(lowerCaseSearchString) ||
        gallery.subtitle.toLowerCase().includes(lowerCaseSearchString) ||
        gallery.description.toLowerCase().includes(lowerCaseSearchString),
    );
  }, [searchString, galleries]);

  const handleButtonClick = useCallback(() => {
    navigateToPage(
      DashboardPaths.GALLERY_DETAIL,
      'Create Gallery',
      DashboardPaths.GALLERY,
      'Gallery List',
      'new',
    );
  }, [navigateToPage]);

  const handleEditClick = useCallback(
    (params: GridRowParams | GridRenderCellParams) => {
      const item = params.row as IGallery;

      navigateToPage(
        DashboardPaths.GALLERY_DETAIL,
        'Edit Gallery',
        DashboardPaths.GALLERY,
        'Gallery List',
        item.id,
      );
    },
    [navigateToPage],
  );

  const handleDeleteClick = useCallback((params: GridRenderCellParams) => {
    const item = params.row as IGallery;
    setSelectedDeleteId(item?.id ?? null);
    setIsOpen(true);
  }, []);

  const handleSubmitDelete = useCallback(async () => {
    if (selectedDeleteId) {
      await deleteGallery(selectedDeleteId).unwrap();
    }
    setIsOpen(false);
  }, [deleteGallery, selectedDeleteId]);

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
        field: 'is_main',
        headerName: 'Display in Header?',
        type: 'number',
        width: 110,
        align: 'center',
        renderCell: (params) => {
          const row = params.row as IGallery;
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
        placeholder="Search by title, summary or description"
        buttonText="Create Gallery"
        handleButtonClick={handleButtonClick}
      />

      <GenericTable columns={columns} rows={filteredGalleries ?? []} />

      {isOpen && (
        <ConfirmationModal
          title={'Confirm Delete Gallery'}
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
