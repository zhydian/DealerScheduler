import React, { Component } from 'react'
import { Route, Switch,Redirect } from "react-router";
import Home from './HomeComponent'
import RoadMap from './RoadMapComponent'
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
      addShiftsToFirebase()
    }

    Home =() => <Home/>
    RoadMap = (props)=> <RoadMap day={props.match.params.day}/>
    render() {
        return (
            <div>
              <Header />
            <Switch location={this.props.location}>
              <Route path='/home' component={this.Home} />
              <Route path='/roadmap/:day' component={this.RoadMap} />
              <Redirect to="/home" />
            </Switch>
            </div>
        )
    }
}

export default Main