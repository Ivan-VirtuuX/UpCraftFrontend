import { answers } from '@/data/answers';
import { Answer } from '@/components/Answer';
import { PageArticle } from '@/components/PageArticle';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from './Faq.module.scss';

const Faq: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ответы на вопросы</title>
      </Head>
      <div className={styles.container}>
        <PageArticle
          title="Частозадаваемые вопросы"
          text="Здесь находятся ответы на частозадаваемые вопросы."
          width={900}
        />
        <div className={styles.answers}>
          {answers.map((obj) => (
            <Answer {...obj} key={obj.color} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Faq;
