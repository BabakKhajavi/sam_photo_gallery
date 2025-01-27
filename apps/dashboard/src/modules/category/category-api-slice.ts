import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api';
import { APIMethods, APITags, DashboardPaths } from '../../types';
import { updateAlert } from '../alert/alert-slice';
import { EnumSeverity, getErrorMessage, ICategory } from '@packages/common';
import { router } from '../../routes';

export const categoryApiSlice = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQuery,
  tagTypes: [APITags.CategoryList],
  endpoints: (builder) => ({
    getCategoryById: builder.query<ICategory, string>({
      query: (id) => `/category/${id}`,
    }),
    getCategories: builder.query<ICategory[], void>({
      query: () => '/category',
      providesTags: [APITags.CategoryList],
    }),
    addCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: (newCategory) => ({
        url: '/category',
        method: APIMethods.POST,
        body: newCategory,
      }),
      invalidatesTags: [APITags.CategoryList],
      async onQueryStarted(
        newCategory: ICategory,
        { dispatch, queryFulfilled },
      ) {
        const addResult = dispatch(
          categoryApiSlice.util.updateQueryData(
            'getCategories',
            undefined,
            (draft) => {
              draft.push(newCategory);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Category option was successfully added.',
            }),
          );
          router.navigate(DashboardPaths.CATEGORY);
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
    updateCategory: builder.mutation<ICategory, Pick<ICategory, 'id'>>({
      query: ({ id, ...updatedCategory }) => ({
        url: `/category/${id}`,
        method: APIMethods.PUT,
        body: updatedCategory,
      }),
      invalidatesTags: [APITags.CategoryList],
      async onQueryStarted(
        { id, ...updatedCategory },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          categoryApiSlice.util.updateQueryData(
            'getCategories',
            undefined,
            (draft) => {
              const item = draft.find((category) => category.id === id);
              if (item) {
                Object.assign(item, updatedCategory);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Category was successfully updated.',
            }),
          );
          router.navigate(DashboardPaths.CATEGORY);
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
    deleteCategory: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/category/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [APITags.CategoryList],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          categoryApiSlice.util.updateQueryData(
            'getCategories',
            undefined,
            (draft) => {
              return draft.filter((category: ICategory) => category.id !== id);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Category was successfully deleted.',
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
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
