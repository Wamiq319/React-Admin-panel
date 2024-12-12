// src/context/SidebarContext.js
import { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
