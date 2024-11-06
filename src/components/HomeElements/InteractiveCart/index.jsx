import React from "react";
import { Wrap } from "./style";
import { NavLink } from "react-router-dom";
import Image from "../../Image";

const InteractiveCart = ({ prop, aos }) => {
  return (
    <Wrap data-aos={aos}>
      <Image
        src={`${import.meta.env.VITE_BASE_URL_IMG}${
          prop?.icon_?.url || prop?.icon_translation_?.url
        }`}
        alt=""
      />
      <NavLink className={"title"} to={`${prop?.url_}`} target="_blank">
        {prop?.title}
      </NavLink>
    </Wrap>
  );
};

export default InteractiveCart;
