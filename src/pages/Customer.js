import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";

export default function Customer() {
  const { id } = useParams();

  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [changed, setChanged] = useState(false);

  const navigate = useNavigate();
  const [notFound, setNotfound] = useState();
  const url = baseUrl + "/api/customers/" + id;

  useEffect(() => {
    console.log("customer: ", customer);
    console.log("tempCustomer: ", tempCustomer);
    console.log(changed);
  });

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
        setTempCustomer(data.customer);
      });
  }, []);
  function updateCustomer() {
    const url = baseUrl + "/api/customers/" + id;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //success case
        //this data should be the new customer state
        setCustomer(data.customer);
        //to allow persistent layer is reflected on the state variable
        setChanged(false);
        console.log(data);
      })
      .catch(() => {});
  }

  return (
    <>
      {notFound ? <NotFound id={id} /> : null}
      {customer ? (
        <div>
          <input
            className="block m-2 px-2"
            type="text"
            value={tempCustomer.name}
            onChange={(e) => {
              setTempCustomer({ ...tempCustomer, name: e.target.value });
              setChanged(true);
            }}
          />
          <input
            className="block m-2 px-2"
            type="text"
            value={tempCustomer.industry}
            onChange={(e) => {
              setTempCustomer({ ...tempCustomer, industry: e.target.value });
              setChanged(true);
            }}
          />
          {changed ? (
            <>
              <button
                onClick={() => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button onClick={updateCustomer}>Save</button>
            </>
          ) : null}
        </div>
      ) : null}
      <button
        onClick={(e) => {
          const url = baseUrl + "/api/customers/" + id;
          fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Something went wrong");
              }
              //assume things went well
              navigate("/customers");
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        Delete
      </button>
      <br />
      <Link to="/customers">Go back to customers</Link>
    </>
  );
}
