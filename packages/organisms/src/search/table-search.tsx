import { Box, TextField } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { FC } from 'react';

interface ITableSearchProps {
  searchString: string;
  handleSearchString: (value: string) => void;
  placeholder: string;
  buttonText: string;
  buttonIsDisabled?: boolean;
  handleButtonClick: () => void;
}

const TableSearch: FC<ITableSearchProps> = ({
  searchString,
  handleSearchString,
  placeholder,
  buttonText,
  handleButtonClick,
  buttonIsDisabled,
}) => {
  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: '1fr auto' }}
      columnGap={2}
      mb={2}
    >
      <TextField
        id={`search-${buttonText.replaceAll(' ', '-')}`}
        value={searchString}
        onChange={(e) => handleSearchString(e.target.value)}
        placeholder={placeholder}
      />

      <PrimaryButton onClick={handleButtonClick} disabled={buttonIsDisabled}>
        {buttonText}
      </PrimaryButton>
    </Box>
  );
};

export default TableSearch;
