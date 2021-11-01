import React from 'react';
import { Formik } from 'formik';
import './style.css';
import Input from '../components/input';
import Ballon from '../components/balloon';
import * as yup from 'yup';

const addressSchema = yup.object().shape({
 
  name: yup
      .string()
      .required(),
  // city: yup
  //     .string()
  //     .required(),    


 
});

const values ={
// name:'',
// city:'',
// dtnasc:'',
// email:'elisson.franklyn@gmail.com',
// score:''
}
const configInput =[{
  placeholder:'Nome',
  name:'name',
  type:'name'
},
{
  placeholder:'Cidade',
  name:'city',
  type:''
},
{
  placeholder:'Data de Nascimento',
  name:'dtnasc',
  type:'date'
},
{
  placeholder:'Email',
  name:'email',
  type:'email'
},
{
  placeholder:'Score',
  score:'score',
  type:''

}]
const messages = [{message:"Olá, Meu nome é Chatcleverton,tudo bem? Para começarmos me informe seu nome e sebronome",
                  user:'machine'
                  },
]
export default function Basic(){
const[step,setStep] = React.useState(0)  
const[value,setValue] = React.useState('') 
const[name,setName] = React.useState('') 
const[machinemessages,setMachinemessages] = React.useState([`Que satirfação nameuser. Agora que sei o seu nome qual a cidade e estado que você mora ?`,
  `Legal, agora que sabemos sua cidade e estado quando foi que você nasceu ?`,
  `agora me fala teu email, por favor`,
  `você finalizou o teste faça uma avaliação`
  ])

const keydown = e =>{
  if (e.keyCode === 13){
    nextSteps()
  }  
}
const change = e =>{
  setValue(e.target.value)
}  
const click = async e  =>{    
  nextSteps()
}



async function nextSteps(){ 
  if(step===0){
    values['name'] = value  
  }
  if(step===1){
    values['city'] = value  
  }
  if(step===2){
    values['dtnasc'] = value  
  }
  if(step===3){
    values['email'] = value  
  }
  if(step===4){
    values['score'] = value  
  }
  
  const validate = await addressSchema
  .isValid(values)
  .then(function(valid) {
      return valid
    
  });

  if(!validate){
    return
  }
  


setStep(step + 1) 

  
  // values.name = value
  messages.push({message:value,user:'user'}) 
  messages.push({message:machinemessages[step].replace('nameuser',value),user:'machine'}) 
  setValue('')
  window.scrollTo({top:500,behavior:'smooth'})
  

  
}
console.log(name)


  return(
  <div className="Box">
  

    <Formik 
      initialValues={values}
      // validationSchema={addressSchema}
      validate={values => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        if(step===3){
        alert(JSON.stringify(values, null, 2));
        }
        setSubmitting(false);
      }}
    >
      {({       
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}
        >
          {errors.email && touched.email && errors.email}
          {messages.map((message) => ( 
            <div>
            <Ballon
            message={message.message}
            user={message.user}
            />
            </div>
            ))}
          <div className='elementsfooter'>  
          {/* <button type="submit" disabled={false}>
            Submit
          </button>   */}
          </div>
          <div className='elementsfooter'>
          <input className = " input"
                  placeholder = "Consulte aqui"
                  type="Number"
                  value={value}
                  onChange={(e) => change(e)}
                  onKeyDown={(e) => keydown(e)} 
                  name={configInput[step].name}
                  placeholder={configInput[step].placeholder}
                  step={step}
                  type={configInput[step].type}
                  defaultvalue={value}
                  />
         <button type="button"
              className="button"
              onClick={() => click()}
              // type="submit"
              >
                
            avaçar
          </button>     
          </div>                    
        </form>     
        
      )}
    </Formik>
          
   
  </div>
);
}
