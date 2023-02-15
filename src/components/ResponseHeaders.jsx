import React, { useContext } from "react";
import { ReceivedResponse } from "../App";

function ResponseHeaders() {
  const receivedResponse = useContext(ReceivedResponse);

  function EmptyResponseHeaders() {
    return (
      <div className="row gy-2">
        <div className="col-3 fs-5">-</div>
        <div className="col-1">:</div>
        <div className="col-8 fs-5">-</div>
      </div>
    );
  }

  function ResponseHeadersData() {
    const keys = Object.keys(receivedResponse.response.headers);

    return keys.map((key, index) => {
      return (
        <div className="row gy-2" key={index}>
          <div className="col-3">{key}</div>
          <div className="col-1">:</div>
          <div className="col-8">{receivedResponse.response.headers[key]}</div>
        </div>
      );
    });
  }

  function ResponseHeadersContent() {
    /* console.log(receivedResponse) */
    return receivedResponse.response.headers === undefined ? (
      <EmptyResponseHeaders />
    ) : (
      <ResponseHeadersData />
    );
  }

  return (
    <div className="container-md px-3 pb-3">
      <div className="row">
        <ResponseHeadersContent />
      </div>
    </div>
  );
}

export default ResponseHeaders;
