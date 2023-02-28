/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import Head from "next/head";
import styles from "./Profile.module.scss";
import React from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUserData, setUserData } from "@/redux/slices/user";
import { Avatar } from "@material-ui/core";
import { FormField } from "@/components/FormField";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordSchema } from "@/utils/validations";
import { Alert } from "@material-ui/lab";
import { Api } from "@/utils/api";
import { CloudinaryApi } from "@/utils/api/CloudinaryApi";

const Profile: NextPage = () => {
  const [isChangePassVisible, setIsChangePassVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [attachedImageFormData, setAttachedImageFormData] = React.useState([]);
  const [image, setImage] = React.useState<File>();
  const [attachedImage, setAttachedImage] = React.useState<File>();
  const [isSaveImage, setIsSaveImage] = React.useState(false);
  const [preview, setPreview] = React.useState("");
  const [isOverlayVisible, setIsOverlayVisible] = React.useState(false);

  const attachedImageRef = React.useRef(null);
  const avatarBgRef = React.useRef(null);

  const userData = useAppSelector(selectUserData);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const date = new Date(userData?.createdAt);

  const donateDate = new Date(userData?.donate?.buyDate);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(ChangePasswordSchema),
  });

  const opacityUp = [
    {
      opacity: 0,
      transition: "all 0.5s ease-in-out",
    },
    {
      opacity: 1,
      transition: "all 0.5s ease-in-out",
    },
  ];

  const opacityDown = [
    {
      opacity: 1,
      transition: "all 0.5s ease-in-out",
    },
    {
      opacity: 0,
      transition: "all 0.5s ease-in-out",
    },
  ];

  const timing = {
    duration: 200,
    iterations: 1,
  };

  const onSubmit = async ({ password }) => {
    try {
      const data = await Api().user.changePassword(password);

      setErrorMessage("");
      dispatch(setUserData(data));
      setIsChangePassVisible(false);
    } catch (err) {
      console.warn("Auth error", err);

      if (err.response) {
        setErrorMessage(err.response.data.message);
      }
    } finally {
      setIsChangePassVisible(false);
    }
  };

  const onSubmitAttachedImage = async () => {
    try {
      const { data } = await CloudinaryApi().cloudinary.changeImage(
        attachedImageFormData
      );

      await Api().user.updateAvatar(userData?.id, data.secure_url);

      setIsSaveImage(false);

      return data;
    } catch (err) {
      console.warn(err);
      alert("Update image error");
    } finally {
      setIsSaveImage(false);
    }
  };

  const onChangeImage = () => {
    attachedImageRef.current.click();
  };

  const handleChangeImage = async (files) => {
    try {
      const formData: any = new FormData();

      formData.append("file", files[0]);
      formData.append("upload_preset", "cqxjdiz4");

      setAttachedImageFormData(formData);

      setAttachedImage(files[0]);

      files && setIsSaveImage(true);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const onMouseEnterImage = () => {
    avatarBgRef?.current?.animate(opacityUp, timing);

    !isSaveImage && setIsOverlayVisible(true);
  };

  const onMouseLeaveImage = () => {
    avatarBgRef?.current?.animate(opacityDown, timing);

    setTimeout(() => {
      setIsOverlayVisible(false);
    }, 150);
  };

  const onCloseImage = () => {
    setAttachedImageFormData([]);
    setAttachedImage(undefined);
    setIsSaveImage(false);
  };

  React.useEffect(() => {
    !userData && router.push("/");
  }, []);

  React.useEffect(() => {
    if (attachedImage) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(attachedImage);
    } else {
      setPreview(null);
    }
  }, [image, attachedImage]);

  React.useEffect(() => {
    setPreview(userData?.avatarUrl);
  }, [attachedImage]);

  return (
    <div className={styles.profileContainer}>
      <Head>
        <title>Профиль</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.profileLeftSide}>
          <h2>Мой профиль</h2>
          <div className={styles.profileItems}>
            <div className={styles.profileItemsLeftSide}>
              <div className={styles.profileItem}>
                <h3>Никнейм</h3>
                <span>{userData?.login}</span>
              </div>
              <div className={styles.profileItem}>
                <h3>Электронная почта</h3>
                <span className={styles.email}>{userData?.email}</span>
              </div>
              <div className={styles.profileItem}>
                {!isChangePassVisible && <h3>Пароль</h3>}
                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={styles.form}
                  >
                    <div>
                      {!isChangePassVisible && (
                        <button
                          className={styles.changePasswordButton}
                          onClick={() => setIsChangePassVisible(true)}
                        >
                          Изменить пароль
                        </button>
                      )}
                      {errorMessage && (
                        <Alert
                          severity="error"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 20,
                            marginTop: 20,
                            borderRadius: 17,
                            height: 50,
                            width: "100%",
                          }}
                        >
                          {errorMessage}
                        </Alert>
                      )}
                      <div className={styles.passwordFieldBlock}>
                        {isChangePassVisible && (
                          <FormField name="password" label="Новый пароль" />
                        )}
                        <div className={styles.passwordFieldActionsBlock}>
                          {isChangePassVisible && (
                            <button className={styles.submitForm} type="submit">
                              Сохранить
                            </button>
                          )}
                          {isChangePassVisible && (
                            <button
                              className={styles.submitForm}
                              onClick={() => setIsChangePassVisible(false)}
                            >
                              Отменить
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </FormProvider>
              </div>
              <div className={styles.profileItem}>
                <h3>Дата регистрации</h3>
                <span>
                  {date.toLocaleString("default", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className={styles.profileItem}>
                <h3>Баланс</h3>
                <span>{userData?.balance}₽</span>
              </div>
              <div className={styles.profileItem}>
                <h3>Текущий донат</h3>
                {userData.donate ? (
                  <span>
                    {`${userData?.donate?.name} до
                  ${new Date(donateDate.setMonth(donateDate.getMonth() + 1))
                    .toLocaleString("default", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .slice(0, -3)}`}
                  </span>
                ) : (
                  <span>Донат отсутствует</span>
                )}
              </div>
            </div>
            {userData?.avatarUrl ? (
              <>
                <input
                  accept="image/*"
                  ref={attachedImageRef}
                  type="file"
                  onChange={(e) => handleChangeImage(e.target.files)}
                  hidden
                />
                <div
                  className={styles.changeAvatarBlock}
                  onMouseOver={onMouseEnterImage}
                  onMouseLeave={onMouseLeaveImage}
                >
                  <div className={styles.avatarBlockWrapper}>
                    {isSaveImage && (
                      <svg
                        onClick={onCloseImage}
                        className={styles.closeImage}
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_151_435)">
                          <path
                            d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM9.879 8.464C9.69946 8.28275 9.45743 8.17697 9.20245 8.16832C8.94748 8.15967 8.69883 8.2488 8.50742 8.41747C8.31601 8.58613 8.1963 8.82159 8.1728 9.07562C8.14929 9.32966 8.22378 9.58308 8.381 9.784L8.465 9.879L10.585 11.999L8.465 14.121C8.28375 14.3005 8.17797 14.5426 8.16932 14.7975C8.16067 15.0525 8.2498 15.3012 8.41847 15.4926C8.58713 15.684 8.82258 15.8037 9.07662 15.8272C9.33066 15.8507 9.58408 15.7762 9.785 15.619L9.879 15.536L12 13.414L14.121 15.536C14.3005 15.7173 14.5426 15.823 14.7975 15.8317C15.0525 15.8403 15.3012 15.7512 15.4926 15.5825C15.684 15.4139 15.8037 15.1784 15.8272 14.9244C15.8507 14.6703 15.7762 14.4169 15.619 14.216L15.536 14.121L13.414 12L15.536 9.879C15.7173 9.69946 15.823 9.45743 15.8317 9.20245C15.8403 8.94748 15.7512 8.69883 15.5825 8.50742C15.4139 8.31601 15.1784 8.1963 14.9244 8.1728C14.6703 8.14929 14.4169 8.22378 14.216 8.381L14.121 8.464L12 10.586L9.879 8.464Z"
                            fill="#505050"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_151_435">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                    <img
                      src={preview}
                      alt="avatar preview"
                      className={styles.avatar}
                    />
                    {isOverlayVisible && (
                      <div
                        onClick={onChangeImage}
                        className={styles.avatarOverlay}
                        ref={avatarBgRef}
                      >
                        изменить
                      </div>
                    )}
                    {isSaveImage && (
                      <button
                        className={styles.saveAvatarButton}
                        onClick={onSubmitAttachedImage}
                      >
                        Сохранить
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {!preview ? (
                  <Avatar
                    onClick={onChangeImage}
                    className={styles.avatarSvg}
                    style={{ width: 277, height: 277 }}
                  />
                ) : (
                  <div className={styles.changeAvatarBlock}>
                    <img
                      src={preview}
                      alt="avatar preview"
                      className={styles.avatar}
                    />
                    {isSaveImage && (
                      <button
                        className={styles.saveAvatarButton}
                        onClick={onSubmitAttachedImage}
                      >
                        Сохранить
                      </button>
                    )}
                  </div>
                )}
                <input
                  accept="image/*"
                  ref={attachedImageRef}
                  type="file"
                  onChange={(e) => handleChangeImage(e.target.files)}
                  hidden
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
