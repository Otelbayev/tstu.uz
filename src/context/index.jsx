import BlogProvider from "./BlogContext";
import DepartmentProvider from "./DepartmentContext";
import LanguageContexProvider from "./LanguageContext";
import MenuProvider from "./MenuContext";
import SchuldeProvider from "./SchuldeContext";
import SearchContextProvider from "./SearchContext";

const Context = ({ children }) => {
  return (
    <LanguageContexProvider>
      <SearchContextProvider>
        <DepartmentProvider>
          <MenuProvider>
            <BlogProvider>
              <SchuldeProvider>{children}</SchuldeProvider>
            </BlogProvider>
          </MenuProvider>
        </DepartmentProvider>
      </SearchContextProvider>
    </LanguageContexProvider>
  );
};

export default Context;
