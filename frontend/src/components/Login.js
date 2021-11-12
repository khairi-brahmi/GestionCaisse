import React, { Component, useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Divider } from "@material-ui/core";
const Login = () => {
  setTimeout((()=> localStorage.removeItem("new")),6000)
  let url="http://localhost:8080/api/login/user"
  const [mob, setMob] = useState("")
  const [err, setErr] = useState(false)

  const [pwd, setPwd] = useState("")
  async function SubmitLogin() {
    let data={
 
      "mobile":mob.toString(),
      "password":pwd.toString()
  
  }

    await axios.post(url,data)
      .then((response) => {
        
          if (response.data.token) {
  
              localStorage.setItem("user", JSON.stringify({
                  token: response.data.token,
                  user: response.data.user_profile_details
              }));
         
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
              placeholder="Numéro téléphone"
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
      <Alert severity="error">Votre Mot de passe Ou Numéro de téléphone est Incorrecte!</Alert>
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
