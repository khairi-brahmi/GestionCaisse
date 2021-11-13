import React, { Component, useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import jwt from 'jwt-decode'
const Login = () => {
  setTimeout((()=> localStorage.removeItem("new")),6000)
  let url="http://localhost:8000/auth/login/"
  const [mob, setMob] = useState("")
  const [err, setErr] = useState(false)

  const [pwd, setPwd] = useState("")
  async function SubmitLogin() {
    let data={
 
      "username":mob.toString(),
      "password":pwd.toString()
  
  }

    await axios.post(url,data)
      .then((response) => {
        console.log(response)
          if (response.data.access) {
            const user = jwt(response.data.access); 
            localStorage.setItem("token", JSON.stringify({token:response.data}));
          
              localStorage.setItem("user", JSON.stringify(user));
         
              window.location.replace('/')
          }
      })
      .catch(()=>(setErr(true)))
  }
  

    return (
      <div className="login">
 
        <br/>  <br/>  <br/>
          <h2>Se Connecter</h2>
          <br/>
          {localStorage.getItem("new")?
           <Alert style={{textAlign:"center"}} severity="success">Votre compte a été créé avec succès! Merci de se connecter</Alert>
           :
           null
          }
         
          <br/>
          <div className="username">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
             // value={this.state.email}
            //  onChange={this.update}
            onChange={(e) => setMob(e.target.value)}
              name="Mobile"
            />
          </div>

          <div className="password">
            <input
              type="password"
              placeholder="Mot de passe..."
            //  value={this.state.password}
            onChange={(e) => setPwd(e.target.value)}
              name="password"
            />
          </div>
          <Button onClick={()=>SubmitLogin()} variant="contained" color="primary">
          Se Connecter</Button>
       
     <br/>    
     <br/> 
     {err?
      <Alert severity="error">Votre Mot de passe Ou Nom d'utilisateur est Incorrecte!</Alert>
      :
      null
     }
    
     <br/>

        <Link to="/register">Creér un compte</Link> <br/>     <Link to="/"> Page d'accueil  </Link>
        <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/> <br/> 
      </div>
      );
    };
    

export default Login;
