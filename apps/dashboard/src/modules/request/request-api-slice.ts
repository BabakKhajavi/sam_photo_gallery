import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api';
import { APIMethods, APITags, DashboardPaths } from '../../types';
import { updateAlert } from '../alert/alert-slice';
import { EnumSeverity, getErrorMessage, IRequest } from '@packages/common';
import { router } from '../../routes';

export const requestApiSlice = createApi({
  reducerPath: 'requestApi',
  baseQuery: baseQuery,
  tagTypes: [APITags.RequestList],
  endpoints: (builder) => ({
    getRequestById: builder.query<IRequest, string>({
      query: (id) => `/request/${id}`,
    }),
    getRequests: builder.query<IRequest[], void>({
      query: () => '/request',
      providesTags: [APITags.RequestList],
    }),
    addRequest: builder.mutation<IRequest, Partial<IRequest>>({
      query: (newRequest) => {
        const formData = new FormData();
        Object.entries(newRequest).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });
        return {
          url: '/request',
          method: APIMethods.POST,
          body: formData,
        };
      },
      invalidatesTags: [APITags.RequestList],
      async onQueryStarted(newRequest: IRequest, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          requestApiSlice.util.updateQueryData(
            'getRequests',
            undefined,
            (draft) => {
              draft.push(newRequest);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Request option was successfully added.',
            }),
          );
          router.navigate(DashboardPaths.REQUEST);
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
    updateRequest: builder.mutation<IRequest, Pick<IRequest, 'id'>>({
      query: ({ id, ...updatedRequest }) => {
        const formData = new FormData();
        Object.entries(updatedRequest).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });
        return {
          url: `/request/${id}`,
          method: APIMethods.PUT,
          body: formData,
        };
      },
      invalidatesTags: [APITags.RequestList],
      async onQueryStarted(
        { id, ...updatedRequest },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          requestApiSlice.util.updateQueryData(
            'getRequests',
            undefined,
            (draft) => {
              const item = draft.find((request) => request.id === id);
              if (item) {
                Object.assign(item, updatedRequest);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Request was successfully updated.',
            }),
          );
          router.navigate(DashboardPaths.REQUEST);
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
    deleteRequest: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/request/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [APITags.RequestList],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          requestApiSlice.util.updateQueryData(
            'getRequests',
            undefined,
            (draft) => {
              return draft.filter((request: IRequest) => request.id !== id);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Request was successfully deleted.',
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
  useGetRequestsQuery,
  useGetRequestByIdQuery,
  useAddRequestMutation,
  useUpdateRequestMutation,
  useDeleteRequestMutation,
} = requestApiSlice;
