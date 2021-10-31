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

}

]

const messages = [{message:"Olá, Meu nome é Chatcleverton,tudo bem? Para começarmos me informe seu nome e sebronome",
                  user:'machine'
},


]

// let machinemessages = [
 
//   `Que satirfação ${values.name}. Agora que sei o seu nome qual a cidade e estado que você mora ?`,
//   `Legal, agora que sabemos sua cidade e estado quando foi que você nasceu ?`,
//   `agora me fala teu email, por favor`,
//   `você finalizou o teste faça uma avaliação`
//   ]  
export default function Basic(){
const[step,setStep] = React.useState(0)  
const[value,setValue] = React.useState('') 
const[name,setName] = React.useState('') 
const[machinemessages,setMachinemessages] = React.useState([`Que satirfação nameuser. Agora que sei o seu nome qual a cidade e estado que você mora ?`,
  `Legal, agora que sabemos sua cidade e estado quando foi que você nasceu ?`,
  `agora me fala teu email, por favor`,
  `você finalizou o teste faça uma avaliação`
  ]  ) 
// const[messages,setMessage] = React.useState([])
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

const nextSteps = () =>{ 
if(value ===''){
  return
}
 
if(step===0){
  values.name = value  
}
if(step===1){
  values.city = value  
}
if(step===2){
  values.dtnasc = value  
}
if(step===3){
  values.email = value  
}
if(step===3){
  values.score = value  
}


setStep(step + 1) 

  
  values.name = value
  messages.push({message:value,user:'user'}) 
  messages.push({message:machinemessages[step].replace('nameuser',value),user:'machine'}) 
  setValue('')
  

  
}




// React.useEffect(() => {
//   messages.push({message:machinemessages[step]})
// },[]);

// messages.push({message:machinemessages[step]})





console.log(name)


  return(
  <div className="Box">
    <h1>{step}</h1>
    {machinemessages[step]}
  

    <Formik 
      initialValues={values}
      validate={values => {
        const errors = {};
        // if (!values.email) {
        //   errors.email = 'Required';
        // } else if (
        //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        // ) {
        //   errors.email = 'Invalid email address';
        // }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
      // onSubmit={(e)=>nextSteps(e)}
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
          
          {/* <Ballon
          message='Bom dia vida como vc acordou hj? linda como sempre?'
          user='user'
          
          /> */}
          
          {/* <Input 
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values}
          //placeholder={configInput[step].placeholder}
          name={configInput[step].name}
          step={step}
          type={configInput[step].type}
          defaultvalue={value}
          />
           */}
          <button type="submit" disabled={false}>
            Submit
          </button>
                   
        </form>     
        
      )}
    </Formik>
    <input className = "input"
                  placeholder = "Consulte aqui"
                  type="Number"
                  value={value}
                  onChange={(e) => change(e)}
                  onKeyDown={(e) => keydown(e)} 
                  name={configInput[step].name}
                  step={step}
                  type={configInput[step].type}
                  defaultvalue={value}
                  />
    <button type="button" 
          // disabled={isSubmitting}
          onClick={() => click()}>
            avaçar
          </button>              
   
  </div>
);
}
