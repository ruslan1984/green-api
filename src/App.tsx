import { StoreContext } from "./store/StoreContext";
import MainLayout from "@/layout/MainLayout";
import Chat from "@/modules/Chat";
import AuthStore from "./store/authStore";

function App() {
  const stores = {
    authStore: new AuthStore(),
  };

  return (
    <StoreContext.Provider value={stores}>
      <MainLayout>
        <Chat />
      </MainLayout>
    </StoreContext.Provider>
  );
}

export default App;
