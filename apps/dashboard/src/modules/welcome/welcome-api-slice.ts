import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api';
import { APIMethods, APITags, DashboardPaths } from '../../types';
import { updateAlert } from '../alert/alert-slice';
import { EnumSeverity, getErrorMessage, IWelcome } from '@packages/common';
import { router } from '../../routes';

export const welcomeApiSlice = createApi({
  reducerPath: 'welcomeApi',
  baseQuery: baseQuery,
  tagTypes: [APITags.WelcomeList],
  endpoints: (builder) => ({
    getWelcomeById: builder.query<IWelcome, string>({
      query: (id) => `/welcome/${id}`,
    }),
    getWelcome: builder.query<IWelcome[], void>({
      query: () => '/welcome',
      providesTags: [APITags.WelcomeList],
    }),
    addWelcome: builder.mutation<IWelcome, Partial<IWelcome>>({
      query: (newWelcome) => {
        const formData = new FormData();
        Object.entries(newWelcome).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });
        return {
          url: '/welcome',
          method: APIMethods.POST,
          body: formData,
        };
      },
      invalidatesTags: [APITags.WelcomeList],
      async onQueryStarted(newWelcome: IWelcome, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          welcomeApiSlice.util.updateQueryData(
            'getWelcome',
            undefined,
            (draft) => {
              draft.push(newWelcome);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Welcome option was successfully added.',
            }),
          );
          router.navigate(DashboardPaths.WELCOME);
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
    updateWelcome: builder.mutation<IWelcome, Pick<IWelcome, 'id'>>({
      query: ({ id, ...updatedWelcome }) => {
        const formData = new FormData();
        Object.entries(updatedWelcome).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });
        return {
          url: `/welcome/${id}`,
          method: APIMethods.PUT,
          body: formData,
        };
      },
      invalidatesTags: [APITags.WelcomeList],
      async onQueryStarted(
        { id, ...updatedWelcome },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          welcomeApiSlice.util.updateQueryData(
            'getWelcome',
            undefined,
            (draft) => {
              const item = draft.find((welcome) => welcome.id === id);
              if (item) {
                Object.assign(item, updatedWelcome);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Welcome was successfully updated.',
            }),
          );
          router.navigate(DashboardPaths.WELCOME);
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
    deleteWelcome: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/welcome/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [APITags.WelcomeList],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          welcomeApiSlice.util.updateQueryData(
            'getWelcome',
            undefined,
            (draft) => {
              return draft.filter((welcome: IWelcome) => welcome.id !== id);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Welcome was successfully deleted.',
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
  useGetWelcomeQuery,
  useGetWelcomeByIdQuery,
  useAddWelcomeMutation,
  useUpdateWelcomeMutation,
  useDeleteWelcomeMutation,
} = welcomeApiSlice;
