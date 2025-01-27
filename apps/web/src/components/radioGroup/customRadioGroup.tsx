import { FC } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

interface ButtonInputProps {
  title?: string;
  value: string;
  elementName?: string;
  radioList: Array<{ value: string; label: string }>;
  rowDirection?: boolean;
  handleScheduleContact: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
// const UploadButtonWrraper = styled(Button)`
//   display: grid;
//   grid-template-columns: auto 1fr;
//   grid-gap: 0;
//   width: 100%;
//   padding: 0;
// `;
// const UploadButton = styled(Button)<StyledProps>`
//   margin: 0;
//   border: none;
//   outline: none;
//   border-radius: 0;
//   border-bottom-left-radius: 4px;
//   border-top-left-radius: 4px;
//   height: ${(props) => props.height || '40px'};
//   color: ${(props) => props.textColor || '#e4cd84'};
//   background-color: ${(props) => props.backgroundColor || '#000000'};
//   cursor: pointer;
//   text-transform: capitalize;
//   &:hover {
//     background-color: ${(props) => props.hoverBackColor || '#66666e'};
//     color: ${(props) => props.hoverTextColor || '#fed766'};
//   }
//   &:disabled {
//     cursor: default;
//     background-color: ${(props) => props.disabledBackColor || '#e6e8e6'};
//     color: ${(props) => props.disabledTextColor || '#7e7f83'};
//   }
// `;

const CustomRadioGroup: FC<ButtonInputProps> = ({
  title,
  value,
  elementName,
  radioList,
  rowDirection,
  handleScheduleContact,
}) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{title}</FormLabel>
      <RadioGroup
        row={rowDirection}
        name={elementName}
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        onChange={handleScheduleContact}
      >
        {radioList.map((radio, index) => (
          <FormControlLabel
            key={index}
            value={radio.value}
            control={
              <Radio
                sx={{
                  color: '#000000',
                  '&.Mui-checked': {
                    color: '#000000',
                  },
                }}
              />
            }
            label={radio.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
