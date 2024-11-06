import React from "react";
import { Container } from "./style";
import { Title } from "../../Generics";
import Slider from "react-slick";
import KafedraCart from "../KafedraCart";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useBlog } from "./../../../hooks/useBog";
import Loading2 from "../../Loading2";
import { useBlogContext } from "../../../context/BlogContext";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Talim = () => {
  const { t, i18n } = useTranslation();

  const { tdata: data, tloading: loading } = useBlogContext();

  const navigate = useNavigate();

  if (loading) return <Loading2 />;

  return (
    <Container className="root-container">
      <div className="root-wrapper">
        <Title
          title={t("talim.title")}
          subtitle={t("talim.desc")}
          button={t("talim.btn")}
          $type={"light"}
          to={"education"}
        >
          <div data-aos="fade-up">
            <Slider className="slider" {...settings}>
              {data?.list
                ?.sort((a, b) => b?.id - a?.id)
                ?.map((e) => (
                  <div className="slider__item" key={e.id}>
                    <KafedraCart
                      onClick={() =>
                        navigate(
                          `/${i18n.language}/blog/${
                            i18n.language === "uz" ? e?.id : e?.blog_id
                          }`
                        )
                      }
                      $slider={"true"}
                      prop={e}
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </Title>
      </div>
    </Container>
  );
};

export default Talim;
