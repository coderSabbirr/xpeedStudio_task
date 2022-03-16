import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateForm = () => {
  const { id } = useParams();
  const [formDatas, setformDatas] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [gender, setGender] = useState("");
  const [submitMessages, setSubmitMessages] = useState([]);
  const [inputEle, setInputEle] = useState(``);

  useEffect(() => {
    fetch(`http://localhost/api/get_form.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setformDatas(data);
        data?.data?.fields[0]?.user_name?.value &&
          setName(data?.data?.fields[0]?.user_name?.value);
        data?.data?.fields[0]?.user_email?.value &&
          setEmail(data?.data?.fields[0]?.user_email?.value);
      });
    fetch("http://localhost/api/submit_form.php")
      .then((res) => res.json())
      .then((data) => {
        setSubmitMessages(data);
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

  const emailLimit = formDatas?.data?.fields[0]?.user_email?.validate?.replace(
    /\D/g,
    ""
  );
  const handleSubmit = (e) => {
    fetch("http://localhost/api/submit_form.php", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        details: details,
        gender: gender,
      }),
    })
      .then((res) => res.json())
      .then((result) => {});
    e.preventDefault();
    if (submitMessages?.status === "success") {
      Swal.fire(
        `${submitMessages?.status}`,
        `${submitMessages?.messages?.join(`\n`)}`,
        "success"
      );
    } else {
      Swal.fire({
        icon: "error",
        title: `${submitMessages?.status}`,
        text: `${submitMessages?.messages}`,
      });
    }
    setName(" ");
    setEmail(" ");
    setDetails(" ");
  };
  const user_hobby = formDatas?.data?.fields[0]?.user_hobby;

  const genInput = () => {
    let genNewIn = inputEle;
    for (let key in user_hobby.repeater_fields) {
      genNewIn =
        genNewIn +
        `<div className="form-group row mb-4">
                  <label className="col-sm-2 col-form-label">
                    ${user_hobby.repeater_fields[key].title}
                  </label>
                  <div className="col-sm-10">
                    <input
                      type=${user_hobby.repeater_fields[key].type}
                      className="form-control"
                      placeholder=""
                      aria-label=""
                      aria-describedby="basic-addon1"
                      required=${user_hobby.repeater_fields[key].required}
             
                    />
                  </div>
                  </div>`;
    }

    setInputEle(genNewIn);
  };
  return (
    <div>
      <div className="container w-50">
        <div>
          <h3 className="text-center">Update Form</h3>
        </div>
        <div className="mt-5">
          <form className="" onSubmit={handleSubmit}>
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
                    {...formDatas?.data?.fields[0]?.user_email.html_attr}
                    type={formDatas?.data?.fields[0]?.user_email?.type}
                    value={email}
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
                      {...formDatas?.data?.fields[0]?.details.html_attr}
                      type={formDatas?.data?.fields[0]?.details?.type}
                      onChange={handleDetails}
                      className="form-control"
                      placeholder=""
                      aria-label=""
                      value={details}
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
                      {...formDatas?.data?.fields[0]?.details.html_attr}
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

            {formDatas?.data?.fields[0]?.user_hobby && (
              <div>
                <img
                  src="https://i.ibb.co/YXTdw4h/icons8-plus-math-50.png"
                  alt="add"
                  onClick={genInput}
                  style={{ marginBottom: "20px", width: "50px" }}
                />

                <div>{parse(inputEle)}</div>
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
