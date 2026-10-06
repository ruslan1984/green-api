import { type ReactNode, type FC } from "react";
import SideBar from "@/modules/SideBar";
import styles from "./styles.module.css";

interface IMainLayout {
  children: ReactNode;
}

const MainLayout: FC<IMainLayout> = ({ children }) => {
  return (
    <div className={styles.mainLayout}>
      <SideBar />
      {children}
    </div>
  );
};

export default MainLayout;
