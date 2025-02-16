import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlices, rootReducer } from './root-reducer';

const root_url = process.env.REACT_APP_ROOT_URL;

export function setupStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: root_url,
        },
        serializableCheck: false,
      }).concat(apiSlices.map((slice) => slice.middleware)),
    preloadedState,
  });

  setupListeners(store.dispatch);

  return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

const loadState = (): Partial<RootState> => {
  try {
    const serializedAuthState = localStorage.getItem('authState');
    const serializedMapState = localStorage.getItem('mapState');
    const authReducer = serializedAuthState
      ? JSON.parse(serializedAuthState)
      : undefined;
    const mapReducer = serializedMapState
      ? JSON.parse(serializedMapState)
      : undefined;

    return {
      authReducer,
      mapReducer,
    };
  } catch {
    return {};
  }
};

const saveState = (state: RootState) => {
  try {
    const serializedAuthState = JSON.stringify(state.authReducer);
    const serializedMapState = JSON.stringify(state.mapReducer);
    localStorage.setItem('authState', serializedAuthState);
    localStorage.setItem('mapState', serializedMapState);
  } catch {
    console.log('Error saving state');
  }
};

const preloadedState = loadState();
const store = setupStore(preloadedState);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
