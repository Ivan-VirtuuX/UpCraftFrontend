/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  useMediaQuery,
} from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import { setCookie } from "nookies";
import { Alert } from "@material-ui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../redux/hooks";
import { LoginDto } from "../../utils/api/types";
import { LoginFormSchema } from "../../utils/validations";
import { Api } from "../../utils/api";
import { FormField } from "../FormField";
import { setUserData } from "../../redux/slices/user";
import styles from "./LoginForm.module.scss";

interface LoginFormProps {
  onClose: () => void;
  onOpenRegister: () => void;
  formType: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onClose,
  onOpenRegister,
  formType,
}) => {
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = React.useState("");

  const matches850 = useMediaQuery("(max-width:850px)");
  const matches600 = useMediaQuery("(max-width:600px)");
  const matches500 = useMediaQuery("(max-width:500px)");
  const matches400 = useMediaQuery("(max-width:400px)");

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (dto: LoginDto) => {
    try {
      const data = await Api().user.login(dto);

      setCookie(null, "authToken", data.token, {
        maxAge: 30 * 24 * 60,
        path: "/",
      });
      setErrorMessage("");

      dispatch(setUserData(data));

      onClose();
    } catch (err) {
      console.warn("Auth error", err);

      if (err.response) {
        setErrorMessage(err.response.data.message);
      }
    } finally {
      onClose();
    }
  };

  return (
    <Dialog
      open={formType === "login"}
      fullWidth
      onClose={onClose}
      maxWidth="sm"
      style={{ zIndex: 10000 }}
    >
      <DialogContent
        style={{
          height: matches500 ? 450 : matches600 ? 500 : matches850 && 550,
        }}
        className={styles.formContainer}
      >
        <DialogContentText>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className={styles.formWrapper}>
                <p
                  className={styles.formType}
                  style={{ marginBottom: errorMessage ? 0 : 50 }}
                >
                  АВТОРИЗАЦИЯ
                </p>
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
                <FormField name="email" label="Электронная почта" />
                <FormField name="password" label="Пароль" type="password" />
                <div className={styles.formActions}>
                  <Button onClick={onOpenRegister} variant="text">
                    Регистрация
                  </Button>
                  <Button
                    disabled={
                      !form.formState.isValid || form.formState.isSubmitting
                    }
                    type="submit"
                  >
                    ВОЙТИ
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
