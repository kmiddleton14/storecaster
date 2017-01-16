import axios from 'axios'

const initialProductsState = {
  currentOrder: [],
  //TODO: for customization user stories
  //when authenticated: userOrders
}

const reducer = (state=initialProductsState, action) => {
  // console.log(action);
  const newState = Object.assign({}, state)

  switch(action.type) {
    case SET_ORDER:
      newState.currentOrder = action.order
      break

    default: 
      return state
    }
    return newState
}

const SET_ORDER = 'SET_ORDER'

export const setOrder = order => ({
  type: SET_ORDER,
  order
})

export const createOrder = (product, user_id=null) => 
  dispatch => //TODO: create package if product supplied is a base; include extras
    axios.post('/api/orders/', {
      order: {
        user_id,
        totalPrice: product.base.basePrice, //this will change when we introduce customization options
        status: 'Created'
      },
      package_id: product.id //this will change when we introduce customization options
    })
    .then(r => r.data.order)
    //r.data is an object with info from the OrderPackage table, with the associated order and package included through eager loading. It looks like this: 
      // { dateScheduled: null,
      // created_at: ...
      // updated_at: ...
      // order_id: ...,
      // package_id: ...,
      // order:
      //  {...},
      // package:
      //  {...} }
    .then(order => dispatch(setOrder(order)))

export default reducer