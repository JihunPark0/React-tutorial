import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Customer() {
  const [customers, setCustomers] = useState();
  useEffect(() => {
    console.log("fetching");
    fetch("http://127.0.0.1:8000/api/customers/")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.customers);
      });
  }, []);
  return (
    <>
      <h1 className="py-2 text-center mx-auto w-96 shadow rounded">
        Here are our customers:{" "}
      </h1>
      {customers
        ? customers.map((customer) => {
            return (
              <p className="py-2 text-center mx-auto w-96 shadow rounded">
                <Link to={"/customers/" + customer.id}>{customer.name}</Link>
              </p>
            );
          })
        : null}
    </>
  );
}
