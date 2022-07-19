import { useSelector } from 'react-redux'

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const itemsInCart = useSelector(state => state.cart.items)
  let cartIsEmpty = true

  if(itemsInCart.length > 0) {
    cartIsEmpty = false
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {cartIsEmpty && <p>No items in shopping cart</p>}
      {!cartIsEmpty && 
        <ul>
          {itemsInCart.map((product) => {
            return <CartItem
            key={product.id}
            item={{ 
              title: product.name,
              quantity: product.quantity,
              total: product.totalPrice,
              price: product.price,
              id: product.id
            }}
          />
            })}
        </ul>
      }  
    </Card>
  );
};

export default Cart;
