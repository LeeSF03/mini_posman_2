import React, { useState, useEffect } from "react";

function ReqHeaderContent(props) {
  const [rows, setRow] = useState([{ key: "", value: "", index: 0 }]);

  function addKeyValuePair() {
    setRow((prevRow) => [
      ...rows,
      { key: "", value: "", index: prevRow[prevRow.length - 1].index + 1 },
    ]);
  }

  function deleteKeyValuePair(rowIndex) {
    const newRows = rows.filter((row) => row.index != rowIndex);
    setRow(newRows);
  }

  function handleKey(rowEvent, rowInput) {
    const inputIndex = rows.findIndex((row) => row.index == rowInput.index);
    const newRows = [...rows];
    newRows[inputIndex].key = rowEvent.target.value;
    setRow(newRows);
  }

  function handleValue(rowEvent, rowInput) {
    const inputIndex = rows.findIndex((row) => row.index == rowInput.index);
    const newRows = [...rows];
    newRows[inputIndex].value = rowEvent.target.value;
    setRow(newRows);
  }

  function getHeaderConfig() {
    const headers = [...rows];
    const headerForReq = headers.reduce((returnedHeader, header) => {
      return header.key === ""
        ? returnedHeader
        : { ...returnedHeader, [header.key]: header.value };
    }, {});
    /*console.log(headerForReq)*/
    props.getHeaders(headerForReq);
    return headerForReq;
  }

  useEffect(() => {
    /*console.log(rows)*/
    getHeaderConfig();
  });

  return (
    <div
      className="tab-pane show"
      id="request-header"
      role="tabpanel"
      aria-labelledby="request-header-tab"
    >
      <div data-request-header-body className="">
        <div
          data-request-header
          className="overflow-auto"
          style={{ maxHeight: "300px" }}
        >
          {rows.map((row) => {
            return (
              <div key={row.index}>
                <div data-key-value-pair className="input-group mb-3">
                  <input
                    type="text"
                    data-key
                    className="form-control"
                    placeholder="Key"
                    onChange={(event) => handleKey(event, row)}
                  />
                  <input
                    type="text"
                    data-value
                    className="form-control"
                    placeholder="Value"
                    onChange={(event) => handleValue(event, row)}
                  />
                  {rows.length != 1 ? (
                    <button
                      id={`rmv-btn-${row.index}`}
                      type="button"
                      data-remove-button
                      className="btn btn-danger"
                      onClick={() => deleteKeyValuePair(row.index)}
                    >
                      <img
                        src="/img/remove32.png"
                        alt="Remove"
                        className=""
                        style={{ width: "25px", height: "23px" }}
                      />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        data-add-header-btn
        className="btn btn-success mb-3 mt-2"
        type="button"
        onClick={addKeyValuePair}
      >
        Add
      </button>
    </div>
  );
}

export default ReqHeaderContent;
