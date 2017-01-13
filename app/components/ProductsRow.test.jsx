import React from 'react'
import chai, {expect} from 'chai'                                                   
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'

import ProductsRow from './ProductsRow'

describe('<ProductsRow />', () => {
  let root
  beforeEach('render the root', () =>
    root = shallow(<ProductsRow />)
  )

})