import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../shared";
import { LoginContext } from "../App";
import AddCustomer from "../components/AddCustomer";
import useFetch from "../hooks/UseFetch";

export default function Customer() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  //const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  function toggleShow() {
    setShow(!show);
  }
  const url = baseUrl + "/api/customers/";
  const { data, errorStatus } = useFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "applications/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
  });

  useEffect(() => {
    console.log(data, errorStatus);
  });
  /*
  useEffect(() => {
    const url = baseUrl + "/api/customers/";
    fetch(url, {
      headers: {
        "Content-Type": "applications/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        if (response.status === 404) {
          //redirect to a 404 page
          //render a 404 component in this page
        }
        if (response.status === 401) {
          setLoggedIn(false);
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data.customers);
      });
  }, []);

*/

  function newCustomer(name, industry) {
    /*
    const data = { name: name, industry: industry };
    const url = baseUrl + "/api/customers/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        //assume the add was successful
        //hide the modal

        setCustomers([...customers, data.customer]);
        toggleShow();
        //make sure the list is updated
      })
      .catch((e) => console.log(e));
      */
  }

  return (
    <>
      <h1 className="py-2 text-center mx-auto w-96 shadow rounded">
        Here are our customers:{" "}
      </h1>

      {data?.customers //optional chaining so you don't try to access customer property on undefined.
        ? data.customers.map((customer) => {
            return (
              <div className="m-2">
                <Link to={"/customers/" + customer.id}>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded no-underline">
                    {customer.name}
                  </button>
                </Link>
              </div>
            );
          })
        : null}

      <AddCustomer
        newCustomer={newCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}
