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
  }
}
class CommentModal extends Component {
  state = {
    body: this.props.comment ? this.props.comment.body : null
  }
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
  handleChange = (value) => {
    this.setState({
      body: value
    })
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
              <Form.Input autoFocus label="Body"
                name='body'
                value = {this.state.body}
                onChange = {event => this.handleChange(event.target.value)}
                // ref={input => this.textInput = input}
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
