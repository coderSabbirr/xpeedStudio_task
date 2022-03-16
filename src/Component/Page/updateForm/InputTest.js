import parse from "html-react-parser";
import React, { useState } from "react";
const InputTest = () => {
  const [inputEle, setInputEle] = useState(``);

  const user_hobby = {
    title: "Work",
    type: "repeater",
    repeater_fields: {
      work_place: {
        title: "Work place",
        type: "text",
        required: true,
        validate: "only_letters",
      },
      designation: {
        title: "Designation",
        type: "text",
        required: true,
      },
      asdsasdasnation: {
        title: "sdfgnation",
        type: "text",
        required: true,
      },
    },
  };
  console.log(user_hobby);
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
      <div>{parse(inputEle)}</div>
      <button onClick={genInput}>GenInput</button>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
};

export default InputTest;
