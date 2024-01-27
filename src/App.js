import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import AddProduct from './component/addProduct';
import OrderProduct from './component/orderProduct';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addProduct" element={<AddProduct/>} />
          <Route path="/orderProduct" element={<OrderProduct/>} />


        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
