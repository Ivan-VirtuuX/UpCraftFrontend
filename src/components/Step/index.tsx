/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from '@/redux/hooks';
import { selectUserData } from '@/redux/slices/user';
import { useMediaQuery } from '@material-ui/core';
import React from 'react';
import styles from './Step.module.scss';

interface StepProps {
  stepNumber: number;
  title: string;
  text: string;
  primaryActionButtonText?: string;
  secondaryActionButtonText?: string;
  tertiaryActionButtonText?: string;
  imageUrl: string;
  color: string;
  isLineVisible: boolean;
  handleLoginFormOpen?: () => void;
  handleRegisterFormOpen?: () => void;
}

export const Step: React.FC<StepProps> = ({
  stepNumber,
  title,
  text,
  primaryActionButtonText,
  secondaryActionButtonText,
  tertiaryActionButtonText,
  imageUrl,
  color,
  isLineVisible,
  handleLoginFormOpen,
  handleRegisterFormOpen,
}) => {
  const userData = useAppSelector(selectUserData);

  const matches1500 = useMediaQuery('(max-width:1500px)');

  return (
    <>
      <div className={styles.stepBlock}>
        <div style={{ marginBottom: stepNumber === 3 ? 50 : 0 }}>
          <div className={styles.stepHead}>
            <span style={{ background: color }}>{stepNumber}</span>
            <h2 className={styles.title} style={{ color: color }}>
              {title}
            </h2>
          </div>
          <div className={styles.description}>
            <p className={styles.text}>{text}</p>
            {primaryActionButtonText && (
              <div className={styles.buttons}>
                {primaryActionButtonText === 'ЗАРЕГИСТРИРОВАТЬСЯ' ? (
                  <button
                    style={{ background: color }}
                    className={styles.primaryActionsButton}
                    onClick={handleRegisterFormOpen}
                    disabled={userData ? true : false}>
                    {primaryActionButtonText}
                  </button>
                ) : (
                  <a download href="UpCraft.exe">
                    <button style={{ background: color }} className={styles.primaryActionsButton}>
                      {primaryActionButtonText}
                    </button>
                  </a>
                )}
                {userData && stepNumber === 1 ? (
                  <span
                    style={{
                      color: '#929292',
                    }}
                    className={styles.orButton}>
                    или
                  </span>
                ) : (
                  <span
                    style={{
                      color: color,
                    }}
                    className={styles.orButton}>
                    или
                  </span>
                )}
                {secondaryActionButtonText === 'ВОЙТИ' ? (
                  <button
                    style={{ background: color }}
                    className={styles.secondaryActionsButton}
                    onClick={handleLoginFormOpen}
                    disabled={userData ? true : false}>
                    {secondaryActionButtonText}
                  </button>
                ) : (
                  <>
                    <a download href="UpCraft.exe">
                      <button
                        style={{ background: color }}
                        className={styles.secondaryActionsButton}>
                        {secondaryActionButtonText}
                      </button>
                    </a>
                    <span
                      style={{
                        color: color,
                      }}
                      className={styles.orButton}>
                      или
                    </span>
                    <a download href="UpCraft.exe">
                      <button
                        style={{ background: color }}
                        className={styles.tertiaryActionsButton}>
                        {tertiaryActionButtonText}
                      </button>
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {!matches1500 && <img src={imageUrl} alt="Step image" />}
      </div>
      {isLineVisible && <hr className={styles.line} />}
    </>
  );
};
