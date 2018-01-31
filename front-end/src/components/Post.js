import React, { Component } from 'react';
import { Segment,Header,Container,Icon,Comment,Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { postPostDetail,postComments } from '../actions/action'
import * as API from '../utils/api'
import sortBy from 'sort-by'
import SortByDropDown from '../components/SortByDropDown'
import CommentModal from './CommentModal'

function mapStateToProps (state) {
  let post = state.postDetail
  let comments = state.comments
  return {
    post: post,//get postDetail from redux
    comments: Object.keys(comments).map(key => comments[key]),
  }
}
function mapDispatchToProps (dispatch) {
  return {
    postPostDetail: (data) => dispatch(postPostDetail(data)),
    postComments: (data) => dispatch(postComments(data)),
  }
}
// Post Detail View
// 应该具有编辑或修改帖子的控件
// 应该具有添加新评论的控件
// 按照你想要的方式实现评论（内嵌、模态，等）
// 评论也应该具有修改或删除控件

class Post extends Component {
  componentDidMount(){
    let id = window.location.pathname.substring(12)
    API.getPostDetail(id).then(post => this.props.postPostDetail(post))
    API.getComments(id).then(comments => this.props.postComments(comments.sort(sortBy('-voteScore'))))
  }
  render(){
    let {post,comments,postComments} = this.props
    function sortByOnSelect(value){
      comments.sort(sortBy('-'+value))//add '-' to sort from biggest to smallest
      postComments(comments)
    }
    return (
      <div>
        <Segment>
          {post && (
            <div>
              <Header as='h2' textAlign='center'>
                {post.title}
                <Header.Subheader>
                  {post.author} {(new Date(post.timestamp)).toLocaleString()}
                </Header.Subheader>
              </Header>
              <Container textAlign='center'>
                Votes: {post.voteScore}
                <button onClick={event => console.log('liked')}><Icon disabled name='like outline' /></button>
                <button onClick={event => console.log('disliked')}><Icon disabled name='dislike outline' /></button>
              </Container>
              <Container textAlign='center'>
                {post.body}
              </Container>
            </div>
          )}
        </Segment>
        <Comment.Group>
          <Header as='h3' dividing>Comments</Header>
          <SortByDropDown onSelect={sortByOnSelect} />
          <CommentModal mode="create" parentId={post.id}/>
          {comments && comments.map(comment => (
            <Comment key={comment.id}>
              <Grid  >
                <Grid.Row>
                  <Grid.Column width={9}>
                    <Comment.Content>
                      <Comment.Author >{comment.author}</Comment.Author>
                      <Comment.Metadata>
                        <div>{new Date(comment.timestamp).toLocaleString()}</div>
                      </Comment.Metadata>
                      <Comment.Text>{comment.body}</Comment.Text>
                    </Comment.Content>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <CommentModal mode="edit" comment={comment} />
                  </Grid.Column>
                  <Grid.Column><span>Vote: {comment.voteScore}</span></Grid.Column>
                </Grid.Row>
              </Grid>
            </Comment>
          ))}
        </Comment.Group>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
