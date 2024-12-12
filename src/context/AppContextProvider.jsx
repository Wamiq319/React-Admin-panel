import { SidebarProvider } from "./SidebarContext.jsx";
const AppContextProvider = ({ children }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default AppContextProvider;
