import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import UniShowcase from "../../components/UniShowcase";
import { useTranslation } from "react-i18next";
import { Button, Select } from "antd";
import { Form } from "./style";
import { bino, kesim, season, semestr } from "./mock";
import { useSchuldeContext } from "../../context/SchuldeContext";
import ScheduleContent from "./schedule-content";

const Schulde = () => {
  const { t } = useTranslation();
  const { schulde, setSchulde } = useSchuldeContext();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const getToken = async () => {
    await fetch(
      `${import.meta.env.VITE_BASE_URL_API}/Tokens/sitegetbyidtokens/1`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CAPCHA_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setToken(res.token);
        Cookies.set("hemis_token", res.token);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  const onGenerate = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <Helmet>
        <title>{t("interactive.schulde")}</title>
      </Helmet>
      <UniShowcase title={t("interactive.schulde")} />
      <div className="root-container">
        <div className="root-wrapper my-4 container">
          <Form action="form">
            <div className="form-item" style={{ width: "180px" }}>
              <label htmlFor="fir">Kesimni tanlash</label>
              <Select
                className="full"
                id="fir"
                options={kesim}
                defaultValue={"0"}
                style={{ width: "180px" }}
                onChange={(e) => setSchulde(e)}
              />
            </div>
            {(schulde === "0" || schulde === "1") && (
              <div className="form-item">
                <label htmlFor="fak">Fakultetlar</label>
                <Select className="full" id="fak" options={season} />
              </div>
            )}
            {schulde === "2" && (
              <div className="form-item">
                <label htmlFor="bino">Bino</label>
                <Select
                  className="full"
                  id="bino"
                  options={bino}
                  defaultValue={"1"}
                />
              </div>
            )}
            {schulde === "2" && (
              <div className="form-item">
                <label htmlFor="xona">Xona</label>
                <Select className="full" id="xona" options={season} />
              </div>
            )}
            {schulde === "1" && (
              <div className="form-item">
                <label htmlFor="kaf">Kafedralar</label>
                <Select className="full" id="kaf" options={season} />
              </div>
            )}
            {schulde === "1" && (
              <div className="form-item">
                <label htmlFor="teacher">O'qituvchi</label>
                <Select className="full" id="teacher" options={season} />
              </div>
            )}
            <div className="form-item " style={{ width: "130px" }}>
              <label htmlFor="year">O'quv yili</label>
              <Select
                className="full"
                id="year"
                options={season}
                defaultValue={"1991"}
                style={{ width: "130px" }}
              />
            </div>
            {schulde === "0" && (
              <div className="form-item">
                <label htmlFor="group">Gruh</label>
                <Select className="full" id="group">
                  <Select.Option value="1">1</Select.Option>
                </Select>
              </div>
            )}
            {schulde === "0" && (
              <div className="form-item" style={{ width: "120px" }}>
                <label htmlFor="sem">Semestr</label>
                <Select
                  className="full"
                  id="sem"
                  options={semestr}
                  defaultValue={"1"}
                />
              </div>
            )}
            <div className="form-item" style={{ width: "200px" }}>
              <label htmlFor="gen">Generatsiya</label>
              <Button
                type="primary"
                style={{ width: "200px" }}
                onClick={onGenerate}
              >
                Generatsiya
              </Button>
            </div>
          </Form>

          <ScheduleContent loading={loading} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
};

export default Schulde;
