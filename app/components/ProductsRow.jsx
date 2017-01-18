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
    width: 1200,
    overflowY: 'auto',
    borderRadius: 20,
  },
  gridTile: {
    borderRadius: 20,
    padding: 20,
  }
};

export default ({ products=[], pickProduct }) => 
    <div>
      <MuiThemeProvider>
        <div style={styles.root}>
            <GridList
              cellHeight={400}
              style={styles.gridList}
              cols={3}
              padding={20}
            >
             {
              products.map(product => (
                <Link key={product.id} to={`/selectedproduct`} onClick={() => pickProduct(product)}>
                  <GridTile
                    key={product.id}
                    title={product.name}
                    subtitle={product.description}
                    actionIcon={<AddToCart />}
                    style={styles.gridTile}
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







    