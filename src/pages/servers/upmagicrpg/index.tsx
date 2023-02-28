/* eslint-disable @next/next/no-img-element */
import { PageArticle } from '@/components/PageArticle';
import { ServerInfo } from '@/components/ServerInfo';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from './UpMagicRpg.module.scss';
import UpMagicRpgBg from '@/assets/images/UpMagicRpgBg.png';

const UpMagicRpg: NextPage = () => {
  return (
    <>
      <Head>
        <title>UpMagicRpg</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.serverPageHeading}>
          <PageArticle
            title="UpMagicRpg"
            text="Разгадай все тайны и загадки магии, удивляйте друзей или же поражайте врагов несокрушимой силой. Сервер разнообразит твою игру большим числом уникальных крафтов и изучений, которые больше нигде не увидишь."
            width={900}
            color="#6D7AEC"
          />
          <img src={UpMagicRpgBg.src} width={521} height={289} alt="background image" />
        </div>
        <p className={styles.information} style={{ color: '#6D7AEC' }}>
          Информация
        </p>
        <ServerInfo
          version="1.12.2"
          mapSize="12.000x12.000"
          wipeFrequency="Каждые 7 дней"
          lastWipe="05.01.2023"
          color="#6D7AEC"
        />
      </div>
    </>
  );
};

export default UpMagicRpg;
