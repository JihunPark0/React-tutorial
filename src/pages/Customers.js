import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";
export default function Customer() {
  const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  useEffect(() => {
    fetch(baseUrl + "/api/customers/")
      .then((response) => {
        if (response.status === 404) {
          //redirect to a 404 page
          //render a 404 component in this page
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data.customers);
      });
  }, []);
  function newCustomer(name, industry) {
    const data = { name: name, industry: industry };
    const url = baseUrl + "/api/customers/";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        console.log(data);
        setCustomers([...customers, data.customer]);
        toggleShow();
        //make sure the list is updated
      })
      .catch((e) => console.log(e));
  }
  return (
    <>
      <h1 className="py-2 text-center mx-auto w-96 shadow rounded">
        Here are our customers:{" "}
      </h1>
      <ul>
        {customers
          ? customers.map((customer) => {
              return (
                <li key={customer.id}>
                  <Link to={"/customers/" + customer.id}>{customer.name}</Link>
                </li>
              );
            })
          : null}
      </ul>
      <AddCustomer
        newCustomer={newCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}
