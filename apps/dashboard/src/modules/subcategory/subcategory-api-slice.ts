import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api';
import { APIMethods, APITags, DashboardPaths } from '../../types';
import { updateAlert } from '../alert/alert-slice';
import { EnumSeverity, getErrorMessage, ISubcategory } from '@packages/common';
import { router } from '../../routes';

export const subcategoryApiSlice = createApi({
  reducerPath: 'subcategoryApi',
  baseQuery: baseQuery,
  tagTypes: [APITags.SubcategoryList],
  endpoints: (builder) => ({
    getSubcategoryById: builder.query<ISubcategory, string>({
      query: (id) => `/subcategory/${id}`,
    }),
    getSubcategories: builder.query<ISubcategory[], void>({
      query: () => '/subcategory',
      providesTags: [APITags.SubcategoryList],
    }),
    addSubcategory: builder.mutation<ISubcategory, Partial<ISubcategory>>({
      query: (newSubcategory) => ({
        url: '/subcategory',
        method: APIMethods.POST,
        body: newSubcategory,
      }),
      invalidatesTags: [APITags.SubcategoryList],
      async onQueryStarted(
        newSubcategory: ISubcategory,
        { dispatch, queryFulfilled },
      ) {
        const addResult = dispatch(
          subcategoryApiSlice.util.updateQueryData(
            'getSubcategories',
            undefined,
            (draft) => {
              draft.push(newSubcategory);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Subcategory option was successfully added.',
            }),
          );
          router.navigate(DashboardPaths.SUBCATEGORY);
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
    updateSubcategory: builder.mutation<ISubcategory, Pick<ISubcategory, 'id'>>(
      {
        query: ({ id, ...updatedSubcategory }) => ({
          url: `/subcategory/${id}`,
          method: APIMethods.PUT,
          body: updatedSubcategory,
        }),
        invalidatesTags: [APITags.SubcategoryList],
        async onQueryStarted(
          { id, ...updatedSubcategory },
          { dispatch, queryFulfilled },
        ) {
          const patchResult = dispatch(
            subcategoryApiSlice.util.updateQueryData(
              'getSubcategories',
              undefined,
              (draft) => {
                const item = draft.find((subcategory) => subcategory.id === id);
                if (item) {
                  Object.assign(item, updatedSubcategory);
                }
              },
            ),
          );
          try {
            await queryFulfilled;
            dispatch(
              updateAlert({
                alertType: EnumSeverity.SUCCESS,
                alertMessage: 'Subcategory was successfully updated.',
              }),
            );
            router.navigate(DashboardPaths.SUBCATEGORY);
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
      },
    ),
    deleteSubcategory: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/subcategory/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [APITags.SubcategoryList],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          subcategoryApiSlice.util.updateQueryData(
            'getSubcategories',
            undefined,
            (draft) => {
              return draft.filter(
                (subcategory: ISubcategory) => subcategory.id !== id,
              );
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Subcategory was successfully deleted.',
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
  useGetSubcategoriesQuery,
  useGetSubcategoryByIdQuery,
  useAddSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} = subcategoryApiSlice;
