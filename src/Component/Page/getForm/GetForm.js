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

  console.log(formDatas?.data?.fields[0]?.user_gender);
  return (
    <div className="container w-50">
      <div>
        <h3 className="text-center">Get Form</h3>
      </div>
      <div className="mt-5">
        <form className="">
          {formDatas?.data?.fields[0]?.user_name && (
            <div className="form-group row mb-4">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                {`${formDatas?.data?.fields[0]?.user_name?.title}`}
              </label>
              <div className="col-sm-10">
                <input
                  type={formDatas?.data?.fields[0]?.user_name?.type}
                  className="form-control"
                  placeholder=""
                  aria-label=""
                  aria-describedby="basic-addon1"
                  required={
                    formDatas?.data?.fields[0]?.user_name.required === true
                      ? true
                      : false
                  }
                  defaultValue={formDatas?.data?.fields[0]?.user_name?.value}
                />
              </div>
              <div className="invalid-feedback">Please choose a username.</div>
            </div>
          )}
          {formDatas?.data?.fields[0]?.user_email && (
            <div className="form-group row mb-4">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                {`${formDatas?.data?.fields[0]?.user_email?.title}`}
              </label>
              <div className="col-sm-10">
                <input
                  type={formDatas?.data?.fields[0]?.user_email?.type}
                  className="form-control"
                  placeholder=""
                  aria-describedby="basic-addon1"
                  required={
                    formDatas?.data?.fields[0]?.user_name.required === true
                      ? true
                      : false
                  }
                />
              </div>
            </div>
          )}
          {formDatas?.data?.fields[0]?.details && (
            <div className="form-group row mb-4">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                {`${formDatas?.data?.fields[0]?.details?.title}`}
              </label>
              <div className="col-sm-10">
                {formDatas?.data?.fields[0]?.details?.type === "textarea" ? (
                  <textarea
                    type={formDatas?.data?.fields[0]?.details?.type}
                    className="form-control"
                    placeholder=""
                    aria-label=""
                    aria-describedby="basic-addon1"
                    required={
                      formDatas?.data?.fields[0]?.details?.required === true
                        ? true
                        : false
                    }
                  />
                ) : (
                  <input
                    type={formDatas?.data?.fields[0]?.details?.type}
                    className="form-control"
                    placeholder=""
                    aria-label=""
                    aria-describedby="basic-addon1"
                    required={
                      formDatas?.data?.fields[0]?.details?.required === true
                        ? true
                        : false
                    }
                  />
                )}
              </div>
            </div>
          )}
          {formDatas?.data?.fields[0]?.user_gender && (
            <div className="form-group row mb-4">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                {`${formDatas?.data?.fields[0]?.user_gender?.title}`}
              </label>
              <div className="col-sm-10">
                {formDatas?.data?.fields[0]?.user_gender.type === "select" ? (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    {/* <option>{`${formDatas?.data?.fields[0]?.user_gender?.type}`}</option> */}
                    {formDatas?.data?.fields[0]?.user_gender?.options.map(
                      (pd, index) => (
                        <option
                          key={pd.label}
                          required={
                            formDatas?.data?.fields[0]?.user_gender
                              ?.required === true
                              ? true
                              : false
                          }
                          defaultValue={pd.key}
                        >
                          {pd.label}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  <div>
                    {formDatas?.data?.fields[0]?.user_gender?.options.map(
                      (pd, index) => (
                        <div
                          className="form-check form-check-inline"
                          key={pd.key}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio1"
                            value={pd.key}
                            required={
                              formDatas?.data?.fields[0]?.user_gender
                                ?.required === true
                                ? true
                                : false
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            {pd.label}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <input
            type="submit"
            className="btn btn-primary"
            defaultValue="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default GetForm;
