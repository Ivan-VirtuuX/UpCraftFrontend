import { commands } from '@/data/commands';
import { CommandItem } from '@/components/CommandItem';
import { PageArticle } from '@/components/PageArticle';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from './Commands.module.scss';

const Commands: NextPage = () => {
  return (
    <>
      <Head>
        <title>Список команд</title>
      </Head>
      <div className={styles.container}>
        <PageArticle
          title="Список команд"
          text="Здесь находится список полезных команд, доступных на наших серверах."
          width={900}
        />
        <div className={styles.commandsList}>
          {commands.map((obj) => (
            <CommandItem {...obj} key={obj.title} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Commands;
