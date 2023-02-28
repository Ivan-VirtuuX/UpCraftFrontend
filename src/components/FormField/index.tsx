import React from "react";
import { TextField } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import styles from "./FormField.module.scss";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, type }) => {
  const { register, formState } = useFormContext();

  return (
    <TextField
      className={styles.formField}
      {...register(name)}
      helperText={formState.errors[name]?.message}
      error={!!formState.errors[name]?.message}
      name={name}
      label={label}
      fullWidth
      type={type === "password" ? "password" : "text"}
    />
  );
};
