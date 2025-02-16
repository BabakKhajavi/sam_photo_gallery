import { useCallback, useState, useMemo } from 'react';
import { ConfirmationModal, GenericTable } from '@packages/organisms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import TableSearch from '@packages/organisms/src/search/table-search';
import { PrimaryCheckbox } from '@packages/atoms';
import { IReview } from '@packages/common';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useAppNavigate, useDashboardAlert } from '../../../hooks';
import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
} from '../review-api-slice';
import { BoxLoading } from '@packages/molecules';
import { DashboardPaths } from '../../../types';

export function ReviewListContainer() {
  useDashboardAlert();
  const { navigateToPage } = useAppNavigate();
  const { data: reviews, isLoading } = useGetReviewsQuery(undefined, {
    refetchOnMountOrArgChange: 120, // fresh after two minutes after the last fetch
  });
  const [deleteReview] = useDeleteReviewMutation();

  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSearchString = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const filteredReviews = useMemo(() => {
    if (!reviews) {
      return [];
    }

    if (!searchString) {
      return reviews;
    }

    const lowerCaseSearchString = searchString.toLowerCase();

    return reviews.filter(
      (review) =>
        review.source.toLowerCase().includes(lowerCaseSearchString) ||
        review.description.toLowerCase().includes(lowerCaseSearchString) ||
        review.owner.toLowerCase().includes(lowerCaseSearchString),
    );
  }, [searchString, reviews]);

  const handleButtonClick = useCallback(() => {
    navigateToPage(
      DashboardPaths.REVIEW_DETAIL,
      'Create Review',
      DashboardPaths.REVIEW,
      'Review List',
      'new',
    );
  }, [navigateToPage]);

  const handleEditClick = useCallback(
    (params: GridRowParams | GridRenderCellParams) => {
      const item = params.row as IReview;

      navigateToPage(
        DashboardPaths.REVIEW_DETAIL,
        'Edit Review',
        DashboardPaths.REVIEW,
        'Review List',
        item.id,
      );
    },
    [navigateToPage],
  );

  const handleDeleteClick = useCallback((params: GridRenderCellParams) => {
    const item = params.row as IReview;
    setSelectedDeleteId(item?.id ?? null);
    setIsOpen(true);
  }, []);

  const handleSubmitDelete = useCallback(async () => {
    if (selectedDeleteId) {
      await deleteReview(selectedDeleteId).unwrap();
    }
    setIsOpen(false);
  }, [deleteReview, selectedDeleteId]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'owner',
        headerName: 'Reviewer',
        flex: 1,
      },
      {
        field: 'source',
        headerName: 'Source',
        width: 150,
      },
      {
        field: 'link',
        headerName: 'link',
        flex: 1,
        sortable: true,
      },
      {
        field: 'stars',
        headerName: 'stars',
        flex: 1,
        sortable: true,
      },
      {
        field: 'is_approved',
        headerName: 'Is Approved?',
        type: 'number',
        width: 110,
        align: 'center',
        renderCell: (params) => {
          const row = params.row as IReview;
          return <PrimaryCheckbox checked={row?.is_approved ?? false} />;
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
        buttonText="Create Review"
        handleButtonClick={handleButtonClick}
      />

      <GenericTable columns={columns} rows={filteredReviews ?? []} />

      {isOpen && (
        <ConfirmationModal
          title={'Confirm Delete Review'}
          message={
            'By clicking confirm, this review will be removed permanently. If you are sure, press confirm.'
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleAction={handleSubmitDelete}
        />
      )}
    </Box>
  );
}
