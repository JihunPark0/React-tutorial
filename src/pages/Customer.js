import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const navigate = useNavigate();
  const [notFound, setNotfound] = useState();

  const url = baseUrl + "/api/customers/" + id;
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          //redirect to a 404 page
          //navigate("/404");
          //or
          // render a 404 component in this page
          setNotfound(true);
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
      });
  }, []);
  return (
    <>
      {notFound ? <NotFound id={id} /> : null}
      {customer ? (
        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.industry}</p>
        </div>
      ) : null}
      <Link to="/customers">Go back to customers</Link>
    </>
  );
}
