import React, { Component } from 'react';
import { Form,Button,Modal } from 'semantic-ui-react'
import serializeForm from 'form-serialize'
import * as util from '../utils/utils'
import { connect } from 'react-redux'
import {addPost} from '../actions/action'
import * as API from '../utils/api'

function mapStateToProps (state) {
  let {categories} = state
  return {
    categories: categories
  }
}
function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data))
  }
}
class PostModal extends Component {
  state={
    title: this.props.post ? this.props.post.title : null,
    body: this.props.post ? this.props.post.body : null
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const values = serializeForm(event.target, { hash: true })
    values['timestamp'] = Date.now()
    console.log(values)
    if (this.props.mode === 'create'){
      values['id'] = util.uuid()
      values['category'] = window.localStorage.getItem('tempvalue')
      API.postPost(values).then(post => this.props.addPost(post))
    }else{
      const {id} = this.props.post
      API.updatePost(values,id).then(post => this.props.addPost(post))
    }
  }
  handleTitle = (value) => {
    this.setState({
      title: value
    })
  }
  handleBody = (value) => {
    this.setState({
      body: value
    })
  }
  render() {
    let options = this.props.categories.map(cat => {
      return {key: cat.name, text: cat.name, value: cat.name}
    })
    console.log(options);
    if(this.props.mode === 'create'){
      return (
        <Modal trigger={<Button>New Post</Button>}>
          <Modal.Header>New Post</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input label="Title" name='title' />
              <Form.Input label="Body" name='body' />
              <Form.Input label="Author" name='author' />
              <Form.Field control={Form.Select} fluid label='Category' onChange={(event,data) => {
                window.localStorage.setItem('tempvalue', data.value)
              }} name='category' options={options} />
              <Button type='submit' primary>Create</Button>
            </Form>
          </Modal.Content>
        </Modal>
      )
    }else{
      let {post} = this.props
      return (
        <Modal trigger={<Button>Edit Post</Button>}>
          <Modal.Header>Edit Post</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                label="Title"
                name='title'
                value={this.state.title}
                onChange={e => this.handleTitle(e.target.value)} />
              <Form.Input label="Body"
                name='body'
                value={this.state.body}
                onChange={e => this.handleBody(e.target.value)}
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
)(PostModal)
