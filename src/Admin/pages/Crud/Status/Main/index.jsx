import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DataTable from "../../../../components/DataTable";
import useAxios from "../../../../../hooks/useAxios";
import Cookies from "js-cookie";
import Wrapper from "../../../../components/Wrapper";

const SiteType = () => {
  const { sendRequest, loading, error } = useAxios();
  const token = `Bearer ${Cookies.get("_token")}`;
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getData = async () => {
    const response = await sendRequest({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL_API}/status/getallstatus`,
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
    <Wrapper title="Status" create={true}>
      <DataTable
        data={data}
        loading={loading}
        error={error}
        del={`${import.meta.env.VITE_BASE_URL_API}/status/deletestatus`}
        edit={"status/edit"}
        setIsDelete={setIsDelete}
        col={[
          { data: "id", title: "#" },
          { data: "name", title: "Name" },
          { data: "status", title: "Status" },
          { data: "is_deleted", title: "Is Deleted" },
        ]}
      />
    </Wrapper>
  );
};

export default SiteType;
