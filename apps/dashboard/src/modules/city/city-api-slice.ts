import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api';
import { APIMethods, APITags, DashboardPaths } from '../../types';
import { updateAlert } from '../alert/alert-slice';
import { EnumSeverity, getErrorMessage, ICity } from '@packages/common';
import { router } from '../../routes';

export const cityApiSlice = createApi({
  reducerPath: 'cityApi',
  baseQuery: baseQuery,
  tagTypes: [APITags.CityList],
  endpoints: (builder) => ({
    getCityById: builder.query<ICity, string>({
      query: (id) => `/city/${id}`,
    }),
    getCities: builder.query<ICity[], void>({
      query: () => '/city',
      providesTags: [APITags.CityList],
    }),
    addCity: builder.mutation<ICity, Partial<ICity>>({
      query: (newCity) => ({
        url: '/city',
        method: APIMethods.POST,
        body: newCity,
      }),
      invalidatesTags: [APITags.CityList],
      async onQueryStarted(newCity: ICity, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          cityApiSlice.util.updateQueryData('getCities', undefined, (draft) => {
            draft.push(newCity);
          }),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'City option was successfully added.',
            }),
          );
          router.navigate(DashboardPaths.CITY);
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
    updateCity: builder.mutation<ICity, Pick<ICity, 'id'>>({
      query: ({ id, ...updatedCity }) => ({
        url: `/city/${id}`,
        method: APIMethods.PUT,
        body: updatedCity,
      }),
      invalidatesTags: [APITags.CityList],
      async onQueryStarted(
        { id, ...updatedCity },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          cityApiSlice.util.updateQueryData('getCities', undefined, (draft) => {
            const item = draft.find((city) => city.id === id);
            if (item) {
              Object.assign(item, updatedCity);
            }
          }),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'City was successfully updated.',
            }),
          );
          router.navigate(DashboardPaths.CITY);
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
    deleteCity: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/city/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [APITags.CityList],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          cityApiSlice.util.updateQueryData('getCities', undefined, (draft) => {
            return draft.filter((city: ICity) => city.id !== id);
          }),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'City was successfully deleted.',
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
  useGetCitiesQuery,
  useGetCityByIdQuery,
  useAddCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} = cityApiSlice;
