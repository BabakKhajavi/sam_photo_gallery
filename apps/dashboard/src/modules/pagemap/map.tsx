import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../store/redux-hooks';
import { useAppNavigate } from '../../hooks';
import { Box, IconButton, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PageHeader = () => {
  const { backToReferencePage } = useAppNavigate();
  const { pageTitle } = useAppSelector((state) => state.mapReducer);
  const handleBackToList: () => void = () => {
    backToReferencePage();
  };

  return (
    <Box pb={3} pl={2}>
      <Typography
        variant="h4"
        onClick={handleBackToList}
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        {(pageTitle?.toLowerCase().startsWith('edit') ||
          pageTitle?.toLowerCase().startsWith('create')) && (
          <IconButton>
            <FontAwesomeIcon icon={faChevronLeft} />
          </IconButton>
        )}
        {pageTitle}
      </Typography>
    </Box>
  );
};
