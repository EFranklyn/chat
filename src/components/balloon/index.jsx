import React from 'react';
import { Formik } from 'formik';
import './style.css';
import react from 'react';
export default function Ballon(props){
   const[teste,setState] = react.useState('Bom dia minha vida como vc acordou hj ?')
   if(props.user){}
   const classeUserp ='message'+ ' '  + props.user+ 'message'  
   const classeUserBaloon ='baloon'+' '  + props.user + 'baloon'
   return(
    <div className={`${props.user}boxdiv`}> 
    <div className={classeUserBaloon}>
     <div >
       <p className={classeUserp}> 
            {props.message}
    
       </p>
      </div>
    </div>
    </div>
  );
  }
  