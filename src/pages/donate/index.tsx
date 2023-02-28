import React from 'react';
import { DonateItem } from '@/components/DonateItem';
import { PageArticle } from '@/components/PageArticle';
import { donates } from '@/data/donates';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from './Donate.module.scss';
import { Api } from '@/utils/api';
import { ResponseUser } from '@/utils/api/types';

const Donate: NextPage = () => {
  const [userData, setUserData] = React.useState<ResponseUser>();

  const handleChangeUserData = () => {
    (async () => {
      try {
        const data = await Api().user.getMe();

        setUserData(data);
      } catch (err) {
        console.warn(err);
      }
    })();
  };

  React.useEffect(() => {
    (async () => {
      try {
        const data = await Api().user.getMe();

        setUserData(data);
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Платные услуги</title>
      </Head>
      <div>
        <div className={styles.container}>
          <div className={styles.inner}>
            <PageArticle
              title="Платные услуги"
              text="Хотите получить максимум удовольствия от игры? Мы предлагаем вам несколько платных привелегий"
              width={900}
            />
            <div className={styles.donatesList}>
              {donates.map((obj) => (
                <DonateItem
                  {...obj}
                  key={obj.donateNumber}
                  userData={userData}
                  handleChangeUserData={handleChangeUserData}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donate;
