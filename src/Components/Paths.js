import { useEffect, useState } from "react";
import "./Accordion/Accordion.css";
import GLOBALCONSTANT from "../constant/GLOBALCONSTANT";
import JSONPretty from "react-json-pretty";
var JSONPrettyMon = require("react-json-pretty/dist/monikai");
var jsonxml = require("jsontoxml");

export default function Paths(props) {
  const [path, setPath] = useState([]);
  const [pathSelected, setPathSelected] = useState(null);
  const [flag, setFlag] = useState(true);
  const [change, setChange] = useState("");
  useEffect(() => {
    setPath(props?.path);
  }, [props]);

  const pathToggle = (i) => {
    if (pathSelected === i) {
      return setPathSelected(null);
    }
    setPathSelected(i);
  };

  const getFlag = () => {
    setFlag(!flag);
  };

  const setMethodColor = (method, border, bg) => {
    if (border && bg) {
      return method === GLOBALCONSTANT.POST
        ? "bg-green-" + bg + " border-green-" + border
        : method === GLOBALCONSTANT.PUT
        ? "bg-orange-" + bg + " border-orange-" + border
        : method === GLOBALCONSTANT.GET
        ? "bg-sky-" + bg + " border-sky-" + border
        : "bg-red-" + bg + " border-red-" + border;
    }
    return method === GLOBALCONSTANT.POST
      ? "border-green-" + border
      : method === GLOBALCONSTANT.PUT
      ? "border-orange-" + border
      : method === GLOBALCONSTANT.GET
      ? "border-sky-" + border
      : "border-red-" + border;
  };

  const changeResponse = (event) => {
    setChange(event.target.value);
  };

  return (
    <>
      {Object.entries(path).map((data, i) =>
        Object.entries(data[GLOBALCONSTANT.DATA1])?.map((method, k) =>
          props.tagName.name ===
          method[GLOBALCONSTANT.METHOD1].tags[GLOBALCONSTANT.TAGS] ? (
            <div
              className={`${setMethodColor(
                method[GLOBALCONSTANT.METHOD0],
                "300",
                undefined
              )} border my-2 rounded-lg`}
              key={i}
            >
              <div
                className={`${setMethodColor(
                  method[GLOBALCONSTANT.METHOD0],
                  "300",
                  "200"
                )} flex p-2 text-black rounded-t-lg
                `}
                onClick={() => pathToggle(i)}
              >
                <div>
                  <span
                    className={`${setMethodColor(
                      method[GLOBALCONSTANT.METHOD0],
                      "500",
                      "400"
                    )} border font-bold text-white py-1 px-4 rounded-sm uppercase`}
                  >
                    {method[GLOBALCONSTANT.METHOD0] !== null
                      ? method[GLOBALCONSTANT.METHOD0]
                      : null}
                  </span>

                  <strong className="p-4">{data[GLOBALCONSTANT.DATA0]}</strong>
                  <span>{method[GLOBALCONSTANT.METHOD1].summary}</span>
                </div>
                <span>{pathSelected === i ? "-" : "+"}</span>
              </div>
              <div
                className={
                  pathSelected === i
                    ? `${setMethodColor(
                        method[GLOBALCONSTANT.METHOD0],
                        "300",
                        "200"
                      )} content show rounded-b-lg`
                    : `${setMethodColor(
                        method[GLOBALCONSTANT.METHOD0],
                        "300",
                        "200"
                      )} content hide rounded-b-lg`
                }
              >
                <div className="flex bg-white text-black p-4 shadow-md">
                  <div>{GLOBALCONSTANT.PARAMETERS}</div>
                  <div
                    className="border-black border-2 p-1 rounded-sm"
                    onClick={() => getFlag()}
                  >
                    {flag ? GLOBALCONSTANT.TRY : GLOBALCONSTANT.CANCEL}
                  </div>
                </div>
                <div className="text-black px-2">
                  <table className="table-auto text-left">
                    <thead>
                      <tr>
                        <th className="w-20 ">{GLOBALCONSTANT.NAME}</th>
                        <th>{GLOBALCONSTANT.DESCRIPTION}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {method[GLOBALCONSTANT.METHOD1].parameters.length <= 1 ? (
                        <tr>
                          <td className="w-20">
                            <p>
                              <b>
                                {
                                  method[GLOBALCONSTANT.METHOD1]?.parameters[
                                    GLOBALCONSTANT.PARAM0
                                  ]?.name
                                }
                              </b>
                              <small className="text-red-900">
                                <sup>
                                  {method[GLOBALCONSTANT.METHOD1]?.parameters[
                                    GLOBALCONSTANT.PARAM0
                                  ]?.name !== undefined
                                    ? GLOBALCONSTANT.REQUIRED
                                    : null}
                                </sup>
                              </small>
                            </p>
                            &nbsp;
                          </td>
                          <td>
                            <small>
                              {method[GLOBALCONSTANT.METHOD1]?.summary}
                            </small>
                            <p>
                              <small>
                                {method[GLOBALCONSTANT.METHOD1]?.description ===
                                ""
                                  ? method[GLOBALCONSTANT.METHOD1]?.parameters[
                                      GLOBALCONSTANT.PARAM0
                                    ]?.description
                                  : method[GLOBALCONSTANT.METHOD1]?.description}
                              </small>
                            </p>
                            {method[GLOBALCONSTANT.METHOD1]?.parameters[
                              GLOBALCONSTANT.PARAM0
                            ]?.type === GLOBALCONSTANT.STRING ||
                            method[GLOBALCONSTANT.METHOD1]?.parameters[
                              GLOBALCONSTANT.PARAM0
                            ]?.type === GLOBALCONSTANT.INTEGER ? (
                              <div>
                                <small>
                                  <input
                                    type="text"
                                    className="p-0"
                                    value={
                                      method[GLOBALCONSTANT.METHOD1]
                                        ?.parameters[GLOBALCONSTANT.PARAM0]
                                        ?.type
                                    }
                                    disabled="true"
                                  />
                                </small>
                              </div>
                            ) : method[GLOBALCONSTANT.METHOD1]?.parameters[
                                GLOBALCONSTANT.PARAM0
                              ]?.type === GLOBALCONSTANT.FILE ? (
                              <div>
                                <p>
                                  <small>
                                    <input
                                      type="file"
                                      className="p-0"
                                      id="file"
                                      name="file"
                                      accept="image/png, image/jpeg"
                                      disabled="true"
                                    />{" "}
                                  </small>
                                </p>
                              </div>
                            ) : method[GLOBALCONSTANT.METHOD1]?.parameters[
                                GLOBALCONSTANT.PARAM0
                              ]?.type === GLOBALCONSTANT.ARRAY ? (
                              <textarea
                                disabled="true"
                                value={"[ "+ Object.keys(
                                  method[GLOBALCONSTANT.METHOD1]?.parameters[
                                    GLOBALCONSTANT.PARAM0
                                  ]
                                )+" ]"}
                              ></textarea>
                            ) : (
                              <div className="overflow-hidden w-96">
                                {change === GLOBALCONSTANT.SELECTEDRESPONSE ? (
                                  <div className="bg-black text-white">
                                    {jsonxml(
                                      method[GLOBALCONSTANT.METHOD1]
                                        ?.parameters[GLOBALCONSTANT.PARAM0],
                                      true
                                    )}
                                  </div>
                                ) : (
                                  <JSONPretty
                                    id="json-pretty"
                                    className="overflow-hidden"
                                    theme={JSONPrettyMon}
                                    data={
                                      method[GLOBALCONSTANT.METHOD1]
                                        ?.parameters[GLOBALCONSTANT.PARAM0]
                                    }
                                  ></JSONPretty>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ) : (
                        method[GLOBALCONSTANT.METHOD1].parameters.map((p) => (
                          <tr>
                            <td>
                              <small>
                                {p.name + " (" + p.type + ")"}
                                <small className="text-red-900">
                                  <sup>{GLOBALCONSTANT.REQUIRED}</sup>
                                </small>
                              </small>
                              &nbsp;
                            </td>
                            <td>
                              <small>
                                {method[GLOBALCONSTANT.METHOD1]?.summary}
                              </small>
                              <p>
                                <small>{p.description}</small>
                              </p>
                              {p.type === GLOBALCONSTANT.STRING ||
                              p.type === GLOBALCONSTANT.INTEGER ? (
                                <div>
                                  <small>
                                    <input
                                      type="text"
                                      className="p-0"
                                      value={p.type}
                                      disabled="true"
                                    />
                                  </small>
                                </div>
                              ) : p.type === GLOBALCONSTANT.FILE ? (
                                <div>
                                  <small>
                                    <input
                                      type="file"
                                      className="p-0"
                                      id="file"
                                      name="file"
                                      accept="image/png, image/jpeg"
                                      disabled="true"
                                    />{" "}
                                  </small>
                                </div>
                              ) : p.type === GLOBALCONSTANT.BODY ? (
                                <div>
                                  <div className="border-2 border-black p-4">
                                    {""}
                                  </div>
                                </div>
                              ) : p.type === GLOBALCONSTANT.ARRAY ? (
                                GLOBALCONSTANT.ARRAY ? (
                                  <p>
                                    <textarea disabled="true"></textarea>
                                  </p>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex self-center bg-white text-black my-2 py-2">
                  <div className="m-auto ">
                    <p>{GLOBALCONSTANT.PARAMETER_CONTENT_TYPE}</p>
                    <select
                      onChange={changeResponse}
                      className="w-46 border-solid border-2 border-zinc-500 "
                    >
                      {method[GLOBALCONSTANT.METHOD1]?.produces.map((v, i) => (
                        <option value={v} key={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex text-black mt-8 px-2">
                  <div>{GLOBALCONSTANT.RESPONSE} </div>
                  <div className="">
                    {GLOBALCONSTANT.RESPONSE_CONTENT_TYPE}
                    <select className="w-46 border-solid border-2 border-zinc-500 ">
                      {method[GLOBALCONSTANT.METHOD1]?.produces.map((v, i) => (
                        <option value={v} key={i}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <hr />
                <div className="text-black p-2 ">
                  <table className="table-auto w-100 text-left">
                    <thead className="border-collapse">
                      <tr>
                        <th className="w-20">{GLOBALCONSTANT.CODE}</th>
                        <th>{GLOBALCONSTANT.DESCRIPTION}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(
                        method[GLOBALCONSTANT.METHOD1]?.responses
                      ).map((v, i) =>
                        v.map((d, j) => (
                          <tr>
                            <td className="w-20">
                              {d.description ? v[0] : null} &nbsp;
                            </td>
                            <td>{d.description}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null
        )
      )}
    </>
  );
}
