import { FC } from 'react';
import styles from './customButton.module.scss';

const CustomButton: FC<any> = ({
  children,
  width,
  height,
  onClick,
  disabled,
  type,
  isGolden,
  fontSize,
  tabIndex,
}) => {
  const dynamicWidth = width ? styles[width] : '';
  const dynamicHeigth = height ? styles[height] : '';
  const dynamicFontSize = fontSize ? styles[fontSize] : '';
  const daynamicBlackStyle = `${styles.btn_black} ${dynamicWidth} ${dynamicHeigth} ${dynamicFontSize}`;
  const daynamicGoldenStyle = `${styles.btn_golden} ${dynamicWidth} ${dynamicHeigth} ${dynamicFontSize}`;
  return (
    <>
      <button
        className={isGolden ? daynamicGoldenStyle : daynamicBlackStyle}
        type={type || 'button'}
        disabled={disabled}
        onClick={onClick}
        tabIndex={tabIndex || -1}
      >
        {children}
      </button>
    </>
  );
};

export default CustomButton;
