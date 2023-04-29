import Employee from "../components/Employee";
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";
import "../index.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header";
function Employees() {
  //there are other hooks that we can use to introduce functionality into our components very easily
  //usually hooks are prefixed with 'use'

  //states are different to variables
  //Because the state can be tied to the user interface so that when the 'state' changes the user interface will automatically update w/o a page refresh
  //const [role, setRole] = useState("Developer"); //example of using useState [variable, function to set the variable always prefixed with set..]
  //number one rule of using state: never assign a value to the variable directly
  //YOU ALWAYS GO THROUGH setter
  //HOOK?
  //useState is an example of a hook
  //there are other hooks that we can use to introduce functionality into our components very easily
  //usually hooks are prefixed with 'use'

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Jihun Park",
      role: "Junior Developer",
      img: "https://images.pexels.com/photos/4556737/pexels-photo-4556737.jpeg",
    },
    {
      id: 2,
      name: "Daniel Zas",
      role: "Developer",
      img: "https://images.pexels.com/photos/11140270/pexels-photo-11140270.jpeg",
    },
    {
      id: 3,
      name: "Jihun Park",
      role: "Junior Developer",
      img: "https://images.pexels.com/photos/4556737/pexels-photo-4556737.jpeg",
    },
    {
      id: 4,
      name: "Daniel Zas",
      role: "Developer",
      img: "https://images.pexels.com/photos/11140270/pexels-photo-11140270.jpeg",
    },
    {
      id: 5,
      name: "Jihun Park",
      role: "Junior Developer",
      img: "https://images.pexels.com/photos/4556737/pexels-photo-4556737.jpeg",
    },
    {
      id: 6,
      name: "Daniel Zas",
      role: "Developer",
      img: "https://images.pexels.com/photos/11140270/pexels-photo-11140270.jpeg",
    },
  ]);
  //props are not meant to be changed by child components. Thats why we are passing down this callback function which is invoked in the child component
  function updateEmployee(id, newName, newRole) {
    const updatedEmployees = employees.map((employee) => {
      if (id === employee.id) {
        return { ...employee, name: newName, role: newRole }; //'...employee' this code grabs all the other attribute of the Employee object
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  }
  function newEmployee(name, role, img) {
    let newEmployee = {
      id: uuidv4,
      name: name,
      role: role,
      img: img,
    };
    setEmployees([...employees, newEmployee]);
  }

  //used pexel images for free images
  return (
    <>
      <div className="App bg-gray-300 min-h-screen">
        <div className="flex flex-wrap justify-center my-2">
          {employees.map((employee) => {
            const editEmployee = (
              <EditEmployee
                id={employee.id}
                name={employee.name}
                role={employee.role}
                updateEmployee={updateEmployee}
              />
            );
            return (
              <Employee
                id={employee.id}
                name={employee.name}
                role={employee.role}
                img={employee.img}
                key={uuidv4()}
                editEmployee={editEmployee}
              />
            );
          })}
        </div>
        <AddEmployee newEmployee={newEmployee} />
      </div>
    </>
  );
}

export default Employees;
