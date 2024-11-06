import React, { useEffect } from "react";
import { Content } from "./style";
import FacultyCart from "../../components/Faculties/FacultyCart";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Pagination } from "antd";
import Loading2 from "../../components/Loading2";
import { Helmet } from "react-helmet";
import { useDepartmentContext } from "../../context/DepartmentContext";

const Faculties = () => {
  const naviagte = useNavigate();
  const { faculties: data, page, setPage, loading } = useDepartmentContext();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const pageChange = (e) => {
    setPage(e);
    const newUrl = `${window.location.pathname}?page=${e}`;
    window.history.replaceState(null, null, newUrl);
  };

  if (loading) {
    return <Loading2 />;
  }

  return (
    <div>
      <Helmet>
        <title>{t("faculties.all")}</title>
      </Helmet>
      <div className="root-container">
        <div className="root-wrapper">
          <Content data-aos="fade-up">
            <div className="title">{t("faculties.all")}</div>
            <Content.Body>
              {data?.list?.map((item) => {
                return (
                  <FacultyCart
                    key={item?.id}
                    item={item}
                    onClick={() =>
                      naviagte(
                        `${
                          i18n.language === "uz"
                            ? item?.id
                            : item?.departament_?.id
                        }`
                      )
                    }
                  />
                );
              })}
            </Content.Body>
            <div className="d-flex justify-content-center mt-4">
              <Pagination
                total={data?.length}
                current={page}
                onChange={pageChange}
              />
            </div>
          </Content>
        </div>
      </div>
    </div>
  );
};

export default Faculties;
