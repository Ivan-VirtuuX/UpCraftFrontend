/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import styles from './DonateForm.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { selectUserData } from '@/redux/slices/user';
import { Alert } from '@material-ui/lab';
import { Api } from '@/utils/api';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface DonateFormProps {
  onClose: () => void;
  visible: boolean;
  donateStatus: string;
  color: string;
  price: number;
  handleChangeUserData: () => void;
}

export const DonateForm: React.FC<DonateFormProps> = ({
  onClose,
  visible,
  donateStatus,
  color,
  price,
  handleChangeUserData,
}) => {
  const [errorMessage, setErrorMessage] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ serverName }) => {
    try {
      await Api().user.buyDonate({ name: donateStatus, serverName });

      handleChangeUserData();

      onClose();
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  const userData = useAppSelector(selectUserData);

  const matches650 = useMediaQuery('(max-width:650px)');
  const matches520 = useMediaQuery('(max-width:520px)');
  const matches420 = useMediaQuery('(max-width:420px)');

  return (
    <Dialog open={visible} onClose={onClose} fullWidth maxWidth="sm" style={{ zIndex: 10000 }}>
      <DialogContent
        className={styles.dialogContainer}
        style={{
          height:
            errors && matches520 ? 550 : errors && matches650 ? 600 : errors && matches420 && 500,
        }}>
        <DialogContentText className={styles.dialogContent}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2
              className={styles.buyDonateTitle}
              style={{
                marginBottom:
                  errors && matches520
                    ? 20
                    : errors && matches650
                    ? 15
                    : errors && matches420 && 10,
              }}>
              Покупка привелегии
            </h2>
            {errors.serverName?.type === 'required' ? (
              <Alert
                severity="error"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 20,
                  marginTop: 20,
                  borderRadius: 17,
                  height: 50,
                  width: '100%',
                }}>
                Выберите сервер
              </Alert>
            ) : (
              errorMessage && (
                <Alert
                  severity="error"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 20,
                    marginTop: 20,
                    borderRadius: 17,
                    height: 50,
                    width: '100%',
                  }}>
                  {errorMessage}
                </Alert>
              )
            )}
            <div className={styles.formFields}>
              <div>
                <label htmlFor="" className={styles.donateFormFieldName}>
                  Никнейм:
                </label>
                <span className={styles.donateFormFieldItem}>{userData?.login}</span>
              </div>
              <hr className={styles.line} />
              <div>
                <label htmlFor="" className={styles.donateFormFieldName}>
                  Привелегия:
                </label>
                <span style={{ color }} className={styles.donateFormFieldItem}>
                  {donateStatus}
                </span>
              </div>
              <hr className={styles.line} />
              <div>
                <label htmlFor="" className={styles.donateFormFieldName}>
                  Сервер:
                </label>
                <select
                  className={styles.donateFormServerField}
                  id="selectmethod"
                  defaultValue=""
                  name="serverName"
                  {...register('serverName', {
                    required: true,
                  })}>
                  <option value="" disabled hidden>
                    Выбрать
                  </option>
                  <option value="upClassic">UpClassic</option>
                  <option value="UpMagic">UpMagic</option>
                  <option value="UpRpg">UpRpg</option>
                  <option value="UpMagicRpg">UpMagicRpg</option>
                </select>
              </div>
              <hr className={styles.line} />
              <div>
                <label htmlFor="" className={styles.donateFormFieldName}>
                  Стоимость:
                </label>
                <span className={styles.donateFormFieldItem}>{price}₽</span>
              </div>
            </div>
            <button type="submit" className={styles.buyDonate}>
              Подтвердить покупку
            </button>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
