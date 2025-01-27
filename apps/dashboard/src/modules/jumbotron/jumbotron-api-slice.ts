import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api';
import { APIMethods, APITags, DashboardPaths } from '../../types';
import { updateAlert } from '../alert/alert-slice';
import { EnumSeverity, getErrorMessage, IJumbotron } from '@packages/common';
import { router } from '../../routes';

export const jumbotronApiSlice = createApi({
  reducerPath: 'jumbotronApi',
  baseQuery: baseQuery,
  tagTypes: [APITags.JumbotronList],
  endpoints: (builder) => ({
    getJumbotronById: builder.query<IJumbotron, string>({
      query: (id) => `/jumbotron/${id}`,
    }),
    getJumbotrons: builder.query<IJumbotron[], void>({
      query: () => '/jumbotron',
      providesTags: [APITags.JumbotronList],
    }),
    addJumbotron: builder.mutation<IJumbotron, Partial<IJumbotron>>({
      query: (newJumbotron) => {
        const formData = new FormData();
        Object.entries(newJumbotron).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });
        return {
          url: '/jumbotron',
          method: APIMethods.POST,
          body: formData,
        };
      },
      invalidatesTags: [APITags.JumbotronList],
      async onQueryStarted(
        newJumbotron: IJumbotron,
        { dispatch, queryFulfilled },
      ) {
        const addResult = dispatch(
          jumbotronApiSlice.util.updateQueryData(
            'getJumbotrons',
            undefined,
            (draft) => {
              draft.push(newJumbotron);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Jumbotron option was successfully added.',
            }),
          );
          router.navigate(DashboardPaths.JUMBOTRON);
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
    updateJumbotron: builder.mutation<IJumbotron, Pick<IJumbotron, 'id'>>({
      query: ({ id, ...updatedJumbotron }) => {
        const formData = new FormData();
        Object.entries(updatedJumbotron).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });
        return {
          url: `/jumbotron/${id}`,
          method: APIMethods.PUT,
          body: formData,
        };
      },
      invalidatesTags: [APITags.JumbotronList],
      async onQueryStarted(
        { id, ...updatedJumbotron },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          jumbotronApiSlice.util.updateQueryData(
            'getJumbotrons',
            undefined,
            (draft) => {
              const item = draft.find((jumbotron) => jumbotron.id === id);
              if (item) {
                Object.assign(item, updatedJumbotron);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Jumbotron was successfully updated.',
            }),
          );
          router.navigate(DashboardPaths.JUMBOTRON);
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
    deleteJumbotron: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/jumbotron/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [APITags.JumbotronList],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          jumbotronApiSlice.util.updateQueryData(
            'getJumbotrons',
            undefined,
            (draft) => {
              return draft.filter(
                (jumbotron: IJumbotron) => jumbotron.id !== id,
              );
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Jumbotron was successfully deleted.',
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
  useGetJumbotronsQuery,
  useGetJumbotronByIdQuery,
  useAddJumbotronMutation,
  useUpdateJumbotronMutation,
  useDeleteJumbotronMutation,
} = jumbotronApiSlice;
