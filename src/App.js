
import './App.css';
import RegistrationForm from './components/Form';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import userReducer from './components/DataStore/Reducer';
import UserTable from './components/Table/UserDataTable';

const store = createStore(userReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
function App() {
  return (
    <>
   
    <Provider store={store}>
      <div>
      <RegistrationForm/><br></br>
        <UserTable />
      </div>
    </Provider>
    </>
  );
}

export default App;
