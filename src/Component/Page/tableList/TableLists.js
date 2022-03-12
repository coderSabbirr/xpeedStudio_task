import React, { useEffect, useState } from "react";

const TableList = () => {
  const [tableDatas, setTableDatas] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [order, setOrder] = useState("ASC");
  useEffect(() => {
    fetch(`http://localhost/api/list.php`)
      .then((res) => res.json())
      .then((data) => {
        setTableDatas(data);
        setDisplayData(data.data.rows);
      });
  }, []);

  const handleSearchById = (e) => {
    const searchId = e.target.value;

    const machedId = tableDatas.data?.rows?.filter((item) =>
      item.id.toString().includes(searchId)
    );
    setDisplayData(machedId);
  };

  const handleSearchByName = (e) => {
    const searchName = e.target.value;
    const machedName = tableDatas.data?.rows?.filter((item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setDisplayData(machedName);
  };
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...displayData].sort((a, b) =>
        a[col]?.toLowerCase().toString() > b[col]?.toLowerCase().toString()
          ? 1
          : -1
      );
      setDisplayData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...displayData].sort((a, b) =>
        a[col]?.toLowerCase() < b[col]?.toLowerCase() ? 1 : -1
      );
      setDisplayData(sorted);
      setOrder("ASC");
    }
  };
  return (
    <div
      className="w-50 mt-5"
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <div className="input-group mb-3">
        <input
          type="number"
          className="form-control me-2"
          placeholder="Search Id"
          aria-label=""
          aria-describedby="basic-addon1"
          onChange={handleSearchById}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Search Name"
          aria-label=""
          aria-describedby="basic-addon1"
          onChange={handleSearchByName}
        />
      </div>
      <table className="table table-bordered">
        <thead>
          {tableDatas.data?.headers?.map((pd, index) => (
            <tr key={pd.id}>
              {pd.id.hidden === false && <th scope="col">{pd?.id.title}</th>}
              {pd.name.hidden === false && (
                <th scope="col" onClick={() => sorting("name")}>
                  {pd?.name.title}
                </th>
              )}
              {pd.message.hidden === false && (
                <th scope="col" onClick={() => sorting("message")}>
                  {pd?.message.title}
                </th>
              )}
              {pd.created_at.hidden === false && (
                <th scope="col" onClick={() => sorting("created_at")}>
                  {pd?.created_at.title}
                </th>
              )}
            </tr>
          ))}
        </thead>
        <tbody>
          {displayData.map((pd, index) => (
            <tr key={pd.id}>
              <td>{pd.id}</td>
              <td>{pd.name}</td>
              <td>{pd.message}</td>
              <td>{pd.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
