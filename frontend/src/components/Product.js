import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Store } from '../Store';
import { useState } from 'react';


function Product(props) {
   const { product, productQuantitySolds } = props;

   const { state, dispatch: ctxDispatch } = useContext(Store);
   const {
      cart: { cartItems },
      isEnglish,
   } = state;

   // let [isOutOfStock, setIsCountInStock] = useState(false)
   let isOutOfStock = false

   for (let i = 0; i < productQuantitySolds.length; i++) {
      if (product.name == productQuantitySolds[i]._id) {
         if (!(product.countInStock > productQuantitySolds[i].quantity)) {
            isOutOfStock = true
         }
      }
   }


   const addToCartHandler = async (item) => {
      const existItem = cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${item._id}`);
      if (data.countInStock < quantity) {
         window.alert('Sorry. Product is out of stock');
         return;
      }
      ctxDispatch({
         type: 'CART_ADD_ITEM',
         payload: { ...item, quantity },
      });
   };

   return (
      <Card>
         <Link to={`/product/${product.slug}`}>
            <img src={product.image} className="card-img-top" alt={product.name} />
         </Link>
         <Card.Body>
            <Link to={`/product/${product.slug}`}>
               <Card.Title>{product.name}</Card.Title>
            </Link>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Card.Text>${product.price}</Card.Text>
            {(product.countInStock === 0 || isOutOfStock) ? (
               <Button variant="primary" disabled>
                  {/* Out of stock */}
                  {isEnglish ? 'Out of stock' : 'Tạm hêt hàng'}
               </Button>
            ) : (
               <Button onClick={() => addToCartHandler(product)}>
                  {isEnglish ? 'Add to cart' : 'Thêm vào giở hàng'}
               </Button>
            )}
         </Card.Body>
      </Card>
   );
}
export default Product;
