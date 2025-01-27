import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api';
import { APIMethods, APITags, DashboardPaths } from '../../types';
import { updateAlert } from '../alert/alert-slice';
import { EnumSeverity, getErrorMessage, IContact } from '@packages/common';
import { router } from '../../routes';

export const contactApiSlice = createApi({
  reducerPath: 'contactApi',
  baseQuery: baseQuery,
  tagTypes: [APITags.ContactList],
  endpoints: (builder) => ({
    getContactById: builder.query<IContact, string>({
      query: (id) => `/contact/${id}`,
    }),
    getContacts: builder.query<IContact[], void>({
      query: () => '/contact',
      providesTags: [APITags.ContactList],
    }),
    addContact: builder.mutation<IContact, Partial<IContact>>({
      query: (newContact) => ({
        url: '/contact',
        method: APIMethods.POST,
        body: newContact,
      }),
      invalidatesTags: [APITags.ContactList],
      async onQueryStarted(newContact: IContact, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          contactApiSlice.util.updateQueryData(
            'getContacts',
            undefined,
            (draft) => {
              draft.push(newContact);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Contact option was successfully added.',
            }),
          );
          router.navigate(DashboardPaths.CONTACT);
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
    updateContact: builder.mutation<IContact, Pick<IContact, 'id'>>({
      query: ({ id, ...updatedContact }) => ({
        url: `/contact/${id}`,
        method: APIMethods.PUT,
        body: updatedContact,
      }),
      invalidatesTags: [APITags.ContactList],
      async onQueryStarted(
        { id, ...updatedContact },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          contactApiSlice.util.updateQueryData(
            'getContacts',
            undefined,
            (draft) => {
              const item = draft.find((contact) => contact.id === id);
              if (item) {
                Object.assign(item, updatedContact);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Contact was successfully updated.',
            }),
          );
          router.navigate(DashboardPaths.CONTACT);
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
    deleteContact: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [APITags.ContactList],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          contactApiSlice.util.updateQueryData(
            'getContacts',
            undefined,
            (draft) => {
              return draft.filter((contact: IContact) => contact.id !== id);
            },
          ),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'Contact was successfully deleted.',
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
  useGetContactsQuery,
  useGetContactByIdQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApiSlice;
