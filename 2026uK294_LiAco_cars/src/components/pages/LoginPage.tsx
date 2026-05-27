import { useNavigate } from "react-router-dom";
import Heading from "../../components/atoms/Heading";
import LoginForm from "../../components/organisms/LoginForm";
import PageLayout from "../../components/templates/PageLayout";
import { login } from "../../service/api";

type LoginValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();

  async function handleLogin(values: LoginValues) {
    try {
      const data = await login(values.email, values.password);

      localStorage.setItem("accessToken", data.accessToken);

      navigate("/objects");
    } catch {
      alert("Login fehlgeschlagen");
    }
  }

  return (
    <PageLayout>
      <Heading>Login</Heading>
      <LoginForm onLogin={handleLogin} />
    </PageLayout>
  );
}