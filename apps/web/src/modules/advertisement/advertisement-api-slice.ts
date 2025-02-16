import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api';
import { APIMethods, APITags, DashboardPaths } from '../../types';
import { updateAlert } from '../alert/alert-slice';
import {
  EnumSeverity,
  getErrorMessage,
  IAdvertisement,
} from '@packages/common';
import { router } from '../../routes';

export const advertisementApiSlice = createApi({
  reducerPath: 'advertisementApi',
  baseQuery: baseQuery,
  tagTypes: [APITags.AdvertisementList],
  endpoints: (builder) => ({
    getAdvertisementById: builder.query<IAdvertisement, string>({
      query: (id) => `/advertisement/${id}`,
    }),
    getAdvertisements: builder.query<IAdvertisement[], void>({
      query: () => '/advertisement',
      providesTags: [APITags.AdvertisementList],
    }),
    addAdvertisement: builder.mutation<IAdvertisement, Partial<IAdvertisement>>(
      {
        query: (newAdvertisement) => ({
          url: '/advertisement',
          method: APIMethods.POST,
          body: newAdvertisement,
        }),
        invalidatesTags: [APITags.AdvertisementList],
        async onQueryStarted(
          newAdvertisement: IAdvertisement,
          { dispatch, queryFulfilled },
        ) {
          const addResult = dispatch(
            advertisementApiSlice.util.updateQueryData(
              'getAdvertisements',
              undefined,
              (draft) => {
                draft.push(newAdvertisement);
              },
            ),
          );
          try {
            await queryFulfilled;
            dispatch(
              updateAlert({
                alertType: EnumSeverity.SUCCESS,
                alertMessage: 'Advertisement option was successfully added.',
              }),
            );
            router.navigate(DashboardPaths.ADVERTISEMENT);
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
      },
    ),
    updateAdvertisement: builder.mutation<
      IAdvertisement,
      Pick<IAdvertisement, 'id'>
    >({
      query: ({ id, ...updatedAdvertisement }) => ({
        url: `/advertisement/${id}`,
        method: APIMethods.PUT,
        body: updatedAdvertisement,
      }),
      invalidatesTags: [APITags.AdvertisementList],
      async onQueryStarted(
        { id, ...updatedAdvertisement },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          advertisementApiSlice.util.updateQueryData(
            'getAdvertisements',
            undefined,
            (draft) => {
              const item = draft.find(
                (advertisement) => advertisement.id === id,
              );
              if (item) {
                Object.assign(item, updatedAdvertisement);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Advertisement was successfully updated.',
            }),
          );
          router.navigate(DashboardPaths.ADVERTISEMENT);
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
    deleteAdvertisement: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/advertisement/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [APITags.AdvertisementList],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          advertisementApiSlice.util.updateQueryData(
            'getAdvertisements',
            undefined,
            (draft) => {
              return draft.filter(
                (advertisement: IAdvertisement) => advertisement.id !== id,
              );
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Advertisement was successfully deleted.',
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
  useGetAdvertisementsQuery,
  useGetAdvertisementByIdQuery,
  useAddAdvertisementMutation,
  useUpdateAdvertisementMutation,
  useDeleteAdvertisementMutation,
} = advertisementApiSlice;
