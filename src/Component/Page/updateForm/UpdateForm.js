import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateForm = () => {
  const { id } = useParams();
  const [formDatas, setformDatas] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [gender, setGender] = useState("");

  const [emailAttr, setEmailAttr] = useState([]);
  useEffect(() => {
    fetch("http://localhost/api/get_form.php")
      .then((res) => res.json())
      .then((data) => {
        setformDatas(data);
        data?.data?.fields[0]?.user_name?.value &&
          setName(data?.data?.fields[0]?.user_name?.value);
      });
  }, []);

  const handleName = (e) => {
    let value = e.target.value;
    value = value.replace(/[^A-Za-z]/gi, "");
    setName(value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleDetails = (e) => {
    setDetails(e.target.value);
  };
  const handleGender = (e) => {
    const { value } = e.target;
    setGender(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  const emailLimit = formDatas?.data?.fields[0]?.user_email?.validate?.replace(
    /\D/g,
    ""
  );

  return (
    <div>
      <p>{id}</p>
      <div className="container w-50">
        <div>
          <h3 className="text-center">Get Form</h3>
        </div>
        <div className="mt-5">
          <form className="" onSubmit={onSubmit}>
            {formDatas?.data?.fields[0]?.user_name && (
              <div className="form-group row mb-4">
                <label className="col-sm-2 col-form-label">
                  {`${formDatas?.data?.fields[0]?.user_name?.title}`}
                </label>
                <div className="col-sm-10">
                  <input
                    {...formDatas?.data?.fields[0]?.user_name.html_attr}
                    type={formDatas?.data?.fields[0]?.user_name?.type}
                    onChange={handleName}
                    className="form-control"
                    placeholder=""
                    aria-label=""
                    aria-describedby="basic-addon1"
                    required={
                      formDatas?.data?.fields[0]?.user_name.required === true
                        ? true
                        : false
                    }
                    value={name}
                  />
                </div>
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
                    defaultValue={formDatas?.data?.fields[0]?.user_email?.value}
                    onChange={handleEmail}
                    maxLength={emailLimit}
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
                      onChange={handleDetails}
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
                      onChange={handleDetails}
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
                      onChange={handleGender}
                      defaultValue={
                        formDatas?.data?.fields[0]?.user_gender?.default
                      }
                    >
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
                            value={pd.key}
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
                              onChange={handleGender}
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="inlineRadio1"
                              value={pd.key}
                              required={
                                formDatas?.data?.fields[0]?.user_gender
                                  ?.required === true
                                  ? true
                                  : false
                              }
                              defaultChecked={
                                formDatas?.data?.fields[0]?.user_gender
                                  ?.default === pd.key
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
    </div>
  );
};

export default UpdateForm;
