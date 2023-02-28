/* eslint-disable @next/next/no-img-element */
import { PageArticle } from '@/components/PageArticle';
import { ServerInfo } from '@/components/ServerInfo';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from './UpClassic.module.scss';
import UpClassicBg from '@/assets/images/UpClassicBg.png';

const UpClassic: NextPage = () => {
  return (
    <>
      <Head>
        <title>UpClassic</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.serverPageHead}>
          <PageArticle
            title="UpClassic"
            text="Уютный сервер с ванильным выживанием! Присутствует всё, что нужно для комфортной игры: приваты, система варпов, домов, разные миры, автоматические вайпы доп. миров, экономика, питомцы, аукционы и многое другое!"
            width={900}
            color="#EB6363"
          />
          <img src={UpClassicBg.src} width={521} height={289} alt="background image" />
        </div>
        <p className={styles.information}>Информация</p>
        <ServerInfo
          version="1.16.5"
          mapSize="15.000x15.000"
          wipeFrequency="Каждые 14 дней"
          lastWipe="25.01.2023"
          color="#EB6363"
        />
      </div>
    </>
  );
};

export default UpClassic;
