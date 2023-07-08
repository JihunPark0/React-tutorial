import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";

export default function Customer() {
  const { id } = useParams();

  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();
  const [notFound, setNotfound] = useState();
  const url = baseUrl + "/api/customers/" + id;

  useEffect(() => {
    // console.log("customer: ", customer);
    // console.log("tempCustomer: ", tempCustomer);
    // console.log(changed);
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
        } else if (response.status === 401) {
          navigate("/login");
        }
        if (!response.ok) {
          console.log(response);
          //catch all for errors that are not 200 through to 299
          throw new Error("Something went wrong, try again later");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);
  function updateCustomer(e) {
    e.preventDefault();
    const url = baseUrl + "/api/customers/" + id;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        //console.log(response);
        if (!response.ok) throw new Error("Something went wrong");
        return response.json();
      })
      .then((data) => {
        //success case
        //this data should be the new customer state
        setCustomer(data.customer);
        //to allow persistent layer is reflected on the state variable
        setChanged(false);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  function handleDelete() {
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
        setError(e.message);
      });
  }
  return (
    <>
      {notFound ? <NotFound id={id} /> : null}
      <div className="p-3">
        {customer ? (
          <div>
            <form
              className="w-full max-w-sm"
              id="customer"
              onSubmit={updateCustomer}
            >
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/4">
                  <label for="name">Name</label>
                </div>

                <div class="md:w-3/4">
                  <input
                    id="name"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    value={tempCustomer.name}
                    onChange={(e) => {
                      setTempCustomer({
                        ...tempCustomer,
                        name: e.target.value,
                      });
                      setChanged(true);
                    }}
                  />
                </div>
              </div>

              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/4">
                  <label for="industry">Industry</label>
                </div>

                <div class="md:w-3/4">
                  <input
                    id="industry"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    value={tempCustomer.industry}
                    onChange={(e) => {
                      setTempCustomer({
                        ...tempCustomer,
                        industry: e.target.value,
                      });
                      setChanged(true);
                    }}
                  />
                </div>
              </div>
            </form>
            {changed ? (
              <div className="mb-2">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => {
                    setTempCustomer({ ...customer });
                    setChanged(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  form="customer"
                >
                  Save
                </button>
              </div>
            ) : null}
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        ) : null}
        {error ? <p>{error}</p> : null}
        <Link to="/customers">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded no-underline mt-5">
            ← Go back
          </button>
        </Link>
      </div>
    </>
  );
}
