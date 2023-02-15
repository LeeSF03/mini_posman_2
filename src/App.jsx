import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import QueryParamsContent from "./components/QueryParamsContent";
import ReqHeaderContent from "./components/ReqHeaderContent";
import JsonContent from "./components/JsonContent";
import Response from "./Response";

export const ReceivedResponse = React.createContext();

function App() {
  const refUrl = useRef(null);
  const refMethod = useRef(null);
  const [activeTab, setActiveTab] = useState("query-params-tab");
  const [axiosResponse, setAxiosResponse] = useState({});
  const [axiosError, setAxiosError] = useState({});
  const [delay, setDelay] = useState(null);

  function changeTab(e) {
    setActiveTab(e.target.id);
  }

  useEffect(() => {
    switch (activeTab) {
      case "query-params-tab":
        $("#r, #j").hide(10);
        $("#q").fadeIn("fast");
        break;
      case "request-header-tab":
        $("#q, #j").hide(10);
        $("#r").fadeIn("fast");
        break;
      case "json-tab":
        $("#q, #r").hide(10);
        $("#j").fadeIn("fast");
        break;
      default:
        $("#r, #j").hide(10);
        $("#q").fadeIn("fast");
        break;
    }
    /* console.log(activeTab) */
  });

  var configParams;
  var configHeaders;
  var configData;

  function getParams(params) {
    return (configParams = params);
  }

  function getHeaders(headers) {
    return (configHeaders = headers);
  }

  function getData(data) {
    try {
      configData = JSON.parse(data);
    } catch (e) {
      configData = null;
    }
    /* console.log(data)
    console.log(configData) */
  }

  function fetchAxiosReq(event) {
    event.preventDefault();
    let sTime = new Date().getTime();

    /* console.log(refUrl.current.value, refMethod.current.value, configParams, configHeaders); */
    /* console.log(configData) */

    axios({
      url: refUrl.current.value,
      method: refMethod.current.value,
      params: configParams,
      headers: configHeaders,
      data: configData,
    })
      .then((response) => {
        setDelay(new Date().getTime() - sTime);
        /* console.log(response) */
        setAxiosResponse(response);
        setAxiosError({});
        return response;
      })
      .catch((err) => {
        setDelay(new Date().getTime() - sTime);
        /* console.log(err) */
        setAxiosResponse({});
        setAxiosError(err.response);
      });
  }

  return (
    <div className="">
      <div className="m-5 d-flex justify-content-center">
        {/**URL input field, methos selection and send button */}
        <form
          action=""
          name="url"
          onSubmit={fetchAxiosReq}
          style={{ minWidth: "", maxWidth: "720px", width: "720px" }}
        >
          <div className="input-group">
            <select
              name="method"
              className="form-select flex-grow-0 w-auto"
              defaultValue={"GET"}
              ref={refMethod}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              require="true"
              type="url"
              placeholder="https://url.com"
              className="form-control"
              ref={refUrl}
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>

          {/**Query params, header and json tabs and content*/}
          <div data-body>
            {/**Tabs */}
            <div className="mt-4">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item active" role="presentation">
                  <button
                    className={`nav-link ${activeTab == "query-params-tab" ? "active" : ""
                      }`}
                    type="button"
                    role="tab"
                    id="query-params-tab"
                    onClick={changeTab}
                  >
                    Query Params
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab == "request-header-tab" ? "active" : ""
                      }`}
                    type="button"
                    role="tab"
                    id="request-header-tab"
                    onClick={changeTab}
                  >
                    Headers
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab == "json-tab" ? "active" : ""
                      }`}
                    type="button"
                    role="tab"
                    id="json-tab"
                    onClick={changeTab}
                  >
                    JSON
                  </button>
                </li>
              </ul>
            </div>

            {/**Display Tab Content */}
            <div className="border rounded-bottom border-top-0 px-3">
              <div className="tab-content pt-3">
                <div id="q">
                  <QueryParamsContent getParams={getParams} />
                </div>
                <div id="r" style={{ display: "none" }}>
                  <ReqHeaderContent getHeaders={getHeaders} />
                </div>
                <div id="j" style={{ display: "none" }}>
                  <JsonContent getData={getData} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="m-5 d-flex justify-content-center">
        <div style={{ minWidth: "", maxWidth: "720px", width: "720px" }}>
          <ReceivedResponse.Provider
            value={{ response: axiosResponse, error: axiosError, time: delay }}
          >
            <Response />
          </ReceivedResponse.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
