import React, { useMemo } from "react";
import { Container, Layout } from "./style";
import { Title } from "../../Generics";
import LargeBanner from "../LargeBanner";
import filterSt from "../../../assets/images/filterSt.png";
import jasco from "../../../assets/images/dalban.jpg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Loading2 from "../../Loading2";
import { useBlogContext } from "../../../context/BlogContext";

const Talaba = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { thdata: data, thloading: loading, therror: error } = useBlogContext();

  const d = useMemo(() => data?.list?.sort((a, b) => b?.id - a?.id), [data]);

  if (loading) return <Loading2 />;
  if (error) return <div>Error: {error?.message}</div>;

  return (
    <Container className="root-container">
      <div className="root-wrapper">
        <Title
          title={t("student.title")}
          subtitle={t("student.desc")}
          button={t("student.btn")}
          to={"student-life"}
          $type={"light"}
        >
          <Layout $type="talaba">
            <div className="grid">
              <div className="grid__item" data-aos="fade-up">
                <LargeBanner
                  item={d && d[0]}
                  onClick={() =>
                    navigate(
                      `/${i18n.language}/blog/${
                        i18n.language === "uz" ? d[0]?.id : d[0]?.blog_id
                      }`
                    )
                  }
                />
                <LargeBanner
                  item={d && d[1]}
                  onClick={() =>
                    navigate(
                      `/${i18n.language}/blog/${
                        i18n.language === "uz" ? d[1]?.id : d[1]?.blog_id
                      }`
                    )
                  }
                />
              </div>
              <div data-aos="fade-up">
                <LargeBanner
                  item={d && d[2]}
                  onClick={() =>
                    navigate(
                      `/${i18n.language}/blog/${
                        i18n.language === "uz" ? d[2]?.id : d[2]?.blog_id
                      }`
                    )
                  }
                />
              </div>
              <div className="grid__large" data-aos="fade-up">
                <img
                  className="grid__large__img"
                  loading="lazy"
                  src={filterSt}
                />
                <div className="student">
                  <img
                    loading="lazy"
                    src={jasco}
                    alt=""
                    className="student__img"
                  />
                  <div className="student__name">Davron Toshmatov</div>
                  <div className="student__group">
                    "SIRIUS CLUB" jamoasi a'zosi
                  </div>
                  <div className="student__p">
                    Har bir talaba hayotda o'z oldiga yuksak maqsadlarni qo'yib,
                    harakatdan to'xtamasdan, o'z shaxsiy "men"ini rivojlantirgan
                    holda faqat oldinga intilishi lozim. Agarda talaba
                    rivojlansa — ta'lim rivojlanadi, ta'lim rivojlansa — ilm
                    rivojlanadi, ilm rivojlansa — davlat rivojlanadi, davlat
                    rivojlansa — mintaqa rivojlanadi, mintaqa rivojlansa — butun
                    dunyo rivojlanadi! Dunyoni rivojlantirmoqchimisiz, unda
                    avval uni o'zinggizdan boshlang!
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        </Title>
      </div>
    </Container>
  );
};

export default Talaba;
