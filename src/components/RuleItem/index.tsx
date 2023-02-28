import React, { ReactNode } from 'react';
import styles from './RuleItem.module.scss';

interface RuleItemProps {
  ruleItem: string | ReactNode;
}

export const RuleItem: React.FC<RuleItemProps> = ({ ruleItem }) => {
  return (
    <div className={styles.ruleItemBlock}>
      <div className={styles.ruleItemText}>{ruleItem}</div>
      <hr className={styles.line} />
    </div>
  );
};
