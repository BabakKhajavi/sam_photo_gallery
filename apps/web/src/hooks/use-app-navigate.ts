import { useCallback } from 'react';
import { updatePagemap } from '../modules/pagemap/map-slice';
import { useAppDispatch, useAppSelector } from '../store/redux-hooks';
import { useNavigate } from 'react-router-dom';

interface UseAppNavigateResult {
  backToReferencePage: () => void;
  navigateToPage: (
    to: string,
    pageTitle: string,
    referencePath: string,
    referencePageTitle: string,
    id?: string | number,
  ) => void;
}

export const useAppNavigate = (): UseAppNavigateResult => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { referencePath, referencePageTitle } = useAppSelector(
    (state) => state.mapReducer,
  );

  const navigateToPage = useCallback(
    (
      to: string,
      pageTitle: string,
      referencePath: string,
      referencePageTitle: string,
      id?: string | number,
    ) => {
      let navigateToPath = to;
      if (id) {
        navigateToPath = `${to}/${id}`;
      }
      dispatch(
        updatePagemap({
          pageTitle,
          referencePath,
          referencePageTitle,
        }),
      );
      navigate(navigateToPath);
    },
    [dispatch, navigate],
  );

  const backToReferencePage = useCallback(() => {
    dispatch(
      updatePagemap({
        pageTitle: referencePageTitle,
        referencePath: referencePath,
        referencePageTitle: '',
      }),
    );
    navigate(referencePath);
  }, [dispatch, referencePageTitle, referencePath, navigate]);

  return { backToReferencePage, navigateToPage };
};
