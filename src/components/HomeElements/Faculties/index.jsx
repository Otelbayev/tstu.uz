import React, { useEffect, useMemo, useState } from "react";
import { FakGrid, Fakultetlar } from "./style";
import { Title } from "../../Generics";
import KafedraCart from "../KafedraCart";
import FacultetCart from "../FacultetCart";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDepartmentContext } from "../../../context/DepartmentContext";

const Faculties = () => {
  const [id, setId] = useState(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { faculties, kafedras } = useDepartmentContext();

  useEffect(() => {
    setId(faculties?.list?.length ? faculties?.list[0]?.id : null);
  }, [faculties]);

  const fac = useMemo(() => {
    if (faculties?.list) {
      return faculties.list.find((e) => e.id === id);
    }
  });

  return (
    <Fakultetlar className="root-container">
      <div className="root-wrapper">
        <Title
          title={t("faculties.title")}
          button={t("faculties.btn")}
          to="faculty"
          $type={"light"}
        >
          <FakGrid>
            <div data-aos="fade-up" className="fak-left">
              <div className="fak-left__content">
                {faculties?.list?.map((e) => (
                  <FacultetCart
                    key={e?.id}
                    id={id}
                    onClick={() => setId(e?.id)}
                    prop={e}
                  />
                ))}
              </div>
            </div>
            <div data-aos="fade-up" className="wrap">
              <div className="fak-right">
                <div className="fak-right__title">{t("faculties.kafedra")}</div>
                <div className="fak-right__cards">
                  <KafedraCart
                    arrow={false}
                    fac={true}
                    onClick={() =>
                      navigate(
                        `/${i18n.language}/faculty/${
                          i18n.language === "uz" ? id : fac?.departament_?.id
                        }`
                      )
                    }
                    prop={fac}
                  />
                  {kafedras?.list
                    ?.filter((e) => e?.parent_id === id)
                    ?.map((item) => (
                      <KafedraCart
                        arrow={false}
                        onClick={() =>
                          navigate(
                            `/${i18n.language}/kafedra/${`${
                              i18n.language === "uz"
                                ? item?.id
                                : item?.departament_?.id
                            }`}`
                          )
                        }
                        key={item?.id}
                        prop={item}
                      />
                    ))}
                </div>
              </div>
            </div>
          </FakGrid>
        </Title>
      </div>
    </Fakultetlar>
  );
};

export default Faculties;
