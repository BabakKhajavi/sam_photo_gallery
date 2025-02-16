import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api';
import { APIMethods, APITags, DashboardPaths } from '../../types';
import { updateAlert } from '../alert/alert-slice';
import { EnumSeverity, getErrorMessage, IPlan } from '@packages/common';
import { router } from '../../routes';

export const approachApiSlice = createApi({
  reducerPath: 'approachApi',
  baseQuery: baseQuery,
  tagTypes: [APITags.ApproachList],
  endpoints: (builder) => ({
    getApproachById: builder.query<IPlan, string>({
      query: (id) => `/approach/${id}`,
    }),
    getApproaches: builder.query<IPlan[], void>({
      query: () => '/approach',
      providesTags: [APITags.ApproachList],
    }),
    addApproach: builder.mutation<IPlan, Partial<IPlan>>({
      query: (newApproach) => {
        const formData = new FormData();
        Object.entries(newApproach).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });
        return {
          url: '/approach',
          method: APIMethods.POST,
          body: formData,
        };
      },
      invalidatesTags: [APITags.ApproachList],
      async onQueryStarted(newApproach: IPlan, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          approachApiSlice.util.updateQueryData(
            'getApproaches',
            undefined,
            (draft) => {
              draft.push(newApproach);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Approach option was successfully added.',
            }),
          );
          router.navigate(DashboardPaths.APPROACH);
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
    updateApproach: builder.mutation<IPlan, Pick<IPlan, 'id'>>({
      query: ({ id, ...updatedApproach }) => {
        const formData = new FormData();
        Object.entries(updatedApproach).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });
        return {
          url: `/approach/${id}`,
          method: APIMethods.PUT,
          body: formData,
        };
      },
      invalidatesTags: [APITags.ApproachList],
      async onQueryStarted(
        { id, ...updatedApproach },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          approachApiSlice.util.updateQueryData(
            'getApproaches',
            undefined,
            (draft) => {
              const item = draft.find((approach) => approach.id === id);
              if (item) {
                Object.assign(item, updatedApproach);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Approach was successfully updated.',
            }),
          );
          router.navigate(DashboardPaths.APPROACH);
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
    deleteApproach: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/approach/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [APITags.ApproachList],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          approachApiSlice.util.updateQueryData(
            'getApproaches',
            undefined,
            (draft) => {
              return draft.filter((approach: IPlan) => approach.id !== id);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Approach was successfully deleted.',
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
  useGetApproachesQuery,
  useGetApproachByIdQuery,
  useAddApproachMutation,
  useUpdateApproachMutation,
  useDeleteApproachMutation,
} = approachApiSlice;
