import React, { Component } from 'react';
import * as API from '../utils/api'
import { connect } from 'react-redux'
import {postPosts} from '../actions/action'
import {Link} from 'react-router-dom'
import { Segment,List} from 'semantic-ui-react'
import {dayPast} from '../utils/utils'
import SortByDropDown from '../components/SortByDropDown'
import sortBy from 'sort-by'

function mapStateToProps (state) {
  let {post} = state
  return {
    posts: Object.keys(post).map(key => post[key])//get posts from redux
  }
}
function mapDispatchToProps (dispatch) {
  return {
    postPosts: (data) => dispatch(postPosts(data))
  }
}

class PostList extends Component {
  componentDidMount(){
    if(this.props.category){
      //get specific post of category
      // console.log('有cate');
      API.getCategoryPosts(this.props.category).then(posts => this.props.postPosts(posts))
    }else{
      //get all posts
      // console.log('没cate');
      API.getAllPosts().then(posts => this.props.postPosts(posts))//send posts to redux
    }
  }
  render(){
    let { posts,postPosts } = this.props
    function sortByOnSelect(value){
      posts.sort(sortBy(value))
      postPosts(posts)
    }
    return (
      <Segment>
        <SortByDropDown onSelect={sortByOnSelect} />
        <List celled>
          {posts && posts.map(post => {
            let des = dayPast(post.timestamp)
            return(
            <List.Item as={Link} to={'/postdetail/'+post.id} key={post.id}>
              <List.Content>
                <List.Header>{post.title}</List.Header>
                <List.Description>{des}</List.Description>
              </List.Content>
            </List.Item>)})}
        </List>
      </Segment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
