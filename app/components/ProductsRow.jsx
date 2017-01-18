import React from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import AddToCart from 'material-ui/svg-icons/action/add-shopping-cart';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 900,
    overflowY: 'auto',
  },
};

export default ({ products=[], pickProduct }) => 
    <div>
      <MuiThemeProvider>
        <div style={styles.root}>
            <GridList
              cellHeight={400}
              style={styles.gridList}
            >
             {
              products.map(product => (
                <Link key={product.id} to={`/selectedproduct`} onClick={() => pickProduct(product)}>
                  <GridTile
                    key={product.id}
                    title={product.name}
                    subtitle={product.description}
                    actionIcon={<AddToCart />}
                  >
                    <img src={product.imageURL} />
                  </GridTile>
                </Link>
              ))
            }
          </GridList>
        </div>
      </MuiThemeProvider>
    </div>







    