import Employee from './components/Employee';
import './index.css';
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

function App() {
//there are other hooks that we can use to introduce functionality into our components very easily
//usually hooks are prefixed with 'use'

//states are different to variables
//Because the state can be tied to the user interface so that when the 'state' changes the user interface will automatically update w/o a page refresh
const [role, setRole] = useState('Developer');//example of using useState [variable, function to set the variable always prefixed with set..]
//number one rule of using state: never assign a value to the variable directly
//YOU ALWAYS GO THROUGH setter
//HOOK?
//useState is an example of a hook
//there are other hooks that we can use to introduce functionality into our components very easily
//usually hooks are prefixed with 'use'

const [employees, setEmployees] = useState(
  [
    {id: 1,name: "Jihun Park", role:"Junior Developer", img: "https://images.pexels.com/photos/4556737/pexels-photo-4556737.jpeg"},
    {id: 2,name:"Daniel Zas", role:"Developer", img:"https://images.pexels.com/photos/11140270/pexels-photo-11140270.jpeg"},
    {id: 3,name: "Jihun Park", role:"Junior Developer", img: "https://images.pexels.com/photos/4556737/pexels-photo-4556737.jpeg"},
    {id: 4,name:"Daniel Zas", role:"Developer", img:"https://images.pexels.com/photos/11140270/pexels-photo-11140270.jpeg"},
    {id: 5,name: "Jihun Park", role:"Junior Developer", img: "https://images.pexels.com/photos/4556737/pexels-photo-4556737.jpeg"},
    {id: 6,name:"Daniel Zas", role:"Developer", img:"https://images.pexels.com/photos/11140270/pexels-photo-11140270.jpeg"}
  ]
);

function updateEmployee(id, newName, newRole){
  const updatedEmployees = employees.map((employee)=>{
    if(id === employee.id)
    {
      return {...employee, name: newName, role:newRole} //'...employee' this code grabs all the other attribute of the Employee object
    }
    return employee;
  });
  setEmployees(updatedEmployees);
}

 //used pexel images for free images
  return (
    <div className="App">
      <div className="flex flex-wrap justify-center"> 
        {employees.map((employee)=>{return <Employee id={employee.id} name={employee.name} role={employee.role} img={employee.img} key={uuidv4()} updateEmployee={updateEmployee}/>})}
      </div>
    </div>
  );
}

export default App;
