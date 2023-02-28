/* eslint-disable react-hooks/exhaustive-deps */
import { LoginForm } from '@/components/LoginForm';
import { PageArticle } from '@/components/PageArticle';
import { RegisterForm } from '@/components/RegisterForm';
import { Step } from '@/components/Step';
import { steps } from '@/data/steps';
import { useAppSelector } from '@/redux/hooks';
import { selectUserData } from '@/redux/slices/user';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styles from './Start.module.scss';

const Start: NextPage = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = React.useState(false);
  const [isRegisterFormVisible, setIsRegisterFormVisible] = React.useState(false);

  const userData = useAppSelector(selectUserData);

  return (
    <>
      <Head>
        <title>Начать играть</title>
      </Head>
      <div className={styles.container}>
        <PageArticle
          title="Как начать играть?"
          text="Добро пожаловать на наш проект! Чтобы начать играть, необходимо проделать несколько шагов"
          width={900}
        />
        {steps.map((obj) => (
          <Step
            {...obj}
            key={obj.stepNumber}
            handleLoginFormOpen={() => setIsLoginFormVisible(true)}
            handleRegisterFormOpen={() => setIsRegisterFormVisible(true)}
          />
        ))}
      </div>
      {!userData && (
        <LoginForm onClose={() => setIsLoginFormVisible(false)} visible={isLoginFormVisible} />
      )}
      {!userData && (
        <RegisterForm
          onClose={() => setIsRegisterFormVisible(false)}
          visible={isRegisterFormVisible}
        />
      )}
    </>
  );
};

export default Start;
