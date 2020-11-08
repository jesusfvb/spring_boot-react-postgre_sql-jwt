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
import Loggin from './components/Loggin'
class App extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         alerts: [],
         loggin: false,
         username: undefined,
         rol: undefined
      }
      this.Error = this.Error.bind(this)
      this.Success = this.Success.bind(this)
      this.Autenticarse = this.Autenticarse.bind(this)
      this.Salir = this.Salir.bind(this)
   }
   componentDidMount() {
      if (this.state.loggin === false) {
         let Jwt = window.sessionStorage.getItem("Jwt");
         if (!(Jwt === undefined || Jwt === null)) {
            var jwt = require('jsonwebtoken');
            let sub = jwt.decode(Jwt).sub;
            this.setState({ loggin: true, username: sub.substring(0, sub.indexOf("ROLE")), rol: sub.substring(sub.indexOf("ROLE"), sub.length) })
         }
      }
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
   Autenticarse(Jwt) {
      window.sessionStorage.setItem("Jwt", Jwt)
      var jwt = require('jsonwebtoken');
      let sub = jwt.decode(Jwt).sub;
      this.setState({ loggin: true, username: sub.substring(0, sub.indexOf("ROLE")), rol: sub.substring(sub.indexOf("ROLE"), sub.length) })
   }
   Salir() {
      window.sessionStorage.clear()
      this.setState({ loggin: false })
   }
   render() {
      if (!this.state.loggin) {
         return (
            <Loggin onAutenticarse={this.Autenticarse} />
         )
      } else {
         return (
            <BrowserRouter>
               <Container fluid >
                  <Row>
                     <NavBar Error={this.Error} Success={this.Success} Salir={this.Salir} userName={this.state.username} rol={this.state.rol} />
                  </Row>
                  <Row>
                     <Switch>
                        <Route path="/" exact render={() => <Home rol={this.state.rol} />} />
                        {(this.state.rol === "ROLE_ADMINISTRADOR") ?
                           <Route path="/usuarios" exact render={() => <Users Error={this.Error} Success={this.Success} rol={this.state.rol} />} />
                           : ""}
                        {(this.state.rol === "ROLE_ADMINISTRADOR" || this.state.rol === "ROLE_VICDECEXTENCION" || this.state.rol === "ROLE_INTRUCTURA" || this.state.rol === "ROLE_ESTUDIANTE") ?
                           <Route path="/cuarteleria" exact render={() => <Cuarteleria Error={this.Error} Success={this.Success} rol={this.state.rol} userName={this.state.username} />} />
                           : ""}
                        {(this.state.rol === "ROLE_ADMINISTRADOR" || this.state.rol === "ROLE_DRRECIDENCE" || this.state.rol === "ROLE_VICDECEXTENCION" || this.state.rol === "ROLE_ESTUDIANTE") ?
                           < Route path="/ubicacion" exact render={() => <Ubicacion Error={this.Error} Success={this.Success} rol={this.state.rol} />} />
                           : ""}
                        {(this.state.rol === "ROLE_ADMINISTRADOR" || this.state.rol === "ROLE_VICDECEXTENCION" || this.state.rol === "ROLE_PROFESOR" || this.state.rol === "ROLE_ESTUDIANTE") ?
                           < Route path="/guardia" exact render={() => <Guardia Error={this.Error} Success={this.Success} rol={this.state.rol} userName={this.state.username} />} />
                           : ""}
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
}
export default App