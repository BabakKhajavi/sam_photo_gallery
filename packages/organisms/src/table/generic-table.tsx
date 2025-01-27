import { FC } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridOverlay,
} from '@mui/x-data-grid';
import { Typography } from '@mui/material';

interface ITableProps extends Partial<Omit<DataGridProps, 'rows' | 'columns'>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: Record<string, any>[];
  columns: GridColDef[];
  wrapperProps?: BoxProps;
}

const CustomNoRowsOverlay: FC = () => {
  return (
    <GridOverlay style={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography variant="h6">No records available</Typography>{' '}
      </Box>{' '}
    </GridOverlay>
  );
};

const gridId = `data-grid-x-${Math.random().toString(36).substr(2, 9)}`;
export const GenericTable: FC<ITableProps> = ({
  rows,
  columns,
  wrapperProps,
  ...dataGridProps
}) => {
  return (
    <Box sx={{ width: '100%' }} {...wrapperProps}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        aria-label={gridId}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        sx={{ height: rows.length > 0 ? '100%' : 400 }}
        {...dataGridProps}
      />
    </Box>
  );
};
