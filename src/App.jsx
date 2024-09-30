import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import CreateProduct from './Pages/CreateProduct';
import Footer from './Components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
     <BrowserRouter>
     <div>
      <Navbar />
     </div>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<CreateProduct />} />
     </Routes>
     {/* <div>
      <Footer />
     </div> */}
     </BrowserRouter>
      
    </div>
  );
};

export default App;