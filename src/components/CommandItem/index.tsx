import React from 'react';
import styles from './CommandItem.module.scss';

interface CommandItemProps {
  title: string;
  text: string;
}

export const CommandItem: React.FC<CommandItemProps> = ({ title, text }) => {
  return (
    <div className={styles.commandItemBlock}>
      <div className={styles.commandItemTextBlock}>
        <span className={styles.commandItemTitle}>{title}</span>
        <span className={styles.commandItemText}>{text}</span>
      </div>
    </div>
  );
};
