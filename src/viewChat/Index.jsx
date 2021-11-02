import React, { useRef } from 'react'
import { Formik } from 'formik';
import './style.css';
import Input from '../components/input';
import Ballon from '../components/balloon';
import * as yup from 'yup';

const addressSchema = yup.object().shape({
 
  name: yup
      .string()
      .required("Informe o Nome"),
  city: yup
      .string()
      .required('cidade incorreta'),
  dtnasc: yup
      .date()
      .default(() => (new Date())),  
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
 
const[machinemessages,setMachinemessages] = React.useState([
  {
    message:"Olá, Meu nome é Chatcleverton,tudo bem? Para começarmos me informe seu nome e sebronome",
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

const keydown  = e =>{
  e.preventDefault() 
  if (send !== true && e.Keycode === 13){
    if(e.target.value !== ''){
      nextSteps()
    }
  
  }
  nextSteps()
  
}
const click = async e  =>{    
  nextSteps()
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
        const errors = {};
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
          {errors.email && errors.name && errors.city}
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
              keydown={keydown}
              placeholder="Nome"
              type={"Text"}
              click={click}
             >              
              <span id={machinemessages[0].id}></span>
            </Ballon>


            {/* step 1 */}
          {step >= 1 ? 
          <div>
          <Ballon
          message={machinemessages[1].message}
          user={machinemessages[1].user}
          display={machinemessages[1].display}
      />
      <Ballon user="user"
              id={1}
              value={values.city}
              change={handleChange}
              blur={handleBlur}
              name={"city"}
              placeholder="Cidade"
              type={"Text"}
              click={click}
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
              value={values.dtnasc}
              change={handleChange}
              blur={handleBlur}
              name={"dtnasc"}
              placeholder="Data de nascimento"
              type={"number"}
              click={click}
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
              change={handleChange}
              blur={handleBlur}
              name={"email"}
              placeholder="Email"
              type={"Text"}
              click={click}
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
              change={handleChange}
              blur={handleBlur}
              name={"score"}
              placeholder="Nota"
              type={"Number"}
              click={click}
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
