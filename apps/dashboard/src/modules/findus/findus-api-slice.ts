import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api';
import { APIMethods, APITags, DashboardPaths } from '../../types';
import { updateAlert } from '../alert/alert-slice';
import { EnumSeverity, getErrorMessage, IFindUs } from '@packages/common';
import { router } from '../../routes';

export const findusApiSlice = createApi({
  reducerPath: 'findusApi',
  baseQuery: baseQuery,
  tagTypes: [APITags.FindUsList],
  endpoints: (builder) => ({
    getFindUsById: builder.query<IFindUs, string>({
      query: (id) => `/findus/${id}`,
    }),
    getFindUs: builder.query<IFindUs[], void>({
      query: () => '/findus',
      providesTags: [APITags.FindUsList],
    }),
    addFindUs: builder.mutation<IFindUs, Partial<IFindUs>>({
      query: (newFindUs) => ({
        url: '/findus',
        method: APIMethods.POST,
        body: newFindUs,
      }),
      invalidatesTags: [APITags.FindUsList],
      async onQueryStarted(newFindUs: IFindUs, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          findusApiSlice.util.updateQueryData(
            'getFindUs',
            undefined,
            (draft) => {
              draft.push(newFindUs);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'FindUs option was successfully added.',
            }),
          );
          router.navigate(DashboardPaths.FIND_US);
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
    updateFindUs: builder.mutation<IFindUs, Pick<IFindUs, 'id'>>({
      query: ({ id, ...updatedFindUs }) => ({
        url: `/findus/${id}`,
        method: APIMethods.PUT,
        body: updatedFindUs,
      }),
      invalidatesTags: [APITags.FindUsList],
      async onQueryStarted(
        { id, ...updatedFindUs },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          findusApiSlice.util.updateQueryData(
            'getFindUs',
            undefined,
            (draft) => {
              const item = draft.find((findus) => findus.id === id);
              if (item) {
                Object.assign(item, updatedFindUs);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'FindUs was successfully updated.',
            }),
          );
          router.navigate(DashboardPaths.FIND_US);
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
    deleteFindUs: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/findus/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [APITags.FindUsList],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          findusApiSlice.util.updateQueryData(
            'getFindUs',
            undefined,
            (draft) => {
              return draft.filter((findus: IFindUs) => findus.id !== id);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'FindUs was successfully deleted.',
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
  useGetFindUsQuery,
  useGetFindUsByIdQuery,
  useAddFindUsMutation,
  useUpdateFindUsMutation,
  useDeleteFindUsMutation,
} = findusApiSlice;
