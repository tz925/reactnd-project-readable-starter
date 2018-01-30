import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Post extends Component {
  render(){
    return (
      <div>{this.props.post}</div>
    )
  }
}

export default Post
