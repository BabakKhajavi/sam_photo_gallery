import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api';
import { APIMethods, APITags, DashboardPaths, Login } from '../../types';
import { updateAlert } from '../alert/alert-slice';
import {
  EnumSeverity,
  getErrorMessage,
  IUser,
  LoginResponse,
} from '@packages/common';
import { router } from '../../routes';

export const usersApiSlice = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQuery,
  tagTypes: [APITags.UserList],
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, string>({
      query: (id) => `/auth/users/${id}`,
    }),
    getUsers: builder.query<IUser[], void>({
      query: () => '/auth/users',
      providesTags: [APITags.UserList],
    }),
    addUser: builder.mutation<IUser, Partial<IUser>>({
      query: (newUser) => ({
        url: '/auth/register',
        method: APIMethods.POST,
        body: newUser,
      }),
      invalidatesTags: [APITags.UserList],
      async onQueryStarted(newUser: IUser, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          usersApiSlice.util.updateQueryData('getUsers', undefined, (draft) => {
            draft.push(newUser);
          }),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'User option was successfully added.',
            }),
          );
          router.navigate(DashboardPaths.USER);
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
    login: builder.mutation<LoginResponse, Login>({
      query: (newUser) => ({
        url: '/auth/login',
        method: APIMethods.POST,
        body: newUser,
      }),
      invalidatesTags: [APITags.UserList],
      async onQueryStarted(newUser: IUser, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'You logged in successfully!',
            }),
          );
          router.navigate(DashboardPaths.ROOT);
        } catch (error) {
          dispatch(
            updateAlert({
              alertType: EnumSeverity.ERROR,
              alertMessage: getErrorMessage(error),
            }),
          );
        }
      },
    }),
    updateUser: builder.mutation<IUser, Pick<IUser, 'id'>>({
      query: ({ id, ...updatedUser }) => ({
        url: `/auth/${id}`,
        method: APIMethods.PUT,
        body: updatedUser,
      }),
      invalidatesTags: [APITags.UserList],
      async onQueryStarted(
        { id, ...updatedUser },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          usersApiSlice.util.updateQueryData('getUsers', undefined, (draft) => {
            const item = draft.find((users) => users.id === id);
            if (item) {
              Object.assign(item, updatedUser);
            }
          }),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'User was successfully updated.',
            }),
          );
          router.navigate(DashboardPaths.USER);
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
    deleteUser: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/auth/${id}`,
        method: APIMethods.DELETE,
      }),
      invalidatesTags: [APITags.UserList],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          usersApiSlice.util.updateQueryData('getUsers', undefined, (draft) => {
            return draft.filter((users: IUser) => users.id !== id);
          }),
        );
        try {
          await queryFulfilled;
          dispatch(
            updateAlert({
              alertType: EnumSeverity.SUCCESS,
              alertMessage: 'User was successfully deleted.',
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
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginMutation,
} = usersApiSlice;
