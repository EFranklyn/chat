import React, { useRef } from 'react'
import { Formik } from 'formik';
import './style.css';
import Input from '../components/input';
import Ballon from '../components/balloon';
import * as yup from 'yup';
import react from 'react';

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
  dtnasc:'',
  email:'',
  score:''
  }

const configInput =[{
  placeholder:'Nome',
  name:'name',
  type:'name',
  value:''
},
{
  placeholder:'Cidade',
  name:'city',
  type:'',
  value:''
},
{
  placeholder:'Data de Nascimento',
  name:'dtnasc',
  type:'date',
  value:''
},
{
  placeholder:'Email',
  name:'email',
  type:'email',
  value:''
},
{
  placeholder:'Score',
  name:'score',
  type:'',
  value:''

}]
const machinemessages=[
  {
    message:"Olá, Meu nome é Chatcleverton,tudo bem? Para começarmos me informe seu nome e sebronome",
    user:'machine',
    display:"start"
  },
  {
    message:`Que satirfação nameuser. Agora que sei o seu nome qual a cidade e estado que você mora ?`,
    user:'machine',
    display:"none"
  },
  {
    message:`Legal, agora que sabemos sua cidade e estado, quando foi que você nasceu ?`,
    user:'machine',
    display:"none"
  },
  {
    message:`agora me fala teu email, por favor`,
    user:'machine',
    display:"none"
  },
  {
    message:`você finalizou o teste faça uma avaliação`,
    user:'machine',
    display:"none"
  },
  

]




// const messages = [{message:"Olá, Meu nome é Chatcleverton,tudo bem? Para começarmos me informe seu nome e sebronome",
//                   user:'machine'
//                   },
// ]
export default function Basic(){
const[step,setStep] = React.useState(0)  
const[send,setSend] = React.useState(false)
const[name,setName] = React.useState('')
// console.log(new Date('1995-04-30'))
// new SimpleDateFormat("dd/MM/yyyy"); 
const[valuesErrorState,setValuesErrorState] = React.useState({}) 
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


const keypressName = async e =>{
  // e.preventDefault ()
  setName(e.target.value)
}

const keypress  = async e =>{
  // console.log(e)
  // if(e.target.value !== '' && e.code === 'Enter'){
  //   nextSteps()
  //   }
  // alert('teste')
  
}

const click = async e  =>{
  
    nextSteps()
    // console.log(machinemessages)
    // setMachinemessages(machinemessages[0].message='teste')

  //   name:false,
  // city:false,
  // dtnasc:false,
  // email:false,
  // score:false
  console.log(valuesErrorState)
    
   
}
const validateColors = erros =>{
  valuesError.name = Boolean(erros.name)
  valuesError.city = Boolean(erros.city)  
  valuesError.dtnasc = Boolean(erros.dtnasc) 
  valuesError.email = Boolean(erros.email) 
  valuesError.score = Boolean(erros.score)
 
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
    // alert(value)
    // console.log(value.length)
    
  return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{4})(\d)/, "$1");
}


  return(
    // <div style={{backgroundColor: "aquamarine",
    //             marginLeft:"2%",
    //             marginRight:"2%",
    //             height:"700px"
    //             }}>
  <div className="viewmessage">
  
 <h1>{step}</h1>
    <Formik 
      initialValues={{
        name:'',
        city:'',
        dtnasc:'',
        email:'',
        score:''
        }}  
      validationSchema={addressSchema}
      validate={values => {
        let date
        const errors = {};
        if(values.name!==''){
          valuesSend.name = values.name 
        }
        if(values.city!==''){
          valuesSend.city = values.city 
        }
        if(values.dtnasc.length === 10){
           valuesSend.dtnasc = values.dtnasc.split('/').reverse().join('-') + "T00:00:00.00Z"
           //values.dtnasc = new Date(values.dtnasc)
           date =  values.dtnasc.split('/').reverse().join('-')
           let objdate = new Date(date)
           if(String(objdate)==='Invalid Date'){
            alert(date)
           }
        }
        if(values.email!==''){
          valuesSend.email = values.email 
        }
        if(values.email!==''){
          valuesSend.email = values.email 
        }
        if(values.score!==''){
          valuesSend.score = values.score 
        }
        
        // console.log(date)
        // console.log(valuesSend)
        // console.log(errors)
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // if(step===3){}
        alert(JSON.stringify(values, null, 2));
        
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
          {/* {`${errors.name} ${values.city = Boolean(errors.city)}
          ${errors.dtnasc} ${values.dtnasc}`  
        } */}
        {
          validateColors(errors)

        }
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
              keypress={keypressName}
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
              type={"Text"}
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
