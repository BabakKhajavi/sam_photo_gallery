import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api';
import { APIMethods, APITags, DashboardPaths } from '../../types';
import { updateAlert } from '../alert/alert-slice';
import { EnumSeverity, getErrorMessage, IReview } from '@packages/common';
import { router } from '../../routes';

export const reviewApiSlice = createApi({
  reducerPath: 'reviewApi',
  baseQuery: baseQuery,
  tagTypes: [APITags.ReviewList],
  endpoints: (builder) => ({
    getReviewById: builder.query<IReview, string>({
      query: (id) => `/review/${id}`,
    }),
    getReviews: builder.query<IReview[], void>({
      query: () => '/review',
      providesTags: [APITags.ReviewList],
    }),
    addReview: builder.mutation<IReview, Partial<IReview>>({
      query: (newReview) => ({
        url: '/review',
        method: APIMethods.POST,
        body: newReview,
      }),
      invalidatesTags: [APITags.ReviewList],
      async onQueryStarted(newReview: IReview, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          reviewApiSlice.util.updateQueryData(
            'getReviews',
            undefined,
            (draft) => {
              draft.push(newReview);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Review option was successfully added.',
            }),
          );
          router.navigate(DashboardPaths.REVIEW);
        } catch (error) {
          addResult.undo();
          dispatch(
            updateAlert({
              alertType: EnumSeverity.ERROR,
              alertMessage: getErrorMessage(error),
            }),
          );
        }
      },
    }),
    updateReview: builder.mutation<IReview, Pick<IReview, 'id'>>({
      query: ({ id, ...updatedReview }) => ({
        url: `/review/${id}`,
        method: APIMethods.PUT,
        body: updatedReview,
      }),
      invalidatesTags: [APITags.ReviewList],
      async onQueryStarted(
        { id, ...updatedReview },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          reviewApiSlice.util.updateQueryData(
            'getReviews',
            undefined,
            (draft) => {
              const item = draft.find((review) => review.id === id);
              if (item) {
                Object.assign(item, updatedReview);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Review was successfully updated.',
            }),
          );
          router.navigate(DashboardPaths.REVIEW);
        } catch (error) {
          patchResult.undo();
          dispatch(
            updateAlert({
              alertType: EnumSeverity.ERROR,
              alertMessage: getErrorMessage(error),
            }),
          );
        }
      },
    }),
    deleteReview: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/review/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [APITags.ReviewList],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          reviewApiSlice.util.updateQueryData(
            'getReviews',
            undefined,
            (draft) => {
              return draft.filter((review: IReview) => review.id !== id);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Review was successfully deleted.',
            }),
          );
        } catch (error) {
          deleteResult.undo();
          dispatch(
            updateAlert({
              alertType: EnumSeverity.ERROR,
              alertMessage: getErrorMessage(error),
            }),
          );
        }
      },
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewByIdQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApiSlice;
