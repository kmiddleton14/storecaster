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

    case COMPLETE_ORDER:
      //When order is completed, current order returns back to empty (after database is updated)
      newState.currentOrder = []

    default:
      return state
    }
    return newState
}

const SET_ORDER = 'SET_ORDER'
//TODO: const UPDATE_ORDER = 'UPDATE_ORDER'
const COMPLETE_ORDER = 'COMPLETE_ORDER'

export const setOrder = order => ({
  type: SET_ORDER,
  order
})

export const resetOrder = () => ({
  type: COMPLETE_ORDER
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

export const completeOrder = (orderId, dateScheduled, user_id=null) =>
  dispatch =>
    axios.put(`/api/orders/${orderId}`, {
      status: 'Completed',
      user_id
    })
    .then(r => {
      return axios.put(`/api/orders/orderpackage/${orderId}`, {
        dateScheduled
      })
    })
    .then(r => r.data.order)
    .then(order => dispatch(resetOrder()))
    .catch(err => console.log("Something went wrong with order completion!", err))

export default reducer
