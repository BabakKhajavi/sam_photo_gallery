import { FC, useState } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonInputProps } from '../../types/props/customFileUpload.types';
import styles from './customFileUpload.module.scss';

const CustomFileUpload: FC<ButtonInputProps> = ({
  children,
  padding,
  margin,
  backgroundcolor,
  color,
  hoverbackcolor,
  hovertextcolor,
  disabledbackcolor,
  disabledtextcolor,
  height,
  disabled,
  handleUploadFile,
  handleClearFile,
  fileName,
  placehoder,
}) => {
  const [localFileName, setLocalFileName] = useState(fileName);
  return (
    <div className={styles.upload_button_wraper}>
      <Button
        variant="contained"
        className={styles.upload_button}
        component="label"
        disabled={disabled}
      >
        {children}
        <input
          type="file"
          hidden
          onChange={(e) => {
            if (e.target.files) {
              handleUploadFile(e);
              const newFile = e.target.files[0];
              setLocalFileName(newFile.name);
            }
          }}
        />
      </Button>
      <TextField
        size="small"
        fullWidth
        value={localFileName}
        placeholder={placehoder}
        disabled={disabled}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <FontAwesomeIcon
                className={styles.icon}
                icon={faTimesCircle}
                onClick={() => {
                  handleClearFile();
                  setLocalFileName('');
                }}
              />
            </InputAdornment>
          ),
          style: {
            borderLeft: 'none',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            height: '40px',
          },
        }}
      />
    </div>
  );
};

export default CustomFileUpload;
