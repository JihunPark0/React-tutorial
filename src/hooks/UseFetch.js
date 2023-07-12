//custom hook to reduce lines of repeated code
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export default function useFetch(url, { method, headers, body } = {}) {
  //assign a default empty object if object is not passed in
  const [data, setData] = useState();
  const [errorStatus, setErrorStatus] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  function request() {
    fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((e) => {
        setErrorStatus(e);
      });
  }
  function appendData(newData) {
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((d) => {
        const submitted = Object.values(d)[0];

        const newState = { ...data };
        Object.values(newState)[0].push(submitted);
        setData(newState); //STATE CHANGE
      })
      .catch((e) => {
        console.log(e);
        setErrorStatus(e);
      });
  }

  return { request, appendData, data, errorStatus }; // short hand of doing this: return { data: data, errorStatus: errorStatus };
}
