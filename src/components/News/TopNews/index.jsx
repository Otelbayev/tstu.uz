import React from "react";
import { Container } from "./style";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TopNews = ({ dataAos, data }) => {
  const { i18n } = useTranslation();

  return (
    <Container data-aos={dataAos}>
      <div className="contnet">
        <div className="content__title">TOP Yangilik</div>
        <div className="content__wrap">
          {data?.slice(0, 10).map((e) => (
            <NavLink
              className="content__wrap__item"
              to={`/${i18n.language}/blog/${e?.id}`}
              key={e?.id}
            >
              {e?.title}
            </NavLink>
          ))}
        </div>
        <NavLink className="content__btn" to={`/${i18n.language}/blog`}>
          See More
        </NavLink>
      </div>
    </Container>
  );
};

export default TopNews;
