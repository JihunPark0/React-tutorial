import Employee from './components/Employee';
import './App.css';

function App() {
  return (
    <div className="App">
      <Employee name="Jihun" role="Junior Developer"/>
      <Employee name="Daniel" role="Junior Developer"/>
      <Employee />
      <Employee />
      <Employee />
    </div>
  );
}

export default App;
