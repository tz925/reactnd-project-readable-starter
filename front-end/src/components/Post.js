import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'

class Post extends Component {
  render(){
    console.log(window.location.pathname.substring(12))//post id
    return (
      <Segment>
        
      </Segment>
    )
  }
}

export default Post
