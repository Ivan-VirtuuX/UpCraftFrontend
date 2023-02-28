import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
  email: yup.string().required('Введите почту').email('Введите почту'),
  password: yup.string().required('Введите пароль').min(6, 'Длина пароля менее 6 символов'),
});

export const RegisterFormSchema = yup
  .object()
  .shape({
    login: yup
      .string()
      .min(5, 'Длина никнейма меньше 5 символов')
      .max(10, 'Длина никнейма больше 10 символов'),
  })
  .concat(LoginFormSchema);

export const ChangePasswordSchema = yup.object().shape({
  password: yup.string().required('Введите пароль').min(6, 'Длина пароля менее 6 символов'),
});
