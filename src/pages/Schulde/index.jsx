import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import UniShowcase from "../../components/UniShowcase";
import { useTranslation } from "react-i18next";
import { Button, Select } from "antd";
import { Form } from "./style";
import { bino, kesim, season, semestr } from "./mock";
import { useSchuldeContext } from "../../context/SchuldeContext";
import ScheduleContent from "./schedule-content";

const filterOption = (input, option) =>
  option.label?.toLowerCase().includes(input?.toLowerCase());

const Schulde = () => {
  const { t } = useTranslation();
  const { schulde, setSchulde } = useSchuldeContext();
  const [loading, setLoading] = useState(false);
  const token = import.meta.env.VITE_CAPCHA_TOKEN;

  const [faculty, setFaculty] = useState([]);
  const [facultyValue, setFacultyValue] = useState(null);

  const [groups, setGroups] = useState([]);

  const getFacultyOptions = async () => {
    await fetch(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/hemisapicontroller/data/departments-list?active=1&_structure_type=11`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setFaculty(res.data?.items));
  };

  const getGroups = async () => {
    await fetch(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/hemisapicontroller/data/groups-list?active=1&_structure_type=11`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const onGenerate = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getFacultyOptions();
    getGroups();
  }, []);

  const facultyOptions = useMemo(() => {
    if (!faculty)
      return [
        {
          value: "0",
          label: "Fakultet tanlang",
        },
      ];
    return faculty.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [faculty]);

  useEffect(() => {
    setFacultyValue(facultyOptions[0]?.value);
  }, [facultyOptions]);

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
                <Select
                  className="full"
                  id="fak"
                  options={facultyOptions}
                  value={
                    facultyValue || { value: "0", label: "Yuklanmoqda..." }
                  }
                  onChange={(e) => setFacultyValue(e)}
                  optionFilterProp="label"
                  showSearch
                  filterOption={filterOption}
                />
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
                  optionFilterProp="label"
                  showSearch
                  filterOption={filterOption}
                />
              </div>
            )}
            {schulde === "2" && (
              <div className="form-item">
                <label htmlFor="xona">Xona</label>
                <Select
                  className="full"
                  id="xona"
                  options={season}
                  showSearch
                  filterSort={filterSort}
                />
              </div>
            )}
            {schulde === "1" && (
              <div className="form-item">
                <label htmlFor="kaf">Kafedralar</label>
                <Select
                  className="full"
                  id="kaf"
                  options={season}
                  optionFilterProp="label"
                  showSearch
                  filterOption={filterOption}
                />
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
                <Select
                  className="full"
                  id="group"
                  optionFilterProp="label"
                  showSearch
                  filterOption={filterOption}
                />
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
