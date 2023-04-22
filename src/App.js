import Employee from './components/Employee';
import './index.css';
import {useState} from 'react'


function App() {
//states are different to variables
//Because the state can be tied to the user interface so that when the 'state' changes the user interface will automatically update w/o a page refresh
const [role, setRole] = useState('dev');//example of using useState [variable, function to set the variable always prefixed with set..]
//number one rule of using state: never assign a value to the variable directly
//YOU ALWAYS GO THROUGH setter
//HOOK?
//useState is an example of a hook
//there are other hooks that we can use to introduce functionality into our components very easily
//usually hooks are prefixed with 'use'
const showEmp = true;
  return (
    <div className="App">
      {showEmp ? (
        <>
          <input type='text' onChange={(e)=>{
            console.log(e.target.value);
            setRole(e.target.value);
            }}/>
          <Employee name="Jihun" role="Junior Developer"/>
          <Employee name="Daniel" role={role}/>
          <Employee />
          <Employee />
          <Employee />
        </>
      ) : (
        <p>You can't see the employees</p>
      )}
    </div>
  );
}

export default App;
