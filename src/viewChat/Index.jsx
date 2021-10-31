import React from 'react';
import { Formik } from 'formik';
import './style.css';
import Input from '../components/input';
import Ballon from '../components/balloon';

const values ={
name:'',
city:'',
dtnasc:'',
email:'',
score:''
}
const configInput =[{
  placeholder:'teste',
  name:'name',
  type:'name'
},
{
  placeholder:'Cidade',
  name:'city',
  type:'city'
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

}

]

const messages = [{message:"Olá, Meu nome é Chatcleverton,tudo bem? Para começarmos me informe seu nome e sebronome",
                  user:'machine'
},

]
export default function Basic(){
const[step,setStep] = React.useState(0)  
// const[messages,setMessage] = React.useState([])

const machinemessages = [
 
"Que satirfação fulano. Agora que sei o seu nome qual a cidade e estado que você mora ?",
"Legal, agora que sabemos sua cidade e estado quando foi que você nasceu ?",
"agora me fala teu email, por favor.",
"você finalizou o teste faça uma avaliação"
]  
// React.useEffect(() => {
//   messages.push({message:machinemessages[step]})
// },[]);

// messages.push({message:machinemessages[step]})


const setMessages =(message) =>{
let steplocal = step
let user = message
setStep(steplocal + 1)  
if(user!==''){
  user = 'machine'
}else{
  user= 'user'
}
messages.push({message:machinemessages[step],user:user})
console.log(messages)

}
  return(
  <div className="Box">
    <h1>{step}</h1>
    {machinemessages[step]}
  

    <Formik
      initialValues={values}
      // validate={values => {
      //   const errors = {};
      //   if (!values.email) {
      //     errors.email = 'Required';
      //   } else if (
      //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      //   ) {
      //     errors.email = 'Invalid email address';
      //   }
      //   return errors;
      // }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
        <form >
          {/* <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          /> */}
          
          {errors.email && touched.email && errors.email}


          {messages.map((message) => ( 
            <div>
            <Ballon
            message={message.message}
            user={message.user}
            />
            
            
            </div>
            ))}
          
          <Ballon
          message='Bom dia vida como vc acordou hj? linda como sempre?'
          user='user'
          
          />
          
          <Input 
          // handleChange={handleChange}
          // handleBlur={handleBlur}
          values={values}
          placeholder={configInput[step].placeholder}
          name={configInput[step].name}
          step={step}
          type={configInput[step].type}
          />



          
          {errors.password && touched.password && errors.password}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          {/* <button type="button" 
          disabled={isSubmitting}
          onClick={() => setMessages('teste')}>
            avaçar
          </button> */}
        </form>
      )}
    </Formik>
  </div>
);
}
