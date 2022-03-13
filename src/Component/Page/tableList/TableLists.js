import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

  const handleDragEnd = (e) => {
    console.log(e);

    if (!e.destination) return;
    let tempData = Array.from(displayData);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setDisplayData(tempData);

    alert("test");
  };

  // search functionality start

  // search id
  const handleSearchById = (e) => {
    const searchId = e.target.value;

    const machedId = tableDatas.data?.rows?.filter((item) =>
      item.id.toString().includes(searchId)
    );
    setDisplayData(machedId);
  };

  //search by name

  const handleSearchByName = (e) => {
    const searchName = e.target.value;
    const machedName = tableDatas.data?.rows?.filter((item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setDisplayData(machedName);
  };
  const handleSearchByMessage = (e) => {
    const searchName = e.target.value;
    const machedName = tableDatas.data?.rows?.filter((item) =>
      item?.message?.toLowerCase().includes(searchName.toLowerCase())
    );
    setDisplayData(machedName);
  };

  // search functionality end

  // sorted by name,message,date start

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
        <input
          type="text"
          className="form-control"
          placeholder="Search Message"
          aria-label=""
          aria-describedby="basic-addon1"
          onChange={handleSearchByMessage}
        />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
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
                    draggableId={user.name}
                    index={index}
                  >
                    {(provider) => (
                      <tr {...provider.draggableProps} ref={provider.innerRef}>
                        <td {...provider.dragHandleProps} onClick={dargChange}>
                          {user.id}
                        </td>
                        <td {...provider.dragHandleProps} onClick={dargChange}>
                          {user.name}
                        </td>
                        <td {...provider.dragHandleProps} onClick={dargChange}>
                          {user.message}
                        </td>
                        <td {...provider.dragHandleProps} onClick={dargChange}>
                          {user.created_at}
                        </td>
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
