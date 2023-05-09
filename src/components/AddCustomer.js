import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddCustomer(props) {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="m-2 block mx-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        + Add Customer
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setName("");
              setIndustry("");
              props.newCustomer(name, industry);
            }}
            id="editmodel"
            class="w-full max-w-sm"
          >
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="name"
                >
                  Name
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="FarmSafe"
                />
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="industry"
                >
                  Industry
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="industry"
                  type="text"
                  value={industry}
                  onChange={(e) => {
                    setIndustry(e.target.value);
                  }}
                  placeholder="Agriculture"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
            form="editmodel"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AddCustomer;
