import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const TableList = () => {
  const [tableDatas, setTableDatas] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [reorderCheckd, setReorderCheckd] = useState([]);
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    fetch(`http://localhost/api/list.php`)
      .then((res) => res.json())
      .then((data) => {
        setTableDatas(data);
        setDisplayData(data.data.rows);
      });
    fetch(`http://localhost/api/reorder.php`)
      .then((res) => res.json())
      .then((data) => {
        setReorderCheckd(data);
      });
  }, []);
  console.log(reorderCheckd?.status, reorderCheckd?.messages?.join(`\n`));
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let dragData = Array.from(displayData);
    let [source_data] = dragData.splice(e.source.index, 1);
    dragData.splice(e.destination.index, 0, source_data);
    setDisplayData(dragData);
    if (reorderCheckd?.status === "success") {
      Swal.fire(
        `${reorderCheckd?.status}`,
        `${reorderCheckd?.messages?.join(`\n`)}`,
        "success"
      );
    } else if (reorderCheckd?.status === "false") {
      Swal.fire({
        icon: "error",
        title: `${reorderCheckd?.status}`,
        text: `${reorderCheckd?.messages?.join(`\n`)}`,
      });
    }
  };

  // console.log(tableDatas.messages);
  // search functionality start

  // search id
  const handleSearchById = (e) => {
    if (tableDatas.data?.headers[0].id.searchable === true) {
      const searchId = e.target.value;

      const machedId = tableDatas.data?.rows?.filter((item) =>
        item.id.toString().includes(searchId)
      );
      setDisplayData(machedId);
    }
  };

  //search by name

  const handleSearchByName = (e) => {
    if (tableDatas.data?.headers[0].name.searchable === true) {
      const searchName = e.target.value;
      const machedName = tableDatas.data?.rows?.filter((item) =>
        item.name.toLowerCase().includes(searchName.toLowerCase())
      );
      setDisplayData(machedName);
    }
  };

  // search functionality end

  // sorted start
  // sorted by id
  const sortingbyId = (col) => {
    if (tableDatas.data?.headers[0].id.sortable === true) {
      if (order === "ASC") {
        const sorted = [...displayData].sort((a, b) =>
          a[col]?.toString() > b[col]?.toString() ? 1 : -1
        );
        setDisplayData(sorted);
        setOrder("DSC");
      }
      if (order === "DSC") {
        const sorted = [...displayData].sort((a, b) =>
          a[col] < b[col] ? 1 : -1
        );
        setDisplayData(sorted);
        setOrder("ASC");
      }
    }
  };

  // sorted by name

  const sortingbyName = (col) => {
    if (tableDatas.data?.headers[0].name.sortable === true) {
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
    }
  };
  // sorted by message
  const sortingbyMessage = (col) => {
    if (tableDatas.data?.headers[0].message.sortable === true) {
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
    }
  };
  const sortingbyDate = (col) => {
    if (tableDatas.data?.headers[0]?.created_at.sortable === true) {
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
    }
  };
  // sorted by name,message,date end

  const dargChange = (e) => {
    console.log("hit me");
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
          className="form-control  me-2"
          placeholder="Search Name"
          aria-label=""
          aria-describedby="basic-addon1"
          onChange={handleSearchByName}
        />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <table className="table table-bordered">
          <thead>
            {tableDatas.data?.headers?.map((pd, index) => (
              <tr key={pd.id}>
                {pd.id.hidden === false && (
                  <th scope="col" onClick={() => sortingbyId("message")}>
                    {pd?.id.title}
                  </th>
                )}
                {pd.name.hidden === false && (
                  <th scope="col" onClick={() => sortingbyName("name")}>
                    {pd?.name.title}
                  </th>
                )}
                {pd.message.hidden === false && (
                  <th scope="col" onClick={() => sortingbyMessage("message")}>
                    {pd?.message.title}
                  </th>
                )}
                {pd.created_at.hidden === false && (
                  <th scope="col" onClick={() => sortingbyDate("created_at")}>
                    {pd?.created_at.title}
                  </th>
                )}
              </tr>
            ))}
          </thead>
          <Droppable droppableId="droppable-1">
            {(provider) => (
              <tbody
                className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}
                onChange={dargChange}
              >
                {displayData?.map((user, index) => (
                  <Draggable
                    key={user.name}
                    draggableId={`${user.id}`}
                    index={index}
                  >
                    {(provider) => (
                      <tr {...provider.draggableProps} ref={provider.innerRef}>
                        {tableDatas.data?.headers[0]?.id.hidden === false && (
                          <td
                            {...provider.dragHandleProps}
                            onClick={dargChange}
                          >
                            <Link to={`/updateform/${user.id}`}>{user.id}</Link>
                          </td>
                        )}
                        {tableDatas.data?.headers[0]?.name.hidden === false && (
                          <td
                            {...provider.dragHandleProps}
                            onClick={dargChange}
                          >
                            {user.name}
                          </td>
                        )}
                        {tableDatas.data?.headers[0]?.message.hidden ===
                          false && (
                          <td
                            {...provider.dragHandleProps}
                            onClick={dargChange}
                          >
                            {user.message}
                          </td>
                        )}
                        {tableDatas.data?.headers[0]?.created_at.hidden ===
                          false && (
                          <td
                            {...provider.dragHandleProps}
                            onClick={dargChange}
                          >
                            {user.created_at}
                          </td>
                        )}
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </div>
  );
};

export default TableList;
