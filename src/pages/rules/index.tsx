import { PageArticle } from '@/components/PageArticle';
import { RuleItem } from '@/components/RuleItem';
import { rules } from '@/data/rules';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from './Rules.module.scss';

const Rules: NextPage = () => {
  return (
    <>
      <Head>
        <title>Правила проекта</title>
      </Head>
      <div className={styles.container}>
        <div>
          <PageArticle
            title="Правила проекта"
            text="Каждый зарегистрированный пользователь обязан соблюдать правила, вне зависимости от должности, статуса и прочих заслуг."
            width={900}
          />
          <h2 className={styles.commonRulesHeading}>1. Общие правила</h2>
          {rules?.commonRules?.map((ruleItem, index) => (
            <RuleItem ruleItem={ruleItem} key={index} />
          ))}
        </div>
        <div className={styles.gameRulesContainer}>
          <h2 className={styles.gameRulesHeading}>2. Игровой процесс</h2>
          {rules?.gameRules?.map((ruleItem, index) => (
            <RuleItem ruleItem={ruleItem} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rules;
