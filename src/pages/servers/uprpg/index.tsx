/* eslint-disable @next/next/no-img-element */
import { PageArticle } from '@/components/PageArticle';
import { ServerInfo } from '@/components/ServerInfo';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from './UpRpg.module.scss';
import UpRpgBg from '@/assets/images/UpRpgBg.png';

const UpRpg: NextPage = () => {
  return (
    <>
      <Head>
        <title>UpRpg</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.serverPageHeading}>
          <PageArticle
            title="UpRpg"
            text="Новые миры, могущественные противники и древняя магия уже ждут тебя! Сильнейшие артефакты и захватывающие битвы — приводи друзей, объединяйтесь в кланы и отправляйтесь на завоевание новых земель!"
            width={900}
            color="#EC6DB9"
          />
          <img src={UpRpgBg.src} width={521} height={289} alt="background image" />
        </div>
        <p className={styles.information} style={{ color: '#EC6DB9' }}>
          Информация
        </p>
        <ServerInfo
          version="1.12.2"
          mapSize="9.000x9.000"
          wipeFrequency="Каждые 14 дней"
          lastWipe="11.01.2023"
          color="#EC6DB9"
        />
      </div>
    </>
  );
};

export default UpRpg;
