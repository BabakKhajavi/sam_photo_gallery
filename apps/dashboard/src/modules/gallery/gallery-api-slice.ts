import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api';
import { APIMethods, APITags, DashboardPaths } from '../../types';
import { updateAlert } from '../alert/alert-slice';
import { EnumSeverity, getErrorMessage, IGallery } from '@packages/common';
import { router } from '../../routes';

export const galleryApiSlice = createApi({
  reducerPath: 'galleryApi',
  baseQuery: baseQuery,
  tagTypes: [APITags.GalleryList],
  endpoints: (builder) => ({
    getGalleryById: builder.query<IGallery, string>({
      query: (id) => `/gallery/${id}`,
    }),
    getGalleries: builder.query<IGallery[], void>({
      query: () => '/gallery',
      providesTags: [APITags.GalleryList],
    }),
    addGallery: builder.mutation<IGallery, Partial<IGallery>>({
      query: (newGallery) => {
        const formData = new FormData();
        Object.entries(newGallery).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });
        return {
          url: '/gallery',
          method: APIMethods.POST,
          body: formData,
        };
      },
      invalidatesTags: [APITags.GalleryList],
      async onQueryStarted(newGallery: IGallery, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          galleryApiSlice.util.updateQueryData(
            'getGalleries',
            undefined,
            (draft) => {
              draft.push(newGallery);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Gallery option was successfully added.',
            }),
          );
          router.navigate(DashboardPaths.GALLERY);
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
    updateGallery: builder.mutation<IGallery, Pick<IGallery, 'id'>>({
      query: ({ id, ...updatedGallery }) => {
        const formData = new FormData();
        Object.entries(updatedGallery).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });
        return {
          url: `/gallery/${id}`,
          method: APIMethods.PUT,
          body: formData,
        };
      },
      invalidatesTags: [APITags.GalleryList],
      async onQueryStarted(
        { id, ...updatedGallery },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          galleryApiSlice.util.updateQueryData(
            'getGalleries',
            undefined,
            (draft) => {
              const item = draft.find((gallery) => gallery.id === id);
              if (item) {
                Object.assign(item, updatedGallery);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Gallery was successfully updated.',
            }),
          );
          router.navigate(DashboardPaths.GALLERY);
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
    deleteGallery: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [APITags.GalleryList],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          galleryApiSlice.util.updateQueryData(
            'getGalleries',
            undefined,
            (draft) => {
              return draft.filter((gallery: IGallery) => gallery.id !== id);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Gallery was successfully deleted.',
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
  useGetGalleriesQuery,
  useGetGalleryByIdQuery,
  useAddGalleryMutation,
  useUpdateGalleryMutation,
  useDeleteGalleryMutation,
} = galleryApiSlice;
