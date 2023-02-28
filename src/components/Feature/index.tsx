/* eslint-disable @next/next/no-img-element */
import { StaticImageData } from 'next/image';
import React from 'react';
import styles from './Feature.module.scss';

interface FeatureProps {
  imageUrl: StaticImageData;
  title: string;
  text: string;
}

export const Feature: React.FC<FeatureProps> = ({ imageUrl, title, text }) => {
  return (
    <div className={styles.featureBlock}>
      <img src={imageUrl.src} alt="feature" />
      <div className={styles.featureTextBlock}>
        <span className={styles.featureTitle}>{title}</span>
        <span className={styles.featureText}>{text}</span>
      </div>
    </div>
  );
};
