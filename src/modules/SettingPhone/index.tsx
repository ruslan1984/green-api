import { observer } from "mobx-react";
import { type SubmitEvent } from "react";
import { TextInput, Button } from "@/components";
import styles from "./styles.module.css";
import { useStores } from "@/store/StoreContext";

const SettingPhone = observer(() => {
  const { authStore } = useStores();
  const { phoneNumber, setPhoneNumber } = authStore;
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phoneNumber = formData.get("phoneNumber") as string;
    setPhoneNumber(phoneNumber);
    if (phoneNumber) {
      authStore.logout();
    }
  };
  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit} method="POST">
        <TextInput
          name="phoneNumber"
          placeholder="Телефон"
          defaultValue={phoneNumber || ""}
          pattern="^(\+7)?(\d{11})$"
        />
        <Button type="submit">Сохранить</Button>
      </form>
    </section>
  );
});

export default SettingPhone;
