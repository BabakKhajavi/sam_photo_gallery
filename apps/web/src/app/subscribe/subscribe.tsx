import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import CustomButton from '../../components/button/customButton';
// import { gaEvent } from '@/utils/gtag';
import styles from './subscribe.module.scss';
import { SubscribeProps } from '../../types/subscribe.types';

const Subscribe: FC<SubscribeProps> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main_wrapper}>
        <div className={styles.left_wrapper}>
          <h5 className={styles.title}>
            Join us for offers and organazation tips
          </h5>
          <div className={styles.form_wrapper}>
            <TextField
              size="small"
              fullWidth
              value={''}
              placeholder="Name"
              InputProps={{
                style: {
                  height: '40px',
                  backgroundColor: '#fff',
                },
              }}
            />
            <TextField
              size="small"
              fullWidth
              value={''}
              placeholder="Email"
              InputProps={{
                style: {
                  height: '40px',
                  backgroundColor: '#fff',
                },
              }}
            />
            <CustomButton isGolden height="height_lg" width="width_sm">
              Subscribe
            </CustomButton>
          </div>
        </div>
        <div className={styles.right_wrapper}>
          <h5 className={styles.title}>Follow us on our social media</h5>
          <div className={styles.social_media_wrapper}>
            <Link
              href="https://www.instagram.com/optimized.closets/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
              target="_blank"
              style={{ paddingTop: '2px' }}
            >
              <div className={styles.social_media_item_wrapper}>
                <Image
                  className={styles.icon}
                  src={'/images/instagram.webp'}
                  width={20}
                  height={20}
                  alt="instagram"
                />
                <span>optimized.closets</span>
              </div>
            </Link>
            <Link
              href="https://www.facebook.com/optimized.closets"
              target="_blank"
              style={{ paddingTop: '2px' }}
            >
              <div className={styles.social_media_item_wrapper}>
                <Image
                  className={styles.icon}
                  src={'/images/facebook.webp'}
                  width={20}
                  height={20}
                  alt="facebook"
                />
                <span>optimized.closets</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
