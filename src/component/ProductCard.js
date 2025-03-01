import React, { useState, useEffect } from 'react';

function ProductCard({ product, onAddToCart, onRemoveFromCart }) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = savedCart.find(item => item.title === product.title);
    if (existingProduct) {
      setQuantity(existingProduct.quantity);
    }
  }, [product.title]);

  const updateCart = (newQuantity) => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = savedCart.findIndex(item => item.title === product.title);
    
    if (newQuantity === 0) {
      if (existingProductIndex !== -1) {
        savedCart.splice(existingProductIndex, 1);
      }
    } else {
      if (existingProductIndex !== -1) {
        savedCart[existingProductIndex].quantity = newQuantity;
      } else {
        savedCart.push({ title: product.title, quantity: newQuantity });
      }
    }
    
    localStorage.setItem('cart', JSON.stringify(savedCart));
  };

  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCart(newQuantity);
    onAddToCart(product);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCart(newQuantity);
      onRemoveFromCart(product);
    }
  };

  const handleRatingClick = (event) => {
    // No operation
  };

  return (
    <fieldset className="item" id="product" style={{ marginTop: '18px' }}>
      <center>
        <img src={product.imgSrc} style={{ padding: '0%', borderStyle: 'none' }} alt={product.title} />
        <br />
        <b>{product.title}</b><br />
        <div className="rating">
          {[5, 4, 3, 2, 1].map((star) => (
            <React.Fragment key={star}>
              <input
                type="radio"
                id={`star${star}-${product.title}`}
                name={`rating-${product.title}`}
                value={star}
                checked={product.rating === star}
                onChange={handleRatingClick}
              />
              <label htmlFor={`star${star}-${product.title}`}>★</label>
            </React.Fragment>
          ))}
        </div><br />
        Price: {`$${product.price}.00`}<br />

        {quantity > 0 ? (
          <div>
            <button className="card" onClick={handleRemoveFromCart} style={{ padding: '6px', width: '50px' }}>-</button>
            Quantity: {quantity}
            <button className="card" onClick={handleAddToCart} style={{ padding: '6px', width: '50px' }}>+</button>
          </div>
        ) : (
          <button className="card" onClick={handleAddToCart}>Add To Cart</button>
        )}
      </center>
    </fieldset>
  );
}

export default ProductCard;
