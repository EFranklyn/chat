import React from 'react';
import { Formik } from 'formik';
import './style.css';
export default function Input(props){


  const keydown = e =>{
    if (e.keyCode === 13){
      
      alert('teste')
      }
    }

    return(
    <div >     
            <input
              type={props.type}
              name={props.name}
              // onChange={props.handleChange}
              onBlur={props.handleBlur}
              values={props.values}
              onKeyDown={(e)=>keydown(e)}
              defaultValue='teste'
            />
            {props.step}
    </div>
  );
  }
  