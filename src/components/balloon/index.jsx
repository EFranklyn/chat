import React from 'react';
import { Formik } from 'formik';
import './style.css';
import react from 'react';
export default function Ballon(props){
   
   const classeUserp ='message'+ ' '  + props.user+ 'message'  
   const classeUserBaloon ='baloon'+' ' + ' ' + props.user + 'baloon' + ' '
   const[name,setName] = React.useState(props.name)
   const[message,setMessage] = React.useState('')
   const[classColorBaloon,setClassColorBaloon] = React.useState('')
   
   React.useEffect(() => {
    // Atualiza o titulo do documento usando a API do browser
    if(props.name ==='name' && props.user==='machine'){
      setMessage(`Que satirfação ${props.namePeople}. Agora que sei o seu nome qual a cidade e estado que você mora ?`)
      
    }else{
      setMessage(props.message)
      
    }
    if(props.erro){
      setClassColorBaloon('pink')
    }else{
      setClassColorBaloon('')
    }
  });


   return(
    <div className={`${props.user}boxdiv `}> 
    <div style={{backgroundColor:classColorBaloon}} 
    className={`${classeUserBaloon} ${classColorBaloon}`}>
   
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
                  className = "input"
                  mask="99/99/9999"
                  value={props.value}
                  onChange={(e)=>props.change(e)}
                  onKeyPress = {e => props.keypress(e)}
                  name={props.name}
                  placeholder={props.placeholder}
                  type={props.type}
                  // defaultvalue={value}
                  
                  />
                <button type="button"
                    className="button"
                    onClick={() => props.click()}
                    // type="submit"
                    >              
                avaçar
                </button>     
              </div>  
              </div>
       </di>:null
      
      }
 
    </div>
    </div>
  );
  }
  