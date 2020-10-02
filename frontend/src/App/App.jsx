import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap'

import NavBar from './Components/NavBar'
// import Home from './Components/Home'
import Users from './Components/Users'

class App extends React.Component {

   render() {
      return (
         <Container fluid>
            <Row>
               <NavBar/>
            </Row>
            <Row>
               {/* <Home/> */}
               <Users/>
           </Row>
               <Row>
                  {/* Aqui va el Footer */}
               </Row>
        </Container>
      )
   }
}
export default App