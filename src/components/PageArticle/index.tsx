import { useMediaQuery } from '@material-ui/core';
import React from 'react';
import styles from './PageArticle.module.scss';

interface PageArticleProps {
  title: string;
  text: string;
  width?: number;
  color?: string;
}

export const PageArticle: React.FC<PageArticleProps> = ({ title, text, width, color }) => {
  const matches1500 = useMediaQuery('(max-width:1500px)');

  return (
    <div
      className={styles.pageArticleBlock}
      style={{ width: width && !matches1500 ? width : '100%' }}>
      <h2 className={styles.pageArticleTitle} style={{ color: color ? color : '' }}>
        {title}
      </h2>
      <p className={styles.pageArticleText}>{text}</p>
    </div>
  );
};
