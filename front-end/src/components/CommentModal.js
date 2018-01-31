import React, { Component } from 'react';
import { Segment,Header,Container,Icon,Comment,Form,Button,Grid } from 'semantic-ui-react'

class CommentModal extends Component {
  render() {
    if (this.props.mode === 'create'){
      return <div>create modal</div>
    }else{
      return <div>edit</div>
    }
  }
}


export default CommentModal
