import logo from './logo.svg';
import './App.css';
import Lists from './components/Lists'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/users/:status?" element={<Lists/>}/>
          <Route path="/" element={<Navigate to="/users/all" />} />
          {/* <Route path="/create-user" element={<CreateUSer/>}/> */}
          {/* <Route path='/edit-user/:id?' element={<EditUser/>}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
