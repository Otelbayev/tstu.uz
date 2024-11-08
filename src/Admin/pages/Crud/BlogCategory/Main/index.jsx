import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DataTable from "../../../../components/DataTable";
import useAxios from "../../../../../hooks/useAxios";
import Cookies from "js-cookie";
import Wrapper from "../../../../components/Wrapper";

const BlogCategory = () => {
  const { sendRequest, loading, error } = useAxios();
  const token = `Bearer ${Cookies.get("_token")}`;
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    const response = await sendRequest({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL_API}/blogcategorycontroller/getallblogcategory`,
      headers: {
        Authorization: token,
      },
    });
    response.status === 200 &&
      setData(response?.data?.sort((b, a) => b.id - a.id));
  };

  useEffect(() => {
    getData();
  }, [isDelete]);

  return (
    <Wrapper title="Blog Category" create={true}>
      <DataTable
        data={data}
        loading={loading}
        error={error}
        del={
          `${import.meta.env.VITE_BASE_URL_API}/blogcategorycontroller/deleteblogcategory`
        }
        edit={"blogcategory/edit"}
        setIsDelete={setIsDelete}
        col={[
          { data: "id", title: "# " },
          { data: "title", title: "Title" },
          { data: "status_.status", title: "Status" },
        ]}
      />
    </Wrapper>
  );
};

export default BlogCategory;
