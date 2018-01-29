import React, { Component } from 'react';
import * as API from '../utils/api'
import { connect } from 'react-redux'
import {postAllCategories} from '../actions/action'
import { Route } from 'react-router-dom'
function mapDispatchToProps (dispatch) {
  return {
    postAllCategories: (data) => dispatch(postAllCategories(data))
  }
}

class App extends Component {
  componentDidMount(){
    API.getAllCategories().then(value => {
      console.log(value)
      let initialCategories = value
      return initialCategories
      //呼叫dispatch(postAllCategories)
    })
  }
  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <div>helloworld</div>
        )}/>
      </div>
    )
  }
}

export default App;
