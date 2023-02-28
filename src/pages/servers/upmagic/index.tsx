/* eslint-disable @next/next/no-img-element */
import { PageArticle } from '@/components/PageArticle';
import { ServerInfo } from '@/components/ServerInfo';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from './UpMagic.module.scss';
import UpMagicBg from '@/assets/images/UpMagicBg.png';

const UpMagic: NextPage = () => {
  return (
    <>
      <Head>
        <title>UpMagic</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.serverPageHeading}>
          <PageArticle
            title="UpMagic"
            text="Изучай магические заклинания, создавай алтари и низвергай на противников молнии при помощи магических посохов."
            width={900}
            color="#956DEC"
          />
          <img src={UpMagicBg.src} width={521} height={289} alt="background image" />
        </div>
        <p className={styles.information} style={{ color: '#956DEC' }}>
          Информация
        </p>

        <ServerInfo
          version="1.12.2"
          mapSize="10.000x10.000"
          wipeFrequency="Каждые 14 дней"
          lastWipe="11.01.2023"
          color="#956DEC"
        />
      </div>
    </>
  );
};

export default UpMagic;
