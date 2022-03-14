import React, { useEffect, useState } from "react";

const GetForm = () => {
  const [formDatas, setformDatas] = useState([]);
  useEffect(() => {
    fetch("http://localhost/api/get_form.php")
      .then((res) => res.json())
      .then((data) => {
        setformDatas(data);
      });
  }, []);
  const user = {
    role: "Student",
    name: "John",
  };
  console.log(formDatas?.data?.fields[0]?.user_email?.title);
  return (
    <div className="container w-50">
      <div>
        <h3 className="text-center">Get Form</h3>
      </div>
      <div className="mt-5">
        <form className="">
          <div className="input-group mb-3">
            <div className="input-group-prepend pe-5 pt-2">
              <h6>{`${formDatas?.data?.fields[0]?.user_name?.title}`}</h6>
            </div>
            <input
              type={formDatas?.data?.fields[0]?.user_name?.type}
              className="form-control"
              size="100px"
              placeholder=""
              aria-label=""
              aria-describedby="basic-addon1"
              required={
                formDatas?.data?.fields[0]?.user_name.required === true
                  ? true
                  : false
              }
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend pe-5 pt-2">
              <h6>{`${formDatas?.data?.fields[0]?.user_email?.title}`}</h6>
            </div>
            <input
              type={formDatas?.data?.fields[0]?.user_email?.type}
              className="form-control"
              size="100px"
              placeholder=""
              aria-label=""
              aria-describedby="basic-addon1"
              required={
                formDatas?.data?.fields[0]?.user_email?.required === true
                  ? true
                  : false
              }
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
        <form>
          <div className="form-group row">
            <label for="staticEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                // readonly
                className="form-control-plaintext"
                id="staticEmail"
                defaultValue="email@example.com"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetForm;
