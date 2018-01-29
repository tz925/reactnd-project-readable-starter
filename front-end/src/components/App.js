import React, { Component } from 'react';
import * as API from '../utils/api'
import { connect } from 'react-redux'
import {postAllCategories} from '../actions/action'
import { Route, Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

function mapStateToProps (state) {
  let {category} = state
  return {
    categories: category
  }
}
function mapDispatchToProps (dispatch) {
  return {
    postAllCategories: (data) => dispatch(postAllCategories(data))
  }
}

class App extends Component {
  componentDidMount(){
    API.getAllCategories().then(value => {
      this.props.postAllCategories(value)//value is array of categories
    }).catch(error => console.log(error))
  }

  render() {
    let categories = this.props.categories
    return (
      <div className='app'>
        <Menu>
          {categories && categories.map(cate =>
            (<Menu.Item
              as={Link}
              to={cate.path}
              key={cate.name}
              name={cate.name}
              >{cate.name}</Menu.Item>)
          )}
        </Menu>
        <Route exact path='/' render={() => (
          <div>rooute</div>
        )}/>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
