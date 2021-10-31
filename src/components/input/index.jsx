import React from 'react';
import { Formik } from 'formik';
import './style.css';
export default function Input(){

    return(
    <div className="Box">
     
            <input
              type="email"
              name="email"
              // onChange={handleChange}
              // onBlur={handleBlur}
              // value={values.email}
            />
    </div>
  );
  }
  