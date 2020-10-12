import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Container, Row } from 'react-bootstrap'
import InputAutocompletar from './helpers/InputAutocompletar'

import NavBar from './components/NavBar'
// import Home from './components/Home'
// import Users from './components/Users'
// import Ubicacion from './components/Ubicacion'
// import Cuarteleria from './components/Cuarteleria'
// import Guardia from './components/Guardia'

class App extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         alerts: []
      }
      this.Error = this.Error.bind(this)
      this.Success = this.Success.bind(this)
   }
   Error(mensaje = "") {
      let pivote = this.state.alerts
      pivote.push(
         <Alert className="pl-2 w-25" key={pivote.length} name="alert" variant="danger" style={{ position: "fixed", bottom: 0 + (pivote.length * 60), right: 10 }}>
            Error: {mensaje}
         </Alert>
      )
      this.setState({ alerts: pivote }, () => {
         setTimeout(() => {
            let pivote = this.state.alerts
            pivote.pop()
            this.setState({ alerts: pivote })
         }, 5000)
      })
   }
   Success(mensaje = "") {
      let pivote = this.state.alerts
      pivote.push(
         <Alert className="pl-2 w-25" key={pivote.length} name="alert" variant="success" style={{ position: "fixed", bottom: 0 + (pivote.length * 60), right: 10 }}>
            OK: {mensaje}
         </Alert>
      )
      this.setState({ alerts: pivote }, () => {
         setTimeout(() => {
            let pivote = this.state.alerts
            pivote.pop()
            this.setState({ alerts: pivote })
         }, 5000)
      })
   }
   render() {
      return (
         <Container fluid >
            <Row>
               <NavBar />
            </Row>
            <Row>
               {/* <Home/> */}
               {/* <Users Error={this.Error}  Success={this.Success}/> */}
               {/* <Cuarteleria Error={this.Error}  Success={this.Success}/> */}
               {/* <Ubicacion Error={this.Error}  Success={this.Success}/> */}
               {/* <Guardia Error={this.Error}  Success={this.Success}/> */}
            </Row>
            <Row>
               {/* Aqui va el Footer */}
            </Row>
            <div id="containerAlert">
               {this.state.alerts}
            </div>
         </Container>
      )

   }
}
export default App