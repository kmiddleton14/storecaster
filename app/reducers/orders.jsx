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

const SET_ORDER = 'SET_ORDER', COMPLETE_ORDER = 'COMPLETE_ORDER'
//TODO: const UPDATE_ORDER = 'UPDATE_ORDER'

export const setOrder = order => ({
  type: SET_ORDER,
  order
})

export const resetOrder = () => ({
  type: COMPLETE_ORDER
})

//checks to see if the base and addons passed in already exist as a package; if not then create one and return it otherwise just return the package 
export const createPackageAndAddToCart = (base, extrasArray) => 
  dispatch => 
    axios.post('/api/packages/createWithExtras', {
      base: base, 
      packageType: 'custom', 
      extraIdsArray: extrasArray.map(e => e.id)
    })
    .then(r => r.data)
    .then(pkg => dispatch(createOrder(pkg)))

export const createOrder = (pkg, user_id=null) => 
  dispatch => 
    axios.post('/api/orders/', {
      order: {
        user_id,
        totalPrice: pkg.price, //this will change when we introduce customization options
        status: 'Created'
      },
      package_id: pkg.id //this will change when we introduce customization options
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
