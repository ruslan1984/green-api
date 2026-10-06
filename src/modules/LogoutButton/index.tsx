import { type FC } from "react";
import { observer } from "mobx-react";
import { Button } from "@/components";
import { useStores } from "@/store/StoreContext";

interface ILogoutButton {
  onLogout?: () => void;
  onLogin?: () => void;
}

const LogoutButton: FC<ILogoutButton> = observer(({ onLogout, onLogin }) => {
  const { authStore } = useStores();
  const { logout, login, authorized } = authStore;
  const isAuth = authorized();
  const onLogoutClick = () => {
    logout();
    if (onLogout) {
      onLogout();
    }
  };

  const onLoginClick = () => {
    login();
    if (onLogin) {
      onLogin();
    }
  };

  return isAuth ? (
    <Button onClick={onLogoutClick}> Выйти из чата</Button>
  ) : (
    <Button onClick={onLoginClick}> Войти в чат</Button>
  );
});

export default LogoutButton;
