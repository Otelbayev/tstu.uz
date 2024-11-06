import { createContext, useContext, useState } from "react";
import { useDepartment } from "../../hooks/useDepartment";

const DepartmentContext = createContext();

export const useDepartmentContext = () => useContext(DepartmentContext);

const DepartmentProvider = ({ children }) => {
  const {
    data: faculties,
    loading,
    page,
    setPage,
    error,
  } = useDepartment("Fakultet");
  const {
    data: kafedras,
    loading: kafLoading,
    page: kafPage,
    setPage: setKafPage,
    error: kafError,
  } = useDepartment("Kafedra");

  return (
    <DepartmentContext.Provider
      value={{
        faculties,
        page,
        setPage,
        loading,
        error,

        kafedras,
        kafLoading,
        kafError,
        kafPage,
        setKafPage,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};

export default DepartmentProvider;
