import React, { Component } from 'react';
import * as API from '../utils/api'
import { connect } from 'react-redux'
import {postPosts, addPost,deletePost} from '../actions/action'
import {Link} from 'react-router-dom'
import { Segment,List,Grid,Icon} from 'semantic-ui-react'
import {dayPast} from '../utils/utils'
import SortByDropDown from '../components/SortByDropDown'
import sortBy from 'sort-by'
import PostModal from './PostModal'

function mapStateToProps (state) {
  let {posts} = state
  return {
    posts: Object.keys(posts).map(key => posts[key])//get posts from redux
  }
}
function mapDispatchToProps (dispatch) {
  return {
    postPosts: (data) => dispatch(postPosts(data)),
    addPost: (data) => dispatch(addPost(data)),
    deletePost: (data) => dispatch(deletePost(data)),
  }
}

class PostList extends Component {
  componentDidMount(){
    if(this.props.category){
      //get specific post of category
      // console.log('有cate');
      API.getCategoryPosts(this.props.category).then(posts => this.props.postPosts(posts.sort(sortBy('-voteScore'))))
    }else{
      //get all posts
      // console.log('没cate');
      API.getAllPosts().then(posts => this.props.postPosts(posts.sort(sortBy('-voteScore'))))//send posts to redux
    }
  }
  render(){
    let { posts,postPosts } = this.props
    function sortByOnSelect(value){
      posts.sort(sortBy('-'+value))//add '-' to sort from biggest to smallest
      postPosts(posts)
    }
    return (
      <Segment>
        <SortByDropDown onSelect={sortByOnSelect} />
        <PostModal mode='create'/>
        <List celled>
          {posts && posts.map(post => {
            let des = dayPast(post.timestamp)
            return(
            <List.Item key={post.id}>
              <Grid  >
                <Grid.Row>
                  <Grid.Column as={Link} to={'/'+ post.category +'/'+post.id} width={8}>
                    <List.Content>
                      <List.Header>{post.title}</List.Header>
                      <List.Description>{des}</List.Description>
                    </List.Content>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <PostModal post={post} />
                  </Grid.Column>
                  <Grid.Column>
                    Votes: {post.voteScore}
                    <button onClick={event => API.votePost({option: 'upVote'}, post.id).then(post => this.props.addPost(post))}><Icon disabled name='like outline' /></button>
                    <button onClick={event => API.votePost({option: 'downVote'},post.id).then(post => this.props.addPost(post))}><Icon disabled name='dislike outline' /></button>
                    <button onClick={event => API.deletePost(post.id).then(post => this.props.deletePost(post))}><Icon disabled name='delete' /></button>
                  </Grid.Column>
                  <Grid.Column>
                    <span>Comments: {post.commentCount}</span>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </List.Item>
          )})}
        </List>
      </Segment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
