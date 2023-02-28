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
import { CreateUserDto } from "../../utils/api/types";
import { RegisterFormSchema } from "../../utils/validations";
import { Api } from "../../utils/api";
import { FormField } from "../FormField";
import { setUserData } from "../../redux/slices/user";
import styles from "./RegisterForm.module.scss";

interface RegisterFormProps {
  onClose: () => void;
  onOpenLogin: () => void;
  formType: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onClose,
  onOpenLogin,
  formType,
}) => {
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = React.useState("");

  const matches500 = useMediaQuery("(max-width:500px)");

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      const data = await Api().user.register(dto);

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
      open={formType === "register"}
      fullWidth
      onClose={onClose}
      maxWidth="sm"
      style={{ zIndex: 10000 }}
    >
      <DialogContent
        style={{
          height: errorMessage && !matches500 ? 700 : !matches500 ? 650 : 550,
        }}
        className={styles.formContainer}
      >
        <DialogContentText>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className={styles.formWrapper}>
                <p
                  className={styles.formType}
                  style={{ fontSize: 64, marginBottom: errorMessage ? 0 : 50 }}
                >
                  РЕГИСТРАЦИЯ
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
                <FormField name="login" label="Никнейм" />
                <FormField name="email" label="Электронная почта" />
                <FormField name="password" label="Пароль" type="password" />
                <div className={styles.formActions}>
                  <Button onClick={onOpenLogin} variant="text">
                    Войти
                  </Button>
                  <Button
                    disabled={
                      !form.formState.isValid || form.formState.isSubmitting
                    }
                    type="submit"
                  >
                    Регистрация
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
