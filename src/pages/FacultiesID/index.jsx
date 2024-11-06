import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../components/Faculties/Header";
import Showcase from "../../components/Faculties/Showcase";
import IlmiyMarkazCart from "../../components/IlmiyMarkazCart";
import {
  IlmiyMarkaz,
  Kafedra,
  KafedraWrap,
  Orinbosar,
  Yonalish,
  Wrap,
} from "./style";
import { useNavigate, useParams } from "react-router-dom";
import DekanCart from "../../components/Faculties/DekanCart";
import Dekans from "../../components/Faculties/Dekan";
import Footer from "../../components/Footer";
import Yonalishlar from "../../components/Faculties/Yonalishlar";
import { Title } from "../../components/Generics";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useHandleScroll } from "../../hooks/useHandleScroll";
import { Helmet } from "react-helmet";
import { useDepartmentContext } from "../../context/DepartmentContext";

const FacultiesID = () => {
  const naviagte = useNavigate();

  const aboutRef = useRef();
  const kafedraRef = useRef();
  const centerRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const [data, setData] = useState([]);

  const [orinbosar, setOrinBosar] = useState([]);
  const [dekan, setDekan] = useState({});
  const [kafedra, setKafedra] = useState([]);
  const [scientific, setScientific] = useState([]);
  const [bakalavr, setBakalavr] = useState([]);
  const [magistr, setMagistr] = useState([]);
  const [lab, setlab] = useState([]);

  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { faculties } = useDepartmentContext();

  const data = useMemo(() => {
    if (i18n.language === "uz") {
      return faculties?.list?.find((e) => e.id == id);
    }
    return faculties?.list?.find((e) => e.departament_?.id == id);
  }, [faculties]);

  const getChild = async () => {
    const res = await axios.get(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/departament/sitegetalldepartamentfacultychild/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/departament/sitegetalldepartamenttranslationfacultychild/${id}?language_code=${
            i18n.language
          }`
    );
    if (res.status === 200) {
      setScientific(
        res.data.filter(
          (e) =>
            e?.departament_type_?.type === "Ilmiy markaz" ||
            e?.departament_type_translation_?.departament_type_?.type ===
              "Ilmiy markaz"
        )
      );
      setKafedra(
        res.data.filter(
          (e) =>
            e?.departament_type_?.type === "Kafedra" ||
            e?.departament_type_translation_?.departament_type_?.type ===
              "Kafedra"
        )
      );
      setBakalavr(
        res.data.filter(
          (e) =>
            e?.departament_type_?.type === "Bakalavriat yo'nalishlari" ||
            e?.departament_type_translation_?.departament_type_?.type ===
              "Bakalavriat yo'nalishlari"
        )
      );
      setMagistr(
        res.data.filter(
          (e) =>
            e?.departament_type_?.type === "Magistratura yo‘nalishlari" ||
            e?.departament_type_translation_?.departament_type_?.type ===
              "Magistratura yo‘nalishlari"
        )
      );
      setlab(
        res.data.filter(
          (e) =>
            e?.departament_type_?.type === "O'quv labaratoriyalari" ||
            e?.departament_type_translation_?.departament_type_?.type ===
              "O'quv labaratoriyalari"
        )
      );
    }
  };

  const getPersonData = async () => {
    const res = await axios.get(
      i18n.language === "uz"
        ? `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/sitegetallpersondatadepid/${id}`
        : `${
            import.meta.env.VITE_BASE_URL_API
          }/persondata/sitegetallpersondatatranslationdepuzid/${id}?language_code=${
            i18n.language
          }`
    );
    if (res.status === 200) {
      setDekan(
        res.data?.find(
          (e) =>
            e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
              "dekan" ||
            e?.persons_translation_?.employee_type_translation_?.employee_?.title
              ?.toLowerCase()
              ?.trim() === "dekan"
        )
      );

      setOrinBosar(
        res.data?.filter(
          (e) =>
            e?.persons_?.employee_type_?.title?.toLowerCase()?.trim() ===
              "dekan o'rinbosari" ||
            e?.persons_translation_?.employee_type_translation_?.employee_?.title
              ?.toLowerCase()
              ?.trim() === "dekan o'rinbosari"
        )
      );
    }
  };

  useEffect(() => {
    getPersonData();
    getChild();
  }, [id, i18n.language]);

  const links = [
    { title: t("facultet.links.link1"), refs: aboutRef },
    { title: t("facultet.links.link2"), refs: kafedraRef },
    { title: t("facultet.links.link3"), refs: centerRef },
  ];

  const getTitle = (title, language) => {
    const obj = {
      uz: `${title} fakultetiga xush kelibsiz!`,
      en: `Welcome to the Faculty of ${title}!`,
      ru: `Добро пожаловать на факультет ${title}!`,
    };

    return obj[language];
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>{data?.title}</title>
        <meta
          name="description"
          content={getTitle(data?.title, i18n.language)}
        />
        <link
          rel="icon"
          href={`${import.meta.env.VITE_BASE_URL_API}${data?.img_icon_?.url}`}
        />
      </Helmet>
      <div className="overflow-hidden">
        <Header links={links} />
        <Showcase
          bg={`${import.meta.env.VITE_BASE_URL_IMG}${data?.img_?.url}`}
          title={getTitle(data?.title, i18n.language)}
          button={t("facultet.btn")}
          onClick={() => useHandleScroll(aboutRef)}
        ></Showcase>
        <div className="root-container">
          <div className="root-wrapper">
            <Wrap>
              <div ref={aboutRef}>
                <Title title={t("facultet.about")} $border={"none"} />
                <div
                  dangerouslySetInnerHTML={{ __html: data?.text }}
                  data-aos="fade-up"
                  className="text"
                />
              </div>
              <Title title={t("facultet.dekan")} $border={"none"} />
              <Dekans img={dekan} data={dekan} />
              <Title title={t("facultet.orin")} $border={"none"} />
              <Orinbosar>
                {orinbosar.map((e) => (
                  <DekanCart key={e?.id} data={e} />
                ))}
              </Orinbosar>
              <div ref={kafedraRef}>
                <Title title={t("facultet.kafedra")} $border={"none"} />
                <KafedraWrap>
                  <Kafedra>
                    {kafedra?.map((e) => (
                      <Kafedra.Item
                        data-aos="zoom-in"
                        onClick={() =>
                          naviagte(
                            `/${i18n.language}/kafedra/${
                              i18n.language === "uz"
                                ? e?.id
                                : e?.departament_?.id
                            }`
                          )
                        }
                        $bg={`${import.meta.env.VITE_BASE_URL_IMG}${
                          e?.img_?.url
                        }`}
                        key={e.id}
                      >
                        <Kafedra.Content>
                          {e?.title}
                          <Kafedra.Arrow />
                        </Kafedra.Content>
                      </Kafedra.Item>
                    ))}
                  </Kafedra>
                </KafedraWrap>
              </div>
              <div>
                <Title title={t("lab")} $border={"none"} />
                <IlmiyMarkaz>
                  {lab?.length ? (
                    lab?.map((e) => (
                      <IlmiyMarkazCart
                        key={e?.id}
                        to={`department/${
                          i18n.language === "uz" ? e?.id : e?.departament_?.id
                        }`}
                        $border={"#CECECE"}
                        dataAos="zoom-in"
                        item={e}
                      />
                    ))
                  ) : (
                    <div data-aos="fade-right">Ma'lumot mavjud emas!</div>
                  )}
                </IlmiyMarkaz>
              </div>
              <div ref={centerRef}>
                <Title title={t("facultet.markaz")} $border={"none"} />
                <IlmiyMarkaz>
                  {scientific?.length ? (
                    scientific?.map((e) => (
                      <IlmiyMarkazCart
                        key={e?.id}
                        to={`department/${
                          i18n.language === "uz" ? e?.id : e?.departament_?.id
                        }`}
                        $border={"#CECECE"}
                        dataAos="zoom-in"
                        item={e}
                      />
                    ))
                  ) : (
                    <div data-aos="fade-right">Ma'lumot mavjud emas!</div>
                  )}
                </IlmiyMarkaz>
              </div>
              <Yonalish>
                <Yonalish.Left data-aos="fade-right">
                  <Yonalish.Title>{t("facultet.bakalavr")}</Yonalish.Title>
                  <Yonalishlar data={bakalavr} />
                </Yonalish.Left>
                <Yonalish.Right data-aos="fade-left">
                  <Yonalish.Title>{t("facultet.magistr")}</Yonalish.Title>
                  <Yonalishlar data={magistr} />
                </Yonalish.Right>
              </Yonalish>
            </Wrap>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default FacultiesID;
