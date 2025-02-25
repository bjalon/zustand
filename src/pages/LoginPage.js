import PageLayout from "../components/PageLayout.js";
import LoginForm from "../components/LoginForm.js";
import useAuthStore from "../store/AuthStore.ts";
import { useShallow } from "zustand/react/shallow";

function LoginPage() {
  const { isLogged, connect } = useAuthStore(
    useShallow((state) => ({
      isLogged: state.isLogged,
      connect: state.connect,
    })),
  );
  if (isLogged) {
    return (
      <PageLayout titleFr="Se connecter" titleEn="Log in">
        <p>Vous êtes déjà connecté.</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout titleFr="Se connecter" titleEn="Log in">
      <LoginForm
        handleLogin={(login, password) => {
          connect(login, password);
        }}
      />
    </PageLayout>
  );
}

export default LoginPage;
