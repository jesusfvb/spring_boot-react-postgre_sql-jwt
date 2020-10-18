import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Container, Row } from 'react-bootstrap'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Users from './components/Users'
import Ubicacion from './components/Ubicacion'
import Cuarteleria from './components/Cuarteleria'
import Guardia from './components/Guardia'

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
         <BrowserRouter>
            <Container fluid >
               <Row>
                  <NavBar Error={this.Error} Success={this.Success} />
               </Row>
               <Row>
                  <Switch>
                     <Route path="/" exact component={Home} />
                     <Route path="/usuarios" exact render={() => <Users Error={this.Error} Success={this.Success} />} />
                     <Route path="/cuarteleria" exact render={() => <Cuarteleria Error={this.Error} Success={this.Success} />} />
                     <Route path="/ubicacion" exact render={() => <Ubicacion Error={this.Error} Success={this.Success} />} />
                     <Route path="/guardia" exact render={() => <Guardia Error={this.Error} Success={this.Success} />} />
                  </Switch>
               </Row>
               <Row>
                  {/* Aqui va el Footer */}
               </Row>
               <div id="containerAlert">
                  {this.state.alerts}
               </div>
            </Container>
         </BrowserRouter>
      )

   }
}
export default App