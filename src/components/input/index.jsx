import React from 'react';
import { Formik } from 'formik';
import './style.css';
export default function Input(props){


 

    return(
    <div className='elementsfooter'>  
      <input className = "input"
          // type="Number"
          value={props.value}
          onChange={(e)=>props.change(e)}
          onKeyDown={(e) => props.keydown} 
          name={props.name}
          placeholder={props.placeholder}
          step={props.step}
          type={props.type}
          />
      <button type="button"
          className="button"
          onClick={props.click}
          // type="submit"
          >
            
        avaçar
      </button>     
      </div>  
  );
  }
  