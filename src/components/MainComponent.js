import React, { Component } from 'react'
import { Route, Switch,Redirect } from "react-router";
import { Jumbotron } from 'reactstrap'
import { getUsers, getSchedules } from '../redux/ActionCreators'
import Home from './HomeComponent'
import { connect } from 'react-redux';

function Header (props) {
    return(
       
    <div className="sticky-top header">

    </div>
    )
}

class Main extends Component {

    componentDidMount(){
        this.props.getUsers();
    }

    render() {
        
        return (
            <div>
              <Header />
            <Switch location={this.props.location}>
              <Route path='/home' component={Home} />
              <Redirect to="/home" />
            </Switch>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUsers: () => dispatch(getUsers())
})

const mapStateToProps = state => {
    return {
        Users:state.Users
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main)