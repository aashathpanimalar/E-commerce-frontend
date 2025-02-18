import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Category from './component/Category';
import Products, { products } from './component/Products';
import Footer from './component/Footer';
import Cart, { TotalCostContext } from './component/Cart';
import Address from './component/Address';
import Payment from './component/Payment';

function App() {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || {});

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const newCart = { ...prevItems, [product.title]: (prevItems[product.title] || 0) + 1 };
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) => {
      const newCart = { ...prevItems };
      if (newCart[product.title] > 1) {
        newCart[product.title] -= 1;
      } else {
        delete newCart[product.title];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  // Calculate total cost here
  const cartItemsArray = Object.entries(cartItems).map(([title, quantity]) => {
    const product = products.find(product => product.title === title);
    return {
      title,
      quantity,
      imgSrc: product?.imgSrc || 'default_image.jpg',
      price: product?.price || 0,
      rating: product?.rating || 0
    };
  });

  const totalCost = cartItemsArray.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <TotalCostContext.Provider value={totalCost}>

      <Router>
        <div>
          <div id="root"></div>
          <fieldset id="main">
            <fieldset id="main2">
              <Routes>
                {/* <Route path='/login' element={<Login />} /> */}
                <Route
                  path="/"
                  element={
                    <>
                      <Navbar cartItemCount={Object.values(cartItems).reduce((a, b) => a + b, 0)} />
                      <div id="body1">
                        <Category />
                        <Products onAddToCart={handleAddToCart} cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
                      </div>
                      <fieldset id="foot">
                        <Footer />
                      </fieldset>
                    </>
                  }
                />
                <Route
                  path="/cart"
                  element={<Cart cartItems={cartItems} products={products} onRemoveFromCart={handleRemoveFromCart} />}
                />
                <Route
                  path="/address"
                  element={<Address />}
                />
                <Route
                  path="/payment"
                  element={<Payment />}
                />
              </Routes>
            </fieldset>
          </fieldset>
        </div>
      </Router>
    </TotalCostContext.Provider>
  );
}

export default App;
