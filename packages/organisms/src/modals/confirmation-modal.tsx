import { FC } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { PrimaryButton, SecondaryButton } from '@packages/atoms';

interface CustomConfirmationModalProps {
  title: string;
  message: string;
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
  handleAction: () => void;
}
export const ConfirmationModal: FC<CustomConfirmationModalProps> = ({
  title,
  message,
  isOpen,
  setIsOpen,
  handleAction,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: '20px 30px' }}>
        <SecondaryButton onClick={() => setIsOpen(false)}>
          Cancel
        </SecondaryButton>
        <PrimaryButton onClick={handleAction}>Confirm</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};
