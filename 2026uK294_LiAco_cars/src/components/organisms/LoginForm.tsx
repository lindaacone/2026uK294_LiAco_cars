import { Formik, Form } from "formik";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onLogin: (values: LoginValues) => void;
};

export default function LoginForm({ onLogin }: LoginFormProps) {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={(values) => {
        const errors: Partial<LoginValues> = {};

        if (!values.email) {
          errors.email = "E-Mail ist erforderlich";
        }

        if (!values.password) {
          errors.password = "Passwort ist erforderlich";
        }

        return errors;
      }}
      onSubmit={onLogin}
    >
      <Form className="form">
        <FormField label="E-Mail" name="email" type="email" />
        <FormField label="Passwort" name="password" type="password" />

        <Button type="submit">Login</Button>
      </Form>
    </Formik>
  );
}