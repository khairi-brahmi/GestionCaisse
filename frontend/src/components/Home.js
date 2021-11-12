import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { Link } from "react-router-dom";

import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import Select from '@material-ui/core/Select';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { FontDownload } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Home = () => {
  let storage = localStorage.getItem("user");
  let user = JSON.parse(storage || JSON.stringify({}))
console.log(user)
  const classes = useStyles();
const [dataa,setDataa]=useState([]);

let token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMSIsImlhdCI6MTYyMzAxMDI1NywiZXhwIjoxNjIzNjE1MDU3fQ.ZDisis2KlSessqvjUM8aTAUdJtqsxGwCiQvjLJFR9LFHQWVu3EJ_EfOvNEZ9uF0UaqN4J0dkMKkV8Fm2tjHLOg"
async function getProducts(){

await axios.get('http://localhost:8080/api/product/getAll',{ headers: {Authorization: 'Bearer ' + token}})
.then(res => {
  setDataa(res.data)
  console.log('result',res.data)

})
.catch((e)=>console.log(e))
console.log("hh",dataa) 

}

var prodCart=[]
var dataP = new Array();
var dataOrder=[]
const [payment, setPayment] = React.useState("Cash");
const [addcart, setAddCart] =useState([]);
const [count, setCount] = React.useState(0);
const [w, setWW] = React.useState(0);

let addcrt="http://localhost:8080/api/addtocart/addProduct";
let getcrt="http://localhost:8080/api/addtocart/getCartsByUserId"
let updateQtt="http://localhost:8080/api/addtocart/updateQtyForCart"
let rmProc="http://localhost:8080/api/addtocart/removeProductFromCart"
async function getCart(user_id){
  var data={
    "userId":user_id
}
  await axios.post(getcrt,data)
  .then((t)=>{
   setAddCart(t.data)
    setCount(t.data.length)
    let wk=0
    t.data.map((b)=>(wk=wk+b.price))
    setWW(wk)

  })
  .catch((e)=>console.log('erreur'))
 
}
console.log(w)
async function addProd(id,name,price){
  var dataItem={
    "productId":id,
    "userId":10,
    "qty":quantity,
    "price":price
  }
  await axios.post(addcrt,dataItem)
  .then(()=>{
  
    getCart(10)

  })

  }
  const [quantity, setQuantity] = useState(1);
async function DeleteFromPanier(idd){

  let d={"userId":10,
  "cartId":idd
  }
await axios.post(rmProc,d)
.then(()=>getCart(10))

}

async function handleChange(event,id,price) {
  let dat={"cartId":id,
  "userId":10,
  "qty":event,
  "price":event*price}
  await axios.post(updateQtt,dat)
  .then(()=>getCart(10))
};

useEffect(()=>{
  getProducts()
  getCart(10)
},[])
const [open, setOpen] = React.useState(false);
const [open1, setOpen1] = React.useState(false);
const [deleteok, setDeleteOk] = React.useState(false);
const [deletefailed, setDeleteFailed] = React.useState(false);
const handleClickOpen = () => {
  setOpen(true);
};

const handleClickOpen1 = () => {
  setOpen(false)
  setOpen1(true);
};

async function handleClose() {
  setOpen(false)
};
async function handleClose1() {

  setOpen1(false)
};

  return (
    <div>
      <header>
      <div className="brand">IF4 Phones</div>
      <nav>
        <ul>
       
         
          
          
{localStorage.getItem("user")?
<div>
     
<li>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
  
  <Badge badgeContent={1} color="secondary">
  Commandes
</Badge> 
    </IconButton>
          </li>
<li style={{ alignItems: "center" }}>
          <IconButton onClick={()=>handleClickOpen()} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
  
  <Badge badgeContent={count} color="secondary">
  <ShoppingBasketIcon/>
</Badge> Panier
    </IconButton>
          </li>
          <li>
<IconButton  edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
<AccountCircleIcon/>{user.user.name}
</IconButton>
<IconButton onClick={async () => {
      
         localStorage.removeItem("user"),
         window.location.replace("/")
     }}
edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
<ExitToAppIcon/>
</IconButton>
</li>
</div>
:
<li>
<IconButton href="/client" edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
<AccountCircleIcon/> Se Connecter
</IconButton>
</li>
}
         
    
        
      
        </ul>
      </nav>
    </header>
  

    <div className="container">
      
      <div className="products">
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
       
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Panier</DialogTitle>
        {count!=0?
        <div>
                <DialogContent>
                {addcart.map((i)=>{
                  return(
                    <Grid container spacing={3}>
              <Grid item xs="8">
              <b>{i.productName}</b>
              <p style={{color:"grey",fontSize:"0.75em"}}>Prix: {i.price} $</p>
              </Grid>
              <Grid item xs="2">
              <InputLabel style={{color:"grey",fontSize:"0.75em"}}>Qantité</InputLabel>
              <Select
              style={{color:"grey",fontSize:"0.75em"}}
                 labelId="demo-simple-select-outlined-label"
                 id="demo-simple-select-outlined"
                value={i.qty}
                onChange={(e)=>handleChange(e.target.value,i.id,i.price)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
                 
              </Grid>
             
              <Grid item xs="2">
             
                  <button onClick={()=>DeleteFromPanier(i.id)}>
                    <DeleteIcon/>
                  </button>
                
              </Grid>
              <Divider/>
              </Grid>
                  )
                })}
              
              <hr/>  
              <Typography style={{textAlign:"center",fontFamily:"serif"}}variant="h5" component="h2">
                   Totale: {w}$
              </Typography>
              </DialogContent>
                <DialogActions>
          
                <Button variant="contained" onClick={()=>handleClickOpen1()} color="primary">
                Passer la commande
                </Button>
              
               <Button onClick={()=>handleClose()} color="primary">
               Retour
               </Button>
             </DialogActions>
             </div>
              :
              <div>
<DialogContent>
                <Typography variant="h4" component="h2">
                   Panier Vide
              </Typography>
                </DialogContent>
                <DialogActions>
        
         <Button onClick={()=>handleClose()} color="primary">
         Retour
         </Button>
       </DialogActions>
              </div>
              }
      
      </Dialog>
    </div>
   <div>
      <Dialog
        open={open1}
        onClose={()=>handleClose1()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Commande</DialogTitle>
     
                <DialogContent>
                <Typography style={{textAlign:"center",fontFamily:"serif"}}variant="h5" component="h2">
                   Totale à payer: {w}$
              </Typography>
              
              <hr/>  
              <br/>
              <Grid container spacing={3}>
              <Grid item xs="7">
              <InputLabel style={{color:"black",fontSize:"0.86em"}}>Type de Payement</InputLabel>

                </Grid>
                <Grid item xs="5">
                <Select
              style={{color:"grey",fontSize:"0.95em"}}
              
                value={payment}
                onChange={(e)=>{setPayment(e.target.value)}}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
                <MenuItem value="bank">Carte Bancaire</MenuItem>
                    </Select>
                </Grid>
                </Grid>
              
                       <br/>
                    <TextField  label="Adresse de livraison" variant="outlined" />
                      <br/>
      {payment=="Cash"?
      <div>

      </div>
      :
      <TextField id="outlined-basic" label="Numéro de la Carte" variant="outlined" />

      }
                
        
             
              </DialogContent>
              
        <DialogActions>
    
           <Button variant="contained" onClick={()=>{}} color="primary">
           Comfirmer
           </Button>
         
          <Button onClick={()=>handleClose1()} color="primary">
          Retour
          </Button>
        </DialogActions>
      </Dialog>
    </div> 
        {dataa.map((d) => {
          return (
           
            <div className="image" key={d.id}>               
              <img src={d.image} />
              <h3 style={{fontSize:"1em",fontFamily:"inherit",fontWeight:"bolder"}}>{d.name}</h3>
              <p style={{color:"grey",fontSize:"0.75em"}}>{d.description}</p>
              <div className="content">
                <h3 className="price">Prix: {d.price} $</h3>
                {localStorage.getItem("user")?
                <div>
                   {addcart.filter(ch => ch.productName == d.name).length==0?
               <button onClick={() => addProd(d.id,d.name,d.price,3)} className="addCart">
               Ajouter au Panier
             </button>
            :
            <div></div>}
                </div>
              :
              null}
             
               
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};


export default (Home);
