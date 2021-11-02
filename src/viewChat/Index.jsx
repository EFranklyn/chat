import React, { useRef } from 'react'
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
  name:'name',
  type:''
},
{
  placeholder:'Data de Nascimento',
  name:'date',
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
const[value,setValue] = React.useState('') 
const[name,setName] = React.useState('') 
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
  
  // const validate = await addressSchema
  // .isValid(values)
  // .then(function(valid) {
  //     return valid
    
  // });

  // if(!validate){
  //   return
  // }
  

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
  await window.scroll(0, 0);
  
}
console.log(name)


  return(
  <div className="Box">
  
 <h1>{step}</h1>
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
          {/* {messages.map((message) => ( 
            <div>
            <Ballon
            message={message.message}
            user={message.user}
            />
            </div>
            ))} */}

            <Ballon
                message={machinemessages[0].message}
                user={machinemessages[0].user}
                display={machinemessages[0].display}
            />
            <Ballon user="user"
            display={machinemessages[0].display}>                       
             <div className="containerfooter"
              id={machinemessages[0].id}
             > 
              <div className='elementsfooter'>
                <input className = "input"
                  // type="Number"
                  value={value}
                  onChange={(e) => change(e)}
                  onKeyDown={(e) => keydown(e)} 
                  name={configInput[0].name}
                  placeholder={configInput[0].placeholder}
                  // step={step}
                  type={configInput[0].type}
                  // defaultvalue={value}
                  
                  />
                <button type="button"
                    className="button"
                    onClick={() => click()}
                    // type="submit"
                    >              
                avaçar
                </button>     
              </div>  
              </div>
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
            display={machinemessages[1].display}>                       
             <div className="containerfooter"> 
              <div className='elementsfooter'>
                <input className = "input"
                  value={value}
                  onChange={(e) => change(e)}
                  onKeyDown={(e) => keydown(e)} 
                  name={configInput[1].name}
                  placeholder={configInput[1].placeholder}
                  type={configInput[1].type}
                  />
                <button type="button"
                    className="button"
                    onClick={() => click()}
                    >              
                avaçar
                </button>     
              </div>  
              </div>
            </Ballon>
            <span id={machinemessages[1].id}></span>
      </div>:null} 
      
      {step >= 2 ? 
          <div>
          <Ballon
          message={machinemessages[2].message}
          user={machinemessages[2].user}
          display={machinemessages[2].display}
      />
      <Ballon user="user"
            display={machinemessages[2].display}>                       
             <div className="containerfooter"> 
              <div className='elementsfooter'>
                <input className = "input"
                  value={value}
                  onChange={(e) => change(e)}
                  onKeyDown={(e) => keydown(e)} 
                  name={configInput[2].name}
                  placeholder={configInput[2].placeholder}
                  type={configInput[2].type}
                  />
                <button type="button"
                    className="button"
                    onClick={() => click()}
                    >              
                avaçar
                </button>     
              </div>  
              </div>
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
            display={machinemessages[3].display}>                       
             <div className="containerfooter"> 
              <div className='elementsfooter'>
                <input className = "input"
                  value={value}
                  onChange={(e) => change(e)}
                  onKeyDown={(e) => keydown(e)} 
                  name={configInput[2].name}
                  placeholder={configInput[3].placeholder}
                  type={configInput[3].type}
                  />
                <button type="button"
                    className="button"
                    onClick={() => click()}
                    >              
                avaçar
                </button>     
              </div>  
              </div>
              <span id={machinemessages[3].id}></span>
            </Ballon>
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
            display={machinemessages[4].display}>                       
             <div className="containerfooter"> 
              <div className='elementsfooter'
              id={machinemessages[4].id}>
                <input className = "input"
                  value={value}
                  onChange={(e) => change(e)}
                  onKeyDown={(e) => keydown(e)} 
                  name={configInput[4].name}
                  placeholder={configInput[4].placeholder}
                  type={configInput[4].type}
                  />
                <button type="button"
                    className="button"
                    onClick={() => click()}
                    >              
                avaçar
                </button>     
              </div>  
              </div>
            </Ballon>
      </div>:null} 
    

          <div className='elementsfooter'>  
          {/* <button type="submit" disabled={false}>
            Submit
          </button>   */}
          </div>
          <div className='elementsfooter'>
          {/* <input className = "input"
                  // type="Number"
                  value={value}
                  onChange={(e) => change(e)}
                  onKeyDown={(e) => keydown(e)} 
                  name={configInput[step].name}
                  placeholder={configInput[step].placeholder}
                  // step={step}
                  type={configInput[step].type}
                  // defaultvalue={value}
                  />
         <button type="button"
              className="button"
              onClick={() => click()}
              // type="submit"
              >
                
            avaçar
          </button>      */}
          </div>                    
        </form>     
        
      )}
    </Formik>
          
   
  </div>
);
}
