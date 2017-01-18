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
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

export default ({ items=[], selectItem }) => 
    <div>
    <h3>Choose any weather addons</h3>
    <MuiThemeProvider>
      <div style={styles.root}>
        <GridList
          cellHeight={400}
          style={styles.gridList}
          cols={2.2}
        >



         {
          items.map(item => (
            // <li key={item.id} onClick={() => selectItem(item)}>
            //   {
            //     item.category && 
            //     <div><h1>{item.category}</h1></div>
            //   }
            <Link key={item.id} onClick={() => selectItem(item)}>
              <GridTile
                key={item.id}
                title={item.name}
                subtitle={item.description}
                actionIcon={<AddToCart />}
              >
                <img src={item.imageURL} />
              </GridTile>
            </Link>
          ))
        }
        </GridList>
      </div>
    </MuiThemeProvider>
    </div>