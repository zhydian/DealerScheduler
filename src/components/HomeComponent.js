import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux';

class Home extends Component {   
    render(){
        return(<Container>
            <Row>
                <Col>
                    This inlcudes:
                    <ul>
                        <li>Firebase</li>
                        <li>Redux</li>
                        <li>Reactstrap</li>
                    </ul>
                </Col>
            </Row>
            
            </Container>)
    }
}


const mapStateToProps = state => {
    return {
    }
}



export default connect(mapStateToProps,null) (Home)