'use client';
import { FC } from 'react';
import Link from 'next/link';
import styles from './headerMobileLayout.module.scss';
import { HeaderLayoutProps } from '../../../../../types/props/headerLayout.types';
import Image from 'next/image';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faList } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '@/components/button/customButton';
import { useAppDispatch } from '@/store/reduxHooks';
import { useMenu } from '@/hooks/useMenu';
import { toggleSideMenu } from '@/app/layout/sidemenu/menuSlice';
const HeaderMobileLayout: FC<HeaderLayoutProps> = ({
  toggleSideMenuChecked,
}) => {
  const dispatch = useAppDispatch();
  const menu = useMenu();
  const handleClickOpenRequestmodal = () => {
    // gaEvent({
    //   action: 'click_get_started',
    //   label: 'Get Started (Header)',
    // });
    // router.push('/request');
  };
  const displaySideMenu = () => {
    dispatch(toggleSideMenu(!menu.isSideMenuOpen));
  };
  return (
    <div className={styles.mobile_header_wrapper}>
      <div className={styles.info_wrapper}>
        <div className={styles.left_wrapper}>
          <Link href={'/'} as={'image'} className={styles.left_wrapper}>
            <Image
              className={styles.logo_img}
              src={'/images/main-logo.webp'}
              alt="a golden closet logo"
              width={197}
              height={40}
              priority
            />
          </Link>
        </div>
        <div className={styles.right_wrapper}>
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
          <div className={styles.info_cell_icon}>
            <FontAwesomeIcon icon={faList} onClick={displaySideMenu} />
          </div>
        </div>
      </div>
      <div className={styles.menu_wrapper}>
        <div className={styles.search_cell}>
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
        </div>
        <div className={styles.search_icon}>
          <Image
            className={styles.icon}
            src={'/images/search.webp'}
            width={25}
            height={25}
            alt="instagram"
          />
        </div>
        <div className={styles.right_wrapper}>
          <div className={styles.info_cell}>
            <CustomButton isGolden height="height_md">
              <a href="tel:+14168935540" className={styles.phone_link}>
                Call Us Now
              </a>
            </CustomButton>
          </div>
          <div className={styles.info_cell}>
            <CustomButton
              onClick={handleClickOpenRequestmodal}
              isGolden
              height="height_md"
            >
              Free Consultation
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMobileLayout;
