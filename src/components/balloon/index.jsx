import React from 'react';
import './style.css';
export default function Ballon(props){
   
   const classeUserp ='message'+ ' '  + props.user+ 'message'  //state used to set the user or machine balloon style
   const classeUserBaloon ='baloon'+' ' + ' ' + props.user + 'baloon'  //state used to set the user or machine balloon style
   const[message,setMessage] = React.useState('')  //state that receives the message passed by props
   const[classColorBaloon,setClassColorBaloon] = React.useState('') //set balloon color in case of error
   
   React.useEffect(() => {
    // Atualiza o titulo do documento usando a API do browser
    if(props.name ==='name' && props.user==='machine'){ //change the value of the message name
      setMessage(`Que satirfação ${props.namePeople}. Agora que sei o seu nome qual a cidade e estado que você mora ?`)
      
    }else{ //change the value of the message name
      setMessage(props.message)
      
    } 
    if(props.erro){ //set color in case of error
      setClassColorBaloon('#F23C5B')
    }else{
      setClassColorBaloon('')
    }
  }); 

   return(
    <div className={`${props.user}boxdiv`}> 
    <div 
    className={`${classeUserBaloon} ${classColorBaloon}`}
    style={{backgroundColor: classColorBaloon}}>
       <p className={classeUserp}> 
            {message}
            {props.children}
       </p>
       {props.user === 'user'?
       <di>
         {props.erro?props.erro:null}
         <div className="containerfooter">
          <div className='elementsfooter'>
                <input
                
                  id={props.id}
                  className = "input"
                  value={props.value}
                  onChange={(e)=>props.change(e)}
                  onKeyPress = {e => props.keypress(e)}
                  name={props.name}
                  placeholder={props.placeholder}
                  type={props.type}
                  
                  
                  
                  />
                <button type="button"
                    className="button"
                    value={props.value}
                    onClick={(e) => props.click(e)}
                    // type="submit"
                    >              
                Avançar
                </button>     
              </div>  
              </div>
       </di>:null
      
      }
 
    </div>
    </div>
  );
  }
  