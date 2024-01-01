import './App.css';
import AddProperty from './Pages/AddProperty';
import PropUserView from './Pages/PropUserView';
import Home from './Pages/Home';
import Login from './Pages/Login';
import './main.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/add-property' element={<AddProperty />}></Route>
          <Route path='/view-prop/:id' element={<PropUserView />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
