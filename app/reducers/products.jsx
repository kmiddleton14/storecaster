import axios from 'axios'

const initialProductsState = {
  packages: [],
  bases: [],
  extras: [],
  selectedPackage: {},
  selectedBase: {} //TODO: for customization user stories
}

const reducer = (state=initialProductsState, action) => {
  // console.log(action);
  const newState = Object.assign({}, state)

  switch(action.type) {
    case RECEIVE_BASES:
      newState.bases = action.weatherbases
      break

    case RECEIVE_PACKAGES:
      newState.packages = action.packages
      break 

    case RECEIVE_EXTRAS:
      newState.extras = action.weatherextras
      break 

    case RECEIVE_PRODUCT:
      action.selectedProduct.category 
      ? newState.selectedBase = action.selectedProduct
      : newState.selectedPackage = action.selectedProduct
      break 

    default: 
      return state
    }
    return newState
}

const RECEIVE_BASES = 'RECEIVE_BASES', RECEIVE_PACKAGES = 'RECEIVE_PACKAGES', RECEIVE_PRODUCT = 'RECEIVE_PRODUCT', RECEIVE_EXTRAS = 'RECEIVE_EXTRAS'

export const receiveExtras = weatherextras => ({
  type: RECEIVE_EXTRAS,
  weatherextras
})

export const receiveBases = weatherbases => ({
  type: RECEIVE_BASES,
  weatherbases
})

export const receivePackages = packages => ({
  type: RECEIVE_PACKAGES,
  packages
})

export const receiveProduct = selectedProduct => ({
  type: RECEIVE_PRODUCT,
  selectedProduct
})

export const pickProduct = selectedProduct => 
  dispatch => 
    dispatch(receiveProduct(selectedProduct))

export const loadAllProducts = () => 
  dispatch => 
    Promise.all([
      axios.get('/api/weatherbases'),
      axios.get('/api/packages'),
      axios.get('/api/weatherextras'),
    ])
      .then(responses => responses.map(r => r.data))
      .then(([weatherbases, packages, weatherextras]) => {
        dispatch(receiveBases(weatherbases))
        dispatch(receivePackages(packages))
        dispatch(receiveExtras(weatherextras))
      })

export default reducer