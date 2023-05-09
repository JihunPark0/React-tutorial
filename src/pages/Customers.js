import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";
export default function Customer() {
  const [customers, setCustomers] = useState();
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
    </>
  );
}
