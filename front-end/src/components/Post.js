import React, { Component } from 'react';
import { Segment,Header,Container,Icon,Comment,Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { postPostDetail,postComments,addComment,deletePost,deleteComment } from '../actions/action'
import * as API from '../utils/api'
import sortBy from 'sort-by'
import SortByDropDown from '../components/SortByDropDown'
import CommentModal from './CommentModal'

// 我发现了个小技巧，下次可以试一试：
//
// 如果想将多个 action 导入到你的组件里面，可以考虑用以下的方式来导入
//
// import * as actions from '../actions/action1';
// 添加到组件里面，只需要使用以下的代码：
//
// export default connect(mapStateToProps, actions)(Component);
// 上面代码会把 action 构造器添加上你的组件上面，这会减少很多不必要的代码量

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
    addComment: (data) => dispatch(addComment(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    deleteComment: (data) => dispatch(deleteComment(data))
  }
}
// Post Detail View
// 应该具有编辑或修改帖子的控件
// 应该具有添加新评论的控件
// 按照你想要的方式实现评论（内嵌、模态，等）
// 评论也应该具有修改或删除控件

class Post extends Component {
  componentDidMount(){
    let id = window.location.pathname.substring(7)
    API.getPostDetail(id).then(post => {
      if (!post.id){ //post is empty object-->post is deleted
        // console.log('deleted')
        this.props.history.push('/')
      }else{
        this.props.postPostDetail(post)
      }
    })
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
                <button onClick={event => API.votePost({option: 'upVote'}, post.id).then(post => this.props.postPostDetail(post))}><Icon disabled name='like outline' /></button>
                <button onClick={event => API.votePost({option: 'downVote'},post.id).then(post => this.props.postPostDetail(post))}><Icon disabled name='dislike outline' /></button>
                <button onClick={event => API.deletePost(post.id).then(post => {
                  this.props.deletePost(post)
                  this.props.history.push('/')
                })}><Icon disabled name='delete' /></button>
              </Container>
              <Container textAlign='center'>
                Comments: {post.commentCount}
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
                  <Grid.Column>
                    <span>Vote: {comment.voteScore}</span>
                    <button onClick={event => API.voteComment({option: 'upVote'}, comment.id).then(comment => this.props.addComment(comment))}><Icon disabled name='like outline' /></button>
                    <button onClick={event => API.voteComment({option: 'downVote'},comment.id).then(comment => this.props.addComment(comment))}><Icon disabled name='dislike outline' /></button>
                    <button onClick={event => API.deleteComment(comment.id).then(comment => this.props.deleteComment(comment))}><Icon disabled name='delete' /></button>
                  </Grid.Column>
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
