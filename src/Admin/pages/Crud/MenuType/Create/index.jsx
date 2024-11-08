import React, { useState } from "react";
import LanguageSelect from "../../../../components/Generics/LanguageSelect";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useCreate } from "./../../../../hooks/useCreate";
import Wrapper from "../../../../components/Wrapper";
import { useTranslation } from "react-i18next";

const Create = () => {
  const [value, setValue] = useState("uz");
  const { options } = useLanguageContext();
  const language_id = options.find((e) => e.code === value)?.id;
  const [titleValue, setTitleValue] = useState("");
  const [inputStyle, setInputStyle] = useState({});
  const { i18n } = useTranslation();

  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!titleValue) {
      setInputStyle({ border: "1px solid red" });
      return;
    }

    const res = await useCreate(
      value,
      "obj",
      {
        title: titleValue,
      },
      `${import.meta.env.VITE_BASE_URL_API}/menutype/createmenutype`,
      `${import.meta.env.VITE_BASE_URL_API}/menutype/createmenutypetranslation`,
      "menu_type_id",
      [{ language_id }]
    );
    res?.statusCode === 200 && navigate(`/${i18n.language}/admin/menutype`);
  };

  return (
    <Wrapper title={"Create Menu Type"}>
      <form onSubmit={onHandleSubmit} className="col-md-12">
        <div className="row">
          <LanguageSelect onChange={(e) => setValue(e)} />
        </div>
        <div className="row">
          <div className="col-md-10">
            <input
              type="text"
              className="form-control"
              placeholder="Type"
              onChange={(e) => setTitleValue(e.target.value)}
              style={inputStyle}
              value={titleValue}
              onFocus={() => setInputStyle(null)}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn w-100 btn-primary">
              Create
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create;
