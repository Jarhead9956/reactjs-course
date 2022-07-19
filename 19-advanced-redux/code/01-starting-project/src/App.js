import { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { uiActions } from './store/ui-slice'; 
import { cartActions } from './store/cart-slice'; 

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification'

let isInitial = true

function App() {
  const dispatch = useDispatch()
  const cartIsVisible = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    fetch('https://educationdb-97121.firebaseio.com/cart.json')
      .then(resposne => resposne.json())
      .then(data=> {
        dispatch(cartActions.fetchItemsFromDatabase(data))
      })
      .catch(error => {
        dispatch(uiActions.showNotifications({
          status: 'error',
          message: 'Fething cart data failed!',
          title: 'Error'
        }))
      })
  }, [dispatch])
  
  useEffect(() => {

    if(isInitial) {
      isInitial = false
      return
    }

    if(cart.changed) {
      dispatch(uiActions.showNotifications({
        status: 'pending',
        message: 'Sending cart data!',
        title: 'Sending...'
      }))
    
      fetch('https://educationdb-97121.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
      })
      .then(response => response.json())
      .then(data => {
        
        dispatch(uiActions.showNotifications({
          status: 'success',
          message: 'Sending cart data successfully!',
          title: 'Success!'
        }))

      })
      .catch(e => {
          dispatch(uiActions.showNotifications({
            status: 'error',
            message: 'Sending cart data failed!',
            title: 'Error!'
          }))
      })
    }
    
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && <Notification 
        status = {notification.status} 
        title = {notification.title}
        message = {notification.message}
      />}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
