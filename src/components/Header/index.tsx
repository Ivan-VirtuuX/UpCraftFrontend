/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUserData, setUserData } from "@/redux/slices/user";
import { Avatar, useMediaQuery } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import React from "react";
import { LoginForm } from "../LoginForm";
import { MenuPopup } from "../MenuPopup";
import styles from "./Header.module.scss";
import { RegisterForm } from "@/components/RegisterForm";

export const Header: React.FC = () => {
  const [isServersVisible, setIsServersVisible] = React.useState(false);
  const [isHelpListVisible, setIsHelpListVisible] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = React.useState(false);
  const [isRegisterFormVisible, setIsRegisterFormVisible] =
    React.useState(false);
  const [formType, setFormType] = React.useState<"login" | "register" | "">("");

  const helpListRoutes = ["/rules", "/download", "/faq", "/commands"];

  const serversListRef = React.useRef<any>(null);
  const helpListRef = React.useRef<any>(null);

  const router = useRouter();

  const userData = useAppSelector(selectUserData);

  const dispatch = useAppDispatch();

  const matches950 = useMediaQuery("(max-width:950px)");
  const matches550 = useMediaQuery("(max-width:550px)");

  const opacityUp = [
    {
      opacity: 0,
      transition: "all 0.2s ease-in-out",
    },
    {
      opacity: 1,
      transition: "all 0.2s ease-in-out",
    },
  ];

  const opacityDown = [
    {
      opacity: 1,
      transition: "all 0.2s ease-in-out",
    },
    {
      opacity: 0,
      transition: "all 0.2s ease-in-out",
    },
  ];

  const timing = {
    duration: 200,
    iterations: 1,
  };

  const onMouseOverServers = () => {
    if (!isServersVisible) {
      serversListRef?.current?.animate(opacityUp, timing);

      setTimeout(() => {
        setIsServersVisible(true);
      }, 150);
    }
  };

  const onMouseLeaveServers = () => {
    if (isServersVisible) {
      serversListRef?.current?.animate(opacityDown, timing);

      setTimeout(() => {
        setIsServersVisible(false);
      }, 150);
    }
  };

  const onMouseOverHelp = () => {
    if (!isHelpListVisible) {
      helpListRef?.current?.animate(opacityUp, timing);

      setTimeout(() => {
        setIsHelpListVisible(true);
      }, 150);
    }
  };

  const onMouseLeaveHelp = () => {
    if (isHelpListVisible) {
      helpListRef?.current?.animate(opacityDown, timing);

      setTimeout(() => {
        setIsHelpListVisible(false);
      }, 150);
    }
  };

  const onClickLogout = () => {
    destroyCookie(null, "authToken", { path: "/" });

    router.push("/");

    dispatch(setUserData(null));
  };

  React.useEffect(() => {
    serversListRef?.current?.animate(opacityUp, timing);
  }, [isServersVisible]);

  React.useEffect(() => {
    helpListRef?.current?.animate(opacityUp, timing);
  }, [isHelpListVisible]);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <div className={styles.logo}>
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.7447 41.9681C32.2017 41.9681 41.4894 32.6804 41.4894 21.2234C41.4894 9.76647 32.2017 0.47876 20.7447 0.47876C9.28771 0.47876 0 9.76647 0 21.2234C0 32.6804 9.28771 41.9681 20.7447 41.9681ZM28.8202 22.7224L22.4372 16.3394C21.5025 15.4046 19.9869 15.4046 19.0521 16.3394L12.6692 22.7224C11.7344 23.6572 11.7344 25.1727 12.6692 26.1075C13.6039 27.0422 15.1195 27.0422 16.0542 26.1075L20.7447 21.417L25.4351 26.1075C26.3699 27.0422 27.8854 27.0422 28.8202 26.1075C29.755 25.1727 29.755 23.6572 28.8202 22.7224Z"
                fill="#7D97F3"
              />
            </svg>
            <div className={styles.logoRightSide}>
              <span className={styles.projectName}>UpCraft</span>
              <span className={styles.slogan}>Прокачай себя</span>
            </div>
          </div>
        </Link>
        <ul className={styles.headerLinks}>
          {!matches950 && (
            <>
              <li
                onMouseOver={onMouseOverServers}
                onMouseLeave={onMouseLeaveServers}
                className={styles.serversListContainer}
              >
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_24_1128)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0H17.5C18.163 0 18.7989 0.263392 19.2678 0.732233C19.7366 1.20107 20 1.83696 20 2.5V5C20 5.66304 19.7366 6.29893 19.2678 6.76777C18.7989 7.23661 18.163 7.5 17.5 7.5H2.5C1.83696 7.5 1.20107 7.23661 0.732233 6.76777C0.263392 6.29893 0 5.66304 0 5V2.5ZM17.5 3.75C17.5 4.08152 17.3683 4.39946 17.1339 4.63388C16.8995 4.8683 16.5815 5 16.25 5C15.9185 5 15.6005 4.8683 15.3661 4.63388C15.1317 4.39946 15 4.08152 15 3.75C15 3.41848 15.1317 3.10054 15.3661 2.86612C15.6005 2.6317 15.9185 2.5 16.25 2.5C16.5815 2.5 16.8995 2.6317 17.1339 2.86612C17.3683 3.10054 17.5 3.41848 17.5 3.75ZM0 12.5C0 11.837 0.263392 11.2011 0.732233 10.7322C1.20107 10.2634 1.83696 10 2.5 10H17.5C18.163 10 18.7989 10.2634 19.2678 10.7322C19.7366 11.2011 20 11.837 20 12.5V15C20 15.663 19.7366 16.2989 19.2678 16.7678C18.7989 17.2366 18.163 17.5 17.5 17.5H2.5C1.83696 17.5 1.20107 17.2366 0.732233 16.7678C0.263392 16.2989 0 15.663 0 15V12.5ZM17.5 13.75C17.5 14.0815 17.3683 14.3995 17.1339 14.6339C16.8995 14.8683 16.5815 15 16.25 15C15.9185 15 15.6005 14.8683 15.3661 14.6339C15.1317 14.3995 15 14.0815 15 13.75C15 13.4185 15.1317 13.1005 15.3661 12.8661C15.6005 12.6317 15.9185 12.5 16.25 12.5C16.5815 12.5 16.8995 12.6317 17.1339 12.8661C17.3683 13.1005 17.5 13.4185 17.5 13.75Z"
                      fill="#505050"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_24_1128">
                      <rect width="20" height="17.5" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>Наши сервера</span>
                {isServersVisible && (
                  <div
                    className={styles.serversListWrapper}
                    ref={serversListRef}
                  >
                    <div className={styles.serversList}>
                      <ul>
                        <ul className={styles.serversFirstList}>
                          <li>Сервера 1.16.5</li>
                          <li>
                            <Link href="/servers/upclassic">UpClassic</Link>
                          </li>
                        </ul>
                        <ul className={styles.serversSecondList}>
                          <li>Сервера 1.12.2</li>
                          <li>
                            <Link href="/servers/upmagic">UpMagic</Link>
                          </li>
                          <li>
                            <Link href="/servers/uprpg">UpRpg</Link>
                          </li>
                          <li>
                            <Link href="/servers/upmagicrpg">UpMagicRpg</Link>
                          </li>
                        </ul>
                      </ul>
                    </div>
                    <div className={styles.serversListOverlay}></div>
                  </div>
                )}
              </li>
              <li
                onMouseOver={onMouseOverHelp}
                onMouseLeave={onMouseLeaveHelp}
                className={styles.helpListContainer}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_24_1141)">
                    <path
                      d="M9.95 16C10.3 16 10.596 15.879 10.838 15.637C11.0793 15.3957 11.2 15.1 11.2 14.75C11.2 14.4 11.0793 14.1043 10.838 13.863C10.596 13.621 10.3 13.5 9.95 13.5C9.6 13.5 9.304 13.621 9.062 13.863C8.82067 14.1043 8.7 14.4 8.7 14.75C8.7 15.1 8.82067 15.3957 9.062 15.637C9.304 15.879 9.6 16 9.95 16ZM10.1 5.7C10.5667 5.7 10.9417 5.829 11.225 6.087C11.5083 6.34567 11.65 6.68333 11.65 7.1C11.65 7.38333 11.5543 7.67067 11.363 7.962C11.171 8.254 10.9 8.55833 10.55 8.875C10.05 9.30833 9.68333 9.725 9.45 10.125C9.21667 10.525 9.1 10.925 9.1 11.325C9.1 11.5583 9.18767 11.754 9.363 11.912C9.53767 12.0707 9.74167 12.15 9.975 12.15C10.2083 12.15 10.4167 12.0667 10.6 11.9C10.7833 11.7333 10.9 11.525 10.95 11.275C11 10.9917 11.1127 10.7293 11.288 10.488C11.4627 10.246 11.75 9.93333 12.15 9.55C12.6667 9.06667 13.0293 8.625 13.238 8.225C13.446 7.825 13.55 7.38333 13.55 6.9C13.55 6.05 13.2293 5.354 12.588 4.812C11.946 4.27067 11.1167 4 10.1 4C9.4 4 8.77933 4.13333 8.238 4.4C7.696 4.66667 7.275 5.075 6.975 5.625C6.85833 5.84167 6.81667 6.054 6.85 6.262C6.88333 6.47067 7 6.64167 7.2 6.775C7.41667 6.90833 7.65433 6.95 7.913 6.9C8.171 6.85 8.38333 6.70833 8.55 6.475C8.73333 6.225 8.95433 6.03333 9.213 5.9C9.471 5.76667 9.76667 5.7 10.1 5.7ZM10 20C8.63333 20 7.34167 19.7373 6.125 19.212C4.90833 18.6873 3.846 17.975 2.938 17.075C2.02933 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.02933 3.825 2.938 2.925C3.846 2.025 4.90833 1.31233 6.125 0.787C7.34167 0.262333 8.63333 0 10 0C11.4 0 12.7083 0.262333 13.925 0.787C15.1417 1.31233 16.2 2.025 17.1 2.925C18 3.825 18.7083 4.88333 19.225 6.1C19.7417 7.31667 20 8.61667 20 10C20 11.3833 19.7417 12.6833 19.225 13.9C18.7083 15.1167 18 16.175 17.1 17.075C16.2 17.975 15.1417 18.6873 13.925 19.212C12.7083 19.7373 11.4 20 10 20Z"
                      fill={
                        helpListRoutes.some((route) => route === router.asPath)
                          ? "#7D97F3"
                          : "#505050"
                      }
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_24_1141">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span
                  style={{
                    color: helpListRoutes.some(
                      (route) => route === router.asPath
                    )
                      ? "#7D97F3"
                      : "",
                  }}
                >
                  Помощь
                </span>
                {isHelpListVisible && (
                  <div className={styles.helpListWrapper} ref={helpListRef}>
                    <div className={styles.helpList}>
                      <ul>
                        <li>
                          <Link href="/rules">Правила</Link>
                        </li>
                        <hr className={styles.line} />
                        <li>
                          <Link href="/download">Скачать лаунчер</Link>
                        </li>
                        <hr className={styles.line} />
                        <li>
                          <Link href="/faq">Вопросы и ответы</Link>
                        </li>
                        <hr className={styles.line} />
                        <li>
                          <Link href="/commands">Команды</Link>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.helpListOverlay}></div>
                  </div>
                )}
              </li>
              <li className={styles.donateLink}>
                <Link href={"/donate"}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_22_222)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 10C0 4.47727 4.47727 0 10 0C15.5227 0 20 4.47727 20 10C20 15.5227 15.5227 20 10 20C4.47727 20 0 15.5227 0 10ZM10.9091 4.54545C10.9091 4.30435 10.8133 4.07312 10.6428 3.90263C10.4723 3.73214 10.2411 3.63636 10 3.63636C9.75889 3.63636 9.52766 3.73214 9.35718 3.90263C9.18669 4.07312 9.09091 4.30435 9.09091 4.54545V5.45455C8.36759 5.45455 7.6739 5.74188 7.16244 6.25335C6.65097 6.76481 6.36364 7.4585 6.36364 8.18182C6.36364 8.90514 6.65097 9.59883 7.16244 10.1103C7.6739 10.6218 8.36759 10.9091 9.09091 10.9091H10.9091C11.1502 10.9091 11.3814 11.0049 11.5519 11.1754C11.7224 11.3458 11.8182 11.5771 11.8182 11.8182C11.8182 12.0593 11.7224 12.2905 11.5519 12.461C11.3814 12.6315 11.1502 12.7273 10.9091 12.7273H7.27273C7.03162 12.7273 6.80039 12.8231 6.6299 12.9935C6.45942 13.164 6.36364 13.3953 6.36364 13.6364C6.36364 13.8775 6.45942 14.1087 6.6299 14.2792C6.80039 14.4497 7.03162 14.5455 7.27273 14.5455H9.09091V15.4545C9.09091 15.6957 9.18669 15.9269 9.35718 16.0974C9.52766 16.2679 9.75889 16.3636 10 16.3636C10.2411 16.3636 10.4723 16.2679 10.6428 16.0974C10.8133 15.9269 10.9091 15.6957 10.9091 15.4545V14.5455C11.2672 14.5455 11.6219 14.4749 11.9528 14.3379C12.2837 14.2008 12.5843 13.9999 12.8376 13.7467C13.0908 13.4934 13.2917 13.1928 13.4288 12.8619C13.5658 12.531 13.6364 12.1763 13.6364 11.8182C13.6364 11.46 13.5658 11.1054 13.4288 10.7745C13.2917 10.4436 13.0908 10.143 12.8376 9.88971C12.5843 9.63646 12.2837 9.43557 11.9528 9.29851C11.6219 9.16145 11.2672 9.09091 10.9091 9.09091H9.09091C8.8498 9.09091 8.61857 8.99513 8.44808 8.82464C8.2776 8.65415 8.18182 8.42292 8.18182 8.18182C8.18182 7.94071 8.2776 7.70948 8.44808 7.53899C8.61857 7.36851 8.8498 7.27273 9.09091 7.27273H12.7273C12.9684 7.27273 13.1996 7.17695 13.3701 7.00646C13.5406 6.83597 13.6364 6.60474 13.6364 6.36364C13.6364 6.12253 13.5406 5.8913 13.3701 5.72081C13.1996 5.55032 12.9684 5.45455 12.7273 5.45455H10.9091V4.54545Z"
                        fill="#505050"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_22_222">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Донат</span>
                </Link>
              </li>
            </>
          )}
        </ul>
        {matches550 ? (
          userData?.avatarUrl ? (
            <div className={styles.profile}>
              <Link href="/profile">
                <div className={styles.userData}>
                  <img
                    src={userData?.avatarUrl}
                    alt="avatar"
                    className={styles.avatar}
                  />
                </div>
              </Link>
              <svg
                onClick={onClickLogout}
                className={styles.logoutButton}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 12H10.5M18 15L21 12L18 9M13 7V6C13 5.46957 12.7893 4.96086 12.4142 4.58579C12.0391 4.21071 11.5304 4 11 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H11C11.5304 20 12.0391 19.7893 12.4142 19.4142C12.7893 19.0391 13 18.5304 13 18V17"
                  stroke="#505050"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            userData && (
              <div className={styles.profile}>
                <Link href="/profile">
                  <div className={styles.userData}>
                    <Avatar style={{ width: 24, height: 24 }} />
                  </div>
                </Link>
                <svg
                  onClick={onClickLogout}
                  className={styles.logoutButton}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 12H10.5M18 15L21 12L18 9M13 7V6C13 5.46957 12.7893 4.96086 12.4142 4.58579C12.0391 4.21071 11.5304 4 11 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H11C11.5304 20 12.0391 19.7893 12.4142 19.4142C12.7893 19.0391 13 18.5304 13 18V17"
                    stroke="#505050"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )
          )
        ) : (
          <>
            {userData ? (
              userData?.avatarUrl ? (
                <div className={styles.profile}>
                  <Link href="/profile">
                    <div className={styles.userData}>
                      <img
                        src={userData?.avatarUrl}
                        alt="avatar"
                        className={styles.avatar}
                      />
                      <span>{userData?.login}</span>
                    </div>
                  </Link>
                  <svg
                    onClick={onClickLogout}
                    className={styles.logoutButton}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 12H10.5M18 15L21 12L18 9M13 7V6C13 5.46957 12.7893 4.96086 12.4142 4.58579C12.0391 4.21071 11.5304 4 11 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H11C11.5304 20 12.0391 19.7893 12.4142 19.4142C12.7893 19.0391 13 18.5304 13 18V17"
                      stroke="#505050"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : (
                <div className={styles.profile}>
                  <Link href="/profile">
                    <div className={styles.userData}>
                      <Avatar style={{ width: 24, height: 24 }} />
                      <span>{userData?.login}</span>
                    </div>
                  </Link>
                  <svg
                    onClick={onClickLogout}
                    className={styles.logoutButton}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 12H10.5M18 15L21 12L18 9M13 7V6C13 5.46957 12.7893 4.96086 12.4142 4.58579C12.0391 4.21071 11.5304 4 11 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H11C11.5304 20 12.0391 19.7893 12.4142 19.4142C12.7893 19.0391 13 18.5304 13 18V17"
                      stroke="#505050"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )
            ) : (
              <div className={styles.userActions}>
                <button
                  className={styles.loginButton}
                  onClick={() => setFormType("login")}
                >
                  Войти
                </button>
                <Link href={"/start"}>
                  <button className={styles.startPlayButton}>
                    НАЧАТЬ ИГРАТЬ
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
        {matches950 && (
          <>
            {matches550 && (
              <button
                className={styles.loginButton}
                onClick={() => setFormType("login")}
              >
                Войти
              </button>
            )}
            <div className={styles.burgerMenuContainer}>
              <svg
                className={styles.burgerMenu}
                onClick={() => setIsMenuOpen(true)}
                width="25"
                height="20"
                viewBox="0 0 25 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_187_482)">
                  <path
                    d="M2.32812 17.7343H22.6719M2.32812 9.98425H22.6719M2.32812 2.23425H22.6719"
                    stroke="#505050"
                    strokeWidth="2.90625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_187_482">
                    <rect width="25" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </>
        )}
      </div>
      {formType === "login" && (
        <LoginForm
          onOpenRegister={() => setFormType("register")}
          formType={formType}
          onClose={() => setFormType("")}
        />
      )}
      {formType === "register" && (
        <RegisterForm
          onOpenRegister={() => setFormType("register")}
          onOpenLogin={() => setFormType("login")}
          formType={formType}
          onClose={() => setFormType("")}
        />
      )}
      <MenuPopup onClose={() => setIsMenuOpen(false)} visible={isMenuOpen} />
    </div>
  );
};
