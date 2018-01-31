import React, { Component } from 'react';
import { Form,Button,Modal } from 'semantic-ui-react'
import serializeForm from 'form-serialize'
import * as util from '../utils/utils'
import { connect } from 'react-redux'
import {addComment} from '../actions/action'
import * as API from '../utils/api'
function mapStateToProps (state) {
  // let {tempComment} = state
  return {
    // tempComment: tempComment,
  }
}
function mapDispatchToProps (dispatch) {
  return {
    addComment: (data) => dispatch(addComment(data)),
    // commentEdit: (data) => dispatch(commentEdit(data))
  }
}
class CommentModal extends Component {
  // componentDidMount(){
  //   if(this.props.mode === 'edit'){
  //     this.props.commentEdit(this.props.comment.body)
  //   }
  // }
  handleSubmit = (event) => {
    event.preventDefault()
    const values = serializeForm(event.target, { hash: true })
    values['timestamp'] = Date.now()
    if (this.props.mode === 'create'){
      values['parentId'] = this.props.parentId
      values['id'] = util.uuid()
      API.postComment(values).then(comment => this.props.addComment(comment))
    }else{
      const {id} = this.props.comment
      API.updateComment(values,id).then(comment => this.props.addComment(comment))
    }
  }
  render() {
    if(this.props.mode === 'create'){
      return (
        <Modal trigger={<Button>New Comment</Button>}>
          <Modal.Header>New Comment</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input label="Body" name='body' />
              <Form.Input label="Author" name='author' />
              <Button type='submit' primary>Create</Button>
            </Form>
          </Modal.Content>
        </Modal>
      )
    }else{
      let {comment} = this.props
      return (
        <Modal trigger={<Button>Edit Comment</Button>}>
          <Modal.Header>Edit Comment</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input label="Body"
                name='body'
                // value={tempComment}
                // onChange={event => commentEdit(event.target.value)}
              />
              <Button type='submit' primary>Update</Button>
            </Form>
          </Modal.Content>
        </Modal>
      )
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentModal)
