import SettingTokens from "@/modules/SettingTokens";
import SettingPhone from "@/modules/SettingPhone";
import styles from "./styles.module.css";

const SideBar = () => {
  return (
    <div className={styles.sideBar}>
      <SettingTokens />
      <SettingPhone />
    </div>
  );
};

export default SideBar;
