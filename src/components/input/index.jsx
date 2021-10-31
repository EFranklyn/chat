import React from 'react';
import { Formik } from 'formik';
import './style.css';
export default function Input(props){


 

    return(
    <div >     
            <input
              type={props.type}
              name={props.name}
              // onChange={props.handleChange}
              onBlur={props.handleBlur}
              values={props.values}
              defaultValue={props.value}
            />
            {props.step}
    </div>
  );
  }
  