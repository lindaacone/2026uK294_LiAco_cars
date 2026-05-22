import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/api";

export default function LoginPage() {
  const navigate = useNavigate();

async function handleLogin(values: {
  email: string;
  password: string;
}) {
  const data = await login(values.email, values.password);

  localStorage.setItem("accessToken", data.accessToken);

  navigate("/objects");
}


  return (
    <div>
      <h1>Login</h1>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors: {
            email?: string;
            password?: string;
          } = {};

          if (!values.email) {
            errors.email = "E-Mail ist erforderlich";
          }

          if (!values.password) {
            errors.password = "Passwort ist erforderlich";
          }

          return errors;
        }}
        onSubmit={handleLogin}
      >
        <Form>
          <div>
            <label>E-Mail</label>
            <Field
              type="email"
              name="email"
            />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label>Passwort</label>
            <Field
              type="password"
              name="password"
            />
            <ErrorMessage name="password" component="div" />
          </div>

          <button type="submit">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}