//custom hook to reduce lines of repeated code
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export default function useFetch(url, { method, headers, body } = {}) {
  //assign a default empty object if object is not passed in
  const [data, setData] = useState();
  const [errorStatus, setErrorStatus] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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
  }, []);

  return { data, errorStatus }; // short hand of doing this: return { data: data, errorStatus: errorStatus };
}
