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
              <iframe src="https://www.youtube.com/embed/SAvLtVXzXZc?controls=0&showinfo=0&rel=0&autoplay=1&loop=1" frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>

        <div id="vidtop-content">
        <div className="vid-info">
            <h1>Your current weather is 40 degrees and raining</h1>
            <h2>.....but it doesn't have to be</h2>
            <Link to='/products'>
              <button type='button'><h3>Change your weather</h3></button>
            </Link>
           
          </div>
        </div>
      </div>
    );
  }
}