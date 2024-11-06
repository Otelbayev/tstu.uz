import React, { useMemo, useCallback } from "react";
import { Title } from "../../Generics";
import { Layout } from "./style";
import LargeBanner from "../LargeBanner";
import Cart from "../Cart";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "../../../context/BlogContext";

const News = ({ type }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (id) => {
      navigate(`/${i18n.language}/blog/${id}`);
    },
    [navigate, i18n.language]
  );

  const { d1, d2, d3 } = useBlogContext();

  // Memoize sorted data to avoid re-sorting on each render
  const sortedData1 = useMemo(
    () => d1?.list?.sort((a, b) => b?.id - a?.id),
    [d1]
  );
  const sortedData2 = useMemo(
    () => d2?.list?.sort((a, b) => b?.id - a?.id),
    [d2]
  );
  const sortedData3 = useMemo(
    () => d3?.list?.sort((a, b) => b?.id - a?.id),
    [d3]
  );

  // Helper function for rendering items to avoid repetitive code
  const renderBanner = (data, index, Component) => (
    <Component
      item={data && data[index]}
      type={type}
      onClick={() =>
        handleNavigation(
          i18n.language === "uz" ? data?.[index]?.id : data?.[index]?.blog_id
        )
      }
    />
  );

  return (
    <Layout className="root-container">
      <div className="root-wrapper">
        <Title title={t("news.title")} button={t("news.btn")} to="blog">
          <div className="grid">
            <div data-aos="fade-up" className="grid__item1">
              {renderBanner(sortedData1, 0, LargeBanner)}
            </div>
            <div data-aos="fade-up" className="grid__item2">
              {renderBanner(sortedData1, 1, Cart)}
            </div>
            <div data-aos="fade-up" className="grid__item3">
              {renderBanner(sortedData2, 0, Cart)}
            </div>
            <div data-aos="fade-up" className="grid__item4">
              {renderBanner(sortedData2, 1, Cart)}
            </div>
            <div data-aos="fade-up" className="grid__item5">
              {renderBanner(sortedData3, 0, Cart)}
            </div>
            <div data-aos="fade-up" className="grid__item6">
              {renderBanner(sortedData3, 1, LargeBanner)}
            </div>
          </div>
        </Title>
      </div>
    </Layout>
  );
};

export default News;
