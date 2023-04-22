import Employee from './components/Employee';
import './index.css';
import {useState} from 'react'


function App() {
//states are different to variables
//Because the state can be tied to the user interface so that when the 'state' changes the user interface will automatically update w/o a page refresh
const [role, setRole] = useState('Developer');//example of using useState [variable, function to set the variable always prefixed with set..]
//number one rule of using state: never assign a value to the variable directly
//YOU ALWAYS GO THROUGH setter
//HOOK?
//useState is an example of a hook
//there are other hooks that we can use to introduce functionality into our components very easily
//usually hooks are prefixed with 'use'
const showEmp = true;

 //used pexel images for free images
  return (
    <div className="App">
      {showEmp ? (
        <>
          <div className="flex flex-wrap justify-center"> 
            <Employee name="Jihun" role="Junior Developer" img="https://images.pexels.com/photos/4556737/pexels-photo-4556737.jpeg"/>
            <Employee name="Daniel" role={role} img="https://images.pexels.com/photos/11140270/pexels-photo-11140270.jpeg"/>
            <Employee name="Jihun" role="Junior Developer" img="https://images.pexels.com/photos/4556737/pexels-photo-4556737.jpeg"/>
            <Employee name="Daniel" role={role} img="https://images.pexels.com/photos/11140270/pexels-photo-11140270.jpeg"/>
            <Employee name="Jihun" role="Junior Developer" img="https://images.pexels.com/photos/4556737/pexels-photo-4556737.jpeg"/>
            <Employee name="Daniel" role={role} img="https://images.pexels.com/photos/11140270/pexels-photo-11140270.jpeg"/>

          </div>
        </>
      ) : (
        <p>You can't see the employees</p>
      )}
    </div>
  );
}

export default App;
