import { type SubmitEvent } from "react";
import { observer } from "mobx-react";
import { TextInput, PasswordInput, Button } from "@/components";
import { useStores } from "@/store/StoreContext";
import styles from "./styles.module.css";

const SettingTokens = observer(() => {
  const { authStore } = useStores();
  const { setTokens } = authStore;
  const { idInstance, apiTokenInstance } = authStore.getTokens();

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const idInstance = formData.get("idInstance") as string;
    const apiTokenInstance = formData.get("apiTokenInstance") as string;

    setTokens(idInstance, apiTokenInstance);

    if (idInstance && apiTokenInstance) {
      authStore.logout();
    }
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput
          name="idInstance"
          placeholder="idInstance"
          defaultValue={idInstance || ""}
        />
        <PasswordInput
          name="apiTokenInstance"
          placeholder="apiTokenInstance"
          defaultValue={apiTokenInstance || ""}
        />
        <Button type="submit">Сохранить</Button>
      </form>
    </section>
  );
});

export default SettingTokens;
