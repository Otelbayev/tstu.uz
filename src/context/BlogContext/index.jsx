import { createContext, useContext } from "react";
import { useBlog } from "../../hooks/useBog";

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

const BlogProvider = ({ children }) => {
  const { data: d1 } = useBlog("Yangiliklar", true, false, 1, 2);
  const { data: d2 } = useBlog("Xalqaro hamkorlik", true, false, 1, 2);
  const { data: d3 } = useBlog(
    "Dissertatsiya ishi muhokamasi",
    true,
    false,
    1,
    2
  );
  const {
    data: ktdata,
    loading: ktloading,
    error: kterror,
  } = useBlog("Kutilayotgan tadbirlar", true);
  const {
    data: thdata,
    loading: thloading,
    error: therror,
  } = useBlog("Talaba hayoti", true, 3, 1);
  const { data: tdata, loading: tloading } = useBlog("Ta‘lim", true);

  return (
    <BlogContext.Provider
      value={{
        d1,
        d2,
        d3,
        ktdata,
        ktloading,
        kterror,
        thdata,
        thloading,
        therror,
        tdata,
        tloading,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
