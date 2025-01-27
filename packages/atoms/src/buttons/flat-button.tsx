import { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';

type SecondaryButtonProps = ButtonProps & {
  handleClick?: () => void;
  isGolden?: boolean;
};

export const FlatButton: FC<SecondaryButtonProps> = ({
  handleClick,
  children,
  isGolden,
  ...props
}) => {
  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      sx={{
        border: 'none',
        backgroundColor: 'transparent !important',
        fontSize: 18,
        color: (theme) =>
          isGolden
            ? theme.palette.customColors.golden
            : theme.palette.common.black,
        '&:hover': {
          color: (theme) =>
            isGolden
              ? theme.palette.customColors.lightGolden
              : theme.palette.customColors.lightGray,
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
