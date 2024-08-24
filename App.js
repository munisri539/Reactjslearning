import './App.css';
import ChildSingle from './ChildSingle';

// import BankAccount from './BankAccount';
// import FParent from './FParent';
// import Parent from './Parent';
// import ArrayMapList from './ArrayMapList';
// import ArrayMapTable from './ArrayMapTable';

// import Employee from './Employee';


function App() {
  const name = "Sumathi";
  const num = 20;

  return (
    <div className='App'>
      <ChildSingle passData={name} passData1={num}></ChildSingle>

      {/* <Employee /> */}
      {/* <BankAccount /> */}
      {/* <Parent /> */}
      {/* <FParent /> */}
      {/* <ArrayMapList /> */}
      {/* <ArrayMapTable /> */}

    </div>
  );
}

export default App;
