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
  const {
    request,
    appendData,
    data: { customers } = {},
    //this is done to grab customers propery from data object.
    //Also, had to handle issue of grabbing customers property
    //from data object, data may be undefined until useFetch completes
    //the function. Handled by setting a default value until data object is not undefined
    errorStatus,
  } = useFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
  });

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    //FOR DEBUGGIN
    //console.log(request, appendData, customers, errorStatus);
  });

  function newCustomer(name, industry) {
    appendData({ name: name, industry: industry });
    if (!errorStatus) toggleShow();
  }

  return (
    <>
      <h1 className="py-2 text-center mx-auto w-96 shadow rounded">
        Here are our customers:{" "}
      </h1>

      {customers //optional chaining so you don't try to access customer property on undefined.
        ? customers.map((customer) => {
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
