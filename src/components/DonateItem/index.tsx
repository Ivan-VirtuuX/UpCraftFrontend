/* eslint-disable @next/next/no-img-element */
import { StaticImageData } from 'next/image';
import React from 'react';
import styles from './DonateItem.module.scss';
import { DonateForm } from '@/components/DonateForm';
import { ResponseUser } from '@/utils/api/types';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface DonateItemProps {
  color: string;
  donateNumber: number;
  title: string;
  text: {
    mainDescription: string[];
    kitsDescription: string[];
  };
  price: number;
  donatePageImg: StaticImageData;
  isLineVisible: boolean;
  userData?: ResponseUser;
  handleChangeUserData: () => void;
}

export const DonateItem: React.FC<DonateItemProps> = ({
  color,
  donateNumber,
  title,
  text,
  price,
  donatePageImg,
  isLineVisible,
  userData,
  handleChangeUserData,
}) => {
  const [authVisible, setAuthVisible] = React.useState(false);

  const matches1500 = useMediaQuery('(max-width:1500px)');

  return (
    <>
      <div className={styles.donateItemWrapper}>
        <div className={styles.donateItemContainer}>
          <div>
            <div className={styles.donateNumberHead}>
              <span style={{ background: color }}>{donateNumber}</span>
              <h2 className={styles.title} style={{ color: color }}>
                {title}
              </h2>
            </div>
            <div className={styles.description}>
              <ul className={styles.mainDescription}>
                <span>Основное</span>
                {text.mainDescription.map((text: string, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
              <ul className={styles.kitsDescription}>
                <span>Киты</span>
                {text.kitsDescription.map((text: string, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            </div>
          </div>
          {!matches1500 && <img src={donatePageImg.src} alt="donate page image" />}
        </div>
        {userData && (
          <div className={styles.donateActions}>
            {title !== userData?.donate?.name ? (
              <>
                <span className={styles.price} style={{ color }}>
                  {price} ₽/МЕС
                </span>
                <button
                  style={{ background: color, marginBottom: !isLineVisible ? 50 : 0 }}
                  className={styles.buyButton}
                  onClick={() => setAuthVisible(true)}>
                  КУПИТЬ
                </button>
              </>
            ) : (
              <span className={styles.boughtButton}>Куплено</span>
            )}
          </div>
        )}
        {isLineVisible && <hr className={styles.line} />}
      </div>
      <DonateForm
        handleChangeUserData={handleChangeUserData}
        onClose={() => setAuthVisible(false)}
        visible={authVisible}
        donateStatus={title}
        color={color}
        price={price}
      />
    </>
  );
};
