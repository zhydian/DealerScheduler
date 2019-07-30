import React, { Component } from 'react'
import { Route, Switch,Redirect } from "react-router";
import Home from './HomeComponent'
import { AddDealersToFirebase,addShiftsToFirebase } from '../functions/ScheduleFunctions'

function Header (props) {
    return(
       
    <div className="sticky-top header">

    </div>
    )
}

class Main extends Component {

    componentDidMount(){
      if(false){
        AddDealersToFirebase()
      }
      addShiftsToFirebase(false)
    }

    Home =() => <Home/>
    render() {
        return (
            <div>
              <Header />
            <Switch location={this.props.location}>
              <Route path='/home' component={this.Home} />
              <Redirect to="/home" />
            </Switch>
            </div>
        )
    }
}

export default Main