import React from 'react'
import chai, {expect} from 'chai'                                                   
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'

import Products from './Products'

describe('<Products />', () => {
	let root
	beforeEach('render the root', () =>
	  root = shallow(<Products />)
	)
})