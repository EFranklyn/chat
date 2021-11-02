import React from 'react';
import { Formik } from 'formik';
import './style.css';
import react from 'react';
export default function Ballon(props){
   
   const classeUserp ='message'+ ' '  + props.user+ 'message'  
   const classeUserBaloon ='baloon'+' '  + props.user + 'baloon'


   return(
    <div className={`${props.user}boxdiv `}> 
    <div className={classeUserBaloon}>
   
       <p className={classeUserp}> 
            {props.message}
            {props.children}
       </p>
       {props.user === 'user'?
       <di>
         <div className="containerfooter">
          <div className='elementsfooter'>
                <input
                  className = "input"
                  value={props.value}
                  onChange={(e)=>props.change(e)}
                  onKeyPress = {e => {e.Keycode === 13 && e.preventDefault ()}}
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
  