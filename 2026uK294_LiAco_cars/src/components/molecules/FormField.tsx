import { Field, ErrorMessage } from "formik";
import ErrorText from "../atoms/ErrorText";

type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
};

export default function FormField({
  label,
  name,
  type = "text",
}: FormFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} type={type} />
      <ErrorMessage name={name}>
        {(message) => <ErrorText>{message}</ErrorText>}
      </ErrorMessage>
    </div>
  );
}