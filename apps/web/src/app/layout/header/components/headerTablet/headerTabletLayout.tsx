'use client';
import { FC } from 'react';
import Link from 'next/link';
import styles from './headerTabletLayout.module.scss';
import { HeaderLayoutProps } from '../../../../../types/props/headerLayout.types';
import Image from 'next/image';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faList } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '@/components/button/customButton';
import { useMenu } from '@/hooks/useMenu';
import { useAppDispatch } from '@/store/reduxHooks';
import { toggleSideMenu } from '@/app/layout/sidemenu/menuSlice';
const HeaderTabletLayout: FC<HeaderLayoutProps> = () => {
  const menu = useMenu();
  const dispatch = useAppDispatch();
  const handleClickOpenRequestmodal = () => {
    // gaEvent({
    //   action: 'click_get_started',
    //   label: 'Get Started (Header)',
    // });
    // router.push('/request');
  };
  const displayMenu = () => {
    dispatch(toggleSideMenu(!menu.isSideMenuOpen));
  };
  return (
    <div className={styles.tablet_header_wrapper}>
      <div className={styles.left_wrapper}>
        <Link href={'/'} as={'image'}>
          <Image
            src={'/images/main-logo.webp'}
            alt="a golden closet logo"
            width={400}
            height={81}
            priority
          />
        </Link>
      </div>
      <div className={styles.right_wrapper}>
        <div className={styles.info_wrapper}>
          <div className={styles.info_cell}>
            <CustomButton isGolden height="height_md">
              <a href="tel:+14168935540" className={styles.phone_link}>
                Call Us Now
              </a>
            </CustomButton>
          </div>
          <div className={styles.vertical_divider} />
          <div className={styles.info_cell_md}>
            <CustomButton
              onClick={handleClickOpenRequestmodal}
              isGolden
              height="height_md"
            >
              Free Consultation
            </CustomButton>
          </div>
          <div className={styles.vertical_divider} />
          <div className={styles.info_cell_icon_lg}>
            <FontAwesomeIcon icon={faList} onClick={displayMenu} />
          </div>
        </div>
        <div className={styles.menu_wrapper}>
          <FormControl
            fullWidth
            sx={{
              width: '100%',
              height: '28px',
              backgroundColor: 'white',
              borderRadius: '5px',
            }}
            variant="outlined"
            size="small"
            disabled
          >
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={
                <InputAdornment
                  id="search-adorment"
                  style={{ backgroundColor: 'white' }}
                  position="end"
                >
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ width: '14px' }}
                    />
                  </IconButton>
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                style: {
                  height: '12px',
                  width: '100%',
                  fontSize: '12px',
                  lineHeight: '12px',
                },
                'aria-label': 'weight',
              }}
            />
          </FormControl>
          <Link
            href="https://www.instagram.com/optimized.closets/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
            target="_blank"
            className={styles.social_media_link}
            as={'image'}
          >
            <Image
              className={styles.icon}
              src={'/images/instagram.webp'}
              width={25}
              height={25}
              alt="instagram"
            />
          </Link>
          <Link
            href="https://www.facebook.com/optimized.closets"
            target="_blank"
            className={styles.social_media_link}
            as={'image'}
          >
            <Image
              className={styles.icon}
              src={'/images/facebook.webp'}
              width={25}
              height={25}
              alt="facebook"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderTabletLayout;
