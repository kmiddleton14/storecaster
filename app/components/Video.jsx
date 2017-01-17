import React from 'react';
import ReactDOM from 'react-dom';
const { Component } = React;
import { Link } from 'react-router';



const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
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

export default class Video extends Component {
  render() {
    return (
      <div>
        <div className="video-background">
            <div className="video-foreground">
              <iframe src="https://www.youtube.com/embed/GquEnoqZAK0?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=GquEnoqZAK0" frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>

        <div id="vidtop-content">
        <div className="vid-info">
            <h1>Your current weather is 40 degrees and raining</h1>
            <h2>.....but it doesn't have to be</h2>
            <Link to='/products'>
              <button className='btn btn-default' type='button'>Change your weather</button>
            </Link>
           
          </div>
        </div>
      </div>
    );
  }
}