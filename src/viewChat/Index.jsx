import React, { useRef } from 'react'
import { Formik } from 'formik';
import './style.css';
import Input from '../components/input';
import Ballon from '../components/balloon';
import * as yup from 'yup';
import axios from 'axios'




const api = axios.create({
    baseURL: 'https://6181ead284c2020017d89bc0.mockapi.io/Chatcleverton/datamessage/'
    
}); 

const addressSchema = yup.object().shape({
 
  name: yup
      .string()
      .required("Informe o Nome"),
  city: yup
      .string()
      .required('cidade incorreta'),
  dtnasc: yup
      .string()
      .required('data incorreta'),
  email: yup
      .string()
      .email()
      .required('Informe o email'),    
  score: yup
      .number()
      .required('Informe um valor correto')
      .max(5)
      .positive()
      .integer(),
});
const values ={
  name:'',
  city:'',
  dtnasc:'',
  email:'',
  score:''
  }
const valuesSend ={
name:'',
city:'',
dtnasc:'',
email:'',
score:''
}
const valuesError ={
  name:false,
  city:false,
  dtnasc:false,
  email:false,
  score:false
  }


export default function Basic(){
const[step,setStep] = React.useState(0)  
const[send,setSend] = React.useState(false)
const[name,setName] = React.useState('')
const[valuesErrorState,setValuesErrorState] = React.useState({}) 
const[values,setValues] = React.useState({
    name: '',
    city: '',
    dtnasc: '',
    email: '',
    score: ''
  }) 
const[machinemessages,setMachinemessages] = React.useState([
  {
    message:`Olá, Meu nome é Chatcleverton,tudo bem? Para começarmos me informe seu nome e sebronome`,  
    user:'machine',
    display:"start",
    id:"1"
  },
  {
    message:`Que satirfação nameuser. Agora que sei o seu nome qual a cidade e estado que você mora ?`,
    user:'machine',
    display:"none",
    id:"2"
  },
  {
    message:`Legal, agora que sabemos sua cidade e estado, quando foi que você nasceu ?`,
    user:'machine',
    display:"none",
    id:"3"
  },
  {
    message:`agora me fala teu email, por favor`,
    user:'machine',
    display:"none",
    id:"4"
  },
  {
    message:`você finalizou o teste faça uma avaliação`,
    user:'machine',
    display:"none",
    id:"5"
  }
  

])
React.useEffect(() => {
  setValuesErrorState(valuesError)
});

const keypress =  e =>{
  if(e.target.value && (e.code === 'Enter' || e.code == 'NumpadEnter')){
    nextSteps()
  }
}

const click =  e  =>{   
    if(e.target.value){
      nextSteps()
    }
  console.log(valuesErrorState)
    
   
}
const validateColors = erros =>{
  valuesError.name = Boolean(erros.name)
  valuesError.city = Boolean(erros.city)  
  //valuesError.dtnasc = Boolean(erros.dtnasc) 
  valuesError.email = Boolean(erros.email) 
  valuesError.score = Boolean(erros.score)
 
}
const checkData=(data)=> {
  return data instanceof Date && !isNaN(data);
}

async function sendData(values){
try{
  const response = await api.post('/',values)      
  console.log(response.status)  
    if(response.status === 201){
      alert('Dados Enviados')
    }else{
      alert('Falha no envio')
    }
  } catch(err){
    alert('Houve uma falha no envio tente novamente')
    return null
  }
}
async function nextSteps(){ 
  

if(step<5){
    setStep(step + 1)
    window.location.href = `#${machinemessages[step].id}` 
}
// setTimeout(2)

// document.getElementById(step).scrollIntoView();

  
  // values.name = value
  // messages.push({message:value,user:'user'}) 
  // messages.push({message:machinemessages[step].replace('nameuser',value),user:'machine'}) 
  // setValue('')
  // window.scrollTo({top:0,behavior:'smooth'})
  // window.scrollTo(5000000,5000000)
  // await window.scroll(0, 0);
  
}
const maskDate = (value) => {    
  return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{4})(\d)/, "$1");

}

  const dayValidation = (date,dateobj) =>{
    let dayDate = date.slice(0, 2)
    let dayDateObj = dateobj.getDate()
    let now = new Date()
    if(dayDateObj && dayDateObj <= 9){
      dayDateObj = '0' + String(dayDateObj)
    }else{
      dayDateObj = String(dayDateObj)
    }
    if(dayDate===dayDateObj && dateobj<now){
      return true
    }else{
      return false
    }
  
  }

  return(
  <div className="viewmessage">
  
 <h1>{step}</h1>
    <Formik 
      initialValues={values}  
      validationSchema={addressSchema}
      validate={values => {
        let date
        let objdate
        const errors = {};
        date =  values.dtnasc.split('/').reverse().join('-') + "T03:00:00.00Z"
                objdate = new Date(date)
                if(checkData(objdate) && dayValidation(values.dtnasc,objdate)){
                  valuesError.dtnasc = false
                }else{
                  valuesError.dtnasc = true
                }

        if(!valuesError.name &&
          !valuesError.city &&
          !valuesError.dtnasc &&
          !valuesError.email &&
          !valuesError.score){
                valuesSend.name = values.name
                valuesSend.city = values.city               
                valuesSend.dtnasc = date
                valuesSend.email = values.email 
                valuesSend.email = values.email 
                valuesSend.score = values.score 
                
            } 
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // if(step===3){}
        alert(JSON.stringify(valuesSend, null, 2));
        sendData(JSON.stringify(valuesSend, null, 2))
      
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
        {
          validateColors(errors)
          
        }
        {setName(values.name)}
            <Ballon
                message={machinemessages[0].message}
                user={machinemessages[0].user}
                display={machinemessages[0].display}
            />
            <Ballon user="user"
              id={0}
              className = "input"
              value={values.name}
              change={handleChange}
              blur={handleBlur}
              name={"name"}
              keypress={keypress}
              placeholder="Nome"
              type={"Text"}
              click={click}
              erro={valuesErrorState.name}
             >              
              <span id={machinemessages[0].id}></span>
            </Ballon>


            {/* step 1 */}
          {step >= 1 ? 
          <div>
          <Ballon
          message={machinemessages[1].message}
          user={machinemessages[1].user}
          namePeople={name}
          name={"name"}

      />
      <Ballon user="user"
              id={1}
              value={values.city}
              keypress={keypress}
              change={handleChange}
              blur={handleBlur}
              name={"city"}
              placeholder="Cidade"
              type={"Text"}
              click={click}
              erro={valuesErrorState.city}
             >
      </Ballon>
            <span id={machinemessages[1].id}></span>
      </div>:null} 
       {/* step 2 */}
       {step >= 2 ? 
    <div>
    <Ballon
    message={machinemessages[2].message}
    user={machinemessages[2].user}
    display={machinemessages[2].display}
/>
      <Ballon user="user"
              id={1}
              value={maskDate(values.dtnasc)}
              keypress={keypress}
              change={handleChange}
              blur={handleBlur}
              name={"dtnasc"}
              placeholder="Data de nascimento"
              type={"tel"}
              click={click}
              erro={valuesErrorState.dtnasc}
             >              
      </Ballon>
      <div id={machinemessages[2].id}></div>
</div>
:null} 
{/* step 3 */}
{step >= 3 ? 
    <div>
    <Ballon
    message={machinemessages[3].message}
    user={machinemessages[3].user}
    display={machinemessages[3].display}
/>
      <Ballon user="user"
              id={1}
              value={values.email}
              keypress={keypress}
              change={handleChange}
              blur={handleBlur}
              name={"email"}
              placeholder="Email"
              type={"Text"}
              click={click}
              erro={valuesErrorState.email}
             >              
      </Ballon>
        <span id={machinemessages[3].id}></span>
</div>:null} 
 {/* step 4 */}
 {step >= 4 ? 
    <div>
    <Ballon
    message={machinemessages[4].message}
    user={machinemessages[4].user}
    display={machinemessages[3].display}
/>
<Ballon user="user"
              id={1}
              value={values.score}
              keypress={keypress}
              change={handleChange}
              blur={handleBlur}
              name={"score"}
              placeholder="Nota"
              type={"Number"}
              click={click}
              erro={valuesErrorState.score}
             >              
      </Ballon>
</div>:null}
       
    

          <div className='elementsfooter'>  
          <button type="submit" disabled={false}>
            Submit
          </button>  
          </div>
          <div className='elementsfooter'>
          </div>                    
        </form>     
        
      )}
    </Formik>
          
   
  </div>
  // </div>
);
}
