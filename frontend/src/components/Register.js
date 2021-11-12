import React, { Component, useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
const Register = () => {
  const [mob, setMob] = useState("")
  const [pwd, setPwd] = useState("")
  const [rpwd, setRPwd] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [err, setErr] = useState(false)
let url="http://localhost:8080/api/signup/user"
  async function SubmitRegister() {
    let data={
      "name":name.toString(),
      "email":email.toString(),
      "mobile":mob.toString(),
      "password":pwd.toString()
  
  }

    await axios.post(url,data)
      .then(() => {
        localStorage.setItem("new", JSON.stringify({
          status:true
      }));
              window.location.replace('/client')
      })
      .catch(()=>(setErr(true)))
  }
  

    return (
      <div className="login">
 
        <br/>  <br/>  <br/>
          <h2>Créer Votre Compte</h2>
          <br/>
          <div className="username">
            <input
              type="text"
              placeholder="Nom"
             // value={this.state.email}
            //  onChange={this.update}
            onChange={(e) => setName(e.target.value)}
              name="name"
            />
          </div>
          <div className="username">
            <input
              type="text"
              placeholder="Numéro téléphone"
      
            onChange={(e) => setMob(e.target.value)}
              name="Mobile"
            />
          </div>
          <div className="username">
            <input
              type="text"
              placeholder="Email"
            
            onChange={(e) => setEmail(e.target.value)}
              name="email"
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
             <div className="password">
            <input
              type="password"
              placeholder="Confirmer Mot de passe"
            //  value={this.state.password}
            onChange={(e) => setRPwd(e.target.value)}
              name="password"
            />
         

          </div>
          {(pwd!=rpwd && pwd!='') ? (
                                <div style={{ color: "red", fontSize:"0.7em" ,marginLeft:"30px"}}>
                                    {"Les deux mots de passe ne sont pas identiques!"}
                                </div>
                            ) : null}
          <Button  disabled={pwd!==rpwd || pwd===''} onClick={()=>SubmitRegister()} variant="contained" color="primary">
        Creér un compte</Button>
         
     <br/> 
     {err?
      <Alert severity="error">Vérifier vos Données!</Alert>
      :
      null
     }
    
     <br/>

        <Link to="/client">  Se Connecter </Link>   <br/>     <Link to="/"> Page d'accueil  </Link>
         <br/>  <br/> 
      </div>
      );
    };
    

export default Register;
