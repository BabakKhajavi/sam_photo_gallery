import { useCallback, useState, useMemo } from 'react';
import { ConfirmationModal, GenericTable } from '@packages/organisms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import TableSearch from '@packages/organisms/src/search/table-search';
import { ICity } from '@packages/common';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useAppNavigate, useDashboardAlert } from '../../../hooks';
import { useDeleteCityMutation, useGetCitiesQuery } from '../city-api-slice';
import { BoxLoading } from '@packages/molecules';
import { DashboardPaths } from '../../../types';

export function CityListContainer() {
  useDashboardAlert();
  const { navigateToPage } = useAppNavigate();
  const { data: cities, isLoading } = useGetCitiesQuery(undefined, {
    refetchOnMountOrArgChange: 120, // fresh after two minutes after the last fetch
  });
  const [deleteCity] = useDeleteCityMutation();

  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSearchString = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const filteredCitys = useMemo(() => {
    if (!cities) {
      return [];
    }

    if (!searchString) {
      return cities;
    }

    const lowerCaseSearchString = searchString.toLowerCase();

    return cities.filter((city) =>
      city.name.toLowerCase().includes(lowerCaseSearchString),
    );
  }, [searchString, cities]);

  const handleButtonClick = useCallback(() => {
    navigateToPage(
      DashboardPaths.CITY_DETAIL,
      'Create City',
      DashboardPaths.CITY,
      'City List',
      'new',
    );
  }, [navigateToPage]);

  const handleEditClick = useCallback(
    (params: GridRowParams | GridRenderCellParams) => {
      const item = params.row as ICity;

      navigateToPage(
        DashboardPaths.CITY_DETAIL,
        'Edit City',
        DashboardPaths.CITY,
        'City List',
        item.id,
      );
    },
    [navigateToPage],
  );

  const handleDeleteClick = useCallback((params: GridRenderCellParams) => {
    const item = params.row as ICity;
    setSelectedDeleteId(item?.id ?? null);
    setIsOpen(true);
  }, []);

  const handleSubmitDelete = useCallback(async () => {
    if (selectedDeleteId) {
      await deleteCity(selectedDeleteId).unwrap();
    }
    setIsOpen(false);
  }, [deleteCity, selectedDeleteId]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'name',
        headerName: 'City Name',
        flex: 1,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        headerAlign: 'center',
        width: 150,
        renderCell: (params) => (
          <>
            <IconButton
              color="primary"
              onClick={() => handleEditClick(params)}
              sx={{ fontSize: '14px' }}
            >
              <EditIcon sx={{ fontSize: 18 }} /> Edit
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleDeleteClick(params)}
              sx={{ fontSize: '14px' }}
            >
              <DeleteIcon sx={{ fontSize: 18 }} /> Delete
            </IconButton>
          </>
        ),
      },
    ],
    [handleEditClick, handleDeleteClick],
  );

  if (isLoading) {
    return <BoxLoading />;
  }

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: '10px',
        minHeight: '650px',
      }}
    >
      <TableSearch
        searchString={searchString}
        handleSearchString={handleSearchString}
        placeholder="Search by name"
        buttonText="Create City"
        handleButtonClick={handleButtonClick}
      />

      <GenericTable columns={columns} rows={filteredCitys ?? []} />

      {isOpen && (
        <ConfirmationModal
          title={'Confirm Delete City'}
          message={
            'By clicking confirm, this city will be removed permanently. If you are sure, press confirm.'
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleAction={handleSubmitDelete}
        />
      )}
    </Box>
  );
}
