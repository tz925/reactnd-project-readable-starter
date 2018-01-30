import React, { Component } from 'react';
import * as API from '../utils/api'
import { connect } from 'react-redux'
import {postAllCategories} from '../actions/action'
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
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
      <BrowserRouter>
        <div className='app'>
          <Menu>
            <Menu.Item
              as={Link}
              to='/'
              key='all'
              name='all' />
            {categories && categories.map(cate =>
              (<Menu.Item
                as={Link}
                to={'/'+ cate.path}
                key={cate.name}
                name={cate.name} />)
            )}
          </Menu>
          <Switch>
            <Route exact path='/' render={() => (
              <div>HOME</div>
            )}/>
            {categories && categories.map(cate =>
            (<Route path={'/'+cate.path} key={cate.name} render={() => (
              <div>{cate.name}</div>
            )}/>))}
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
