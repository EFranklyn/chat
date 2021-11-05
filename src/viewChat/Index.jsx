import React, { useRef } from "react";
import { Formik } from "formik";
import "./style.css";
import Ballon from "../components/balloon";
import * as yup from "yup";
import axios from "axios";

const api = axios.create({
  baseURL:
    "https://6181ead284c2020017d89bc0.mockapi.io/Chatcleverton/chat/", //chat api url
});
const addressSchema = yup.object().shape({
  //validation schema for values ​​fields

  name: yup.string().required(),
  city: yup.string().required(),
  dtnasc: yup.string().required(),
  email: yup.string().email().required(),
  score: yup.number().required().max(5).positive().integer(),
});
const valuesSend = {
  //values ​​for sending the form
  name: "",
  city: "",
  dtnasc: "",
  email: "",
  score: "",
};
const valuesError = {
  //values ​​for form error handling
  name: false,
  city: false,
  dtnasc: false,
  email: false,
  score: false,
};

export default function Basic() {
  const [step, setStep] = React.useState(0); //state is responsible for saving the step the user is in
  const [send, setSend] = React.useState(false); //variable that controls the shipment
  const [name, setName] = React.useState(""); //state which controls the name to automatically render
  const [valuesErrorState, setValuesErrorState] = React.useState({}); //state with error values, to update colors in real time
  const [values, setValues] = React.useState({
    //initial values ​​of the form
    name: "",
    city: "",
    dtnasc: "",
    email: "",
    score: "",
  });
  const [machinemessages, setMachinemessages] = React.useState([
    // state with machine messages
    // message: message that appears to the user
    // user: user who is using the balloon, can be machine or user
    // is is used to scroll the screen to the next step.
    {
      message: `Olá, Meu nome é Chatcleverton,tudo bem? Para começarmos me informe seu nome e sebronome`,
      user: "machine",
      id:0
    },
    {
      message: `Que satirfação nameuser. Agora que sei o seu nome qual a cidade e estado que você mora ?`,
      user: "machine",
      id:1
    },
    {
      message: `Legal, agora que sabemos sua cidade e estado, quando foi que você nasceu ?`,
      user: "machine",
      id:2
    },
    {
      message: `agora me fala teu email, por favor`,
      user: "machine",
      id:3
    },
    {
      message: `você finalizou o teste. faça uma avaliação dê uma nota de 0 a 5`,
      user: "machine",
      id:4
    },
  ]);
  React.useEffect(() => {
    // updates all the time if there are errors in the form
    setValuesErrorState(valuesError);
    console.log(send)
  });

  const keypress = (e) => {
    //makes the form advance dynamically via enter
    if (e.target.value && (e.code === "Enter" || e.code == "NumpadEnter")) {
      nextSteps();
    }
  };

  const click = (e) => {
    //makes the form advance dynamically via click
    console.log(e.target.value)
    if (e.target.value) {
      console.log(e.target.value)
      nextSteps();
    }
  };
  const validateColors = (erros) => {
    //feeds the constant so that it later feeds the error state
    valuesError.name = Boolean(erros.name);
    valuesError.city = Boolean(erros.city);
    valuesError.email = Boolean(erros.email);
    valuesError.score = Boolean(erros.score);
  };
  const checkData = (data) => {
    //function created to return a date instance being true or false
    return data instanceof Date && !isNaN(data);
  };

  async function sendData(values) {
    //function used to send the data to the api
    try {
      const response = await api.post("/", values);
      console.log(response.status);
      if (response.status === 201) {
        alert("Dados Enviados");
      } else {
        alert("Falha no envio");
      }
    } catch (err) {
      alert("Houve uma falha no envio tente novamente");
      return null;
    }
  }
  async function nextSteps() {
    //function used to advance steps
    if (step < 5) {
      setStep(step + 1);
      window.location.href = `#${machinemessages[step].id}`;
    }
    
    
  }
  
  const maskDate = (value) => {
    //mask for date of birth
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1");
  };

  const dayValidation = (date, dateobj) => {
    //function for date validation , does not allow the date to be invalid or greater than the current date
    let dayDate = date.slice(0, 2);
    let dayDateObj = dateobj.getDate();
    let now = new Date();
    if (dayDateObj && dayDateObj <= 9) {
      dayDateObj = "0" + String(dayDateObj);
    } else {
      dayDateObj = String(dayDateObj);
    }
    if (dayDate === dayDateObj && dateobj < now) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="viewmessage">
      <Formik
        initialValues={values}
        validationSchema={addressSchema}
        validate={(values) => {
          //  date of birth validation this validation was done in this way to preserve the mask and
          //  the user's visualization, so there are values ​​for display and values ​​for sending that are validated here.
          let date;
          let objdate;
          const errors = {};
          date = values.dtnasc.split("/").reverse().join("-") + "T03:00:00.00Z"; 
          objdate = new Date(date);
          if (checkData(objdate) && dayValidation(values.dtnasc, objdate)) {
            valuesError.dtnasc = false;
          } else {
            valuesError.dtnasc = true;
          }
          if (
            !valuesError.name &&
            !valuesError.city &&
            !valuesError.dtnasc &&
            !valuesError.email &&
            !valuesError.score
          ) {
            valuesSend.name = values.name;
            valuesSend.city = values.city;
            valuesSend.dtnasc = date;
            valuesSend.email = values.email;
            valuesSend.email = values.email;
            valuesSend.score = values.score;

          }else{

          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(valuesSend, null, 2));
          sendData(JSON.stringify(valuesSend, null, 2));
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
          <form onSubmit={handleSubmit}>
            {validateColors(errors)}
            {setName(values.name)}
            <Ballon
              message={machinemessages[0].message}
              user={machinemessages[0].user}
            />
            <Ballon
              user="user"
              id={0}
              className="input"
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
              {/* used to scroll the screen */}
              <span id={machinemessages[0].id}></span>   
            </Ballon>

            {/* step 1 */}
            {step >= 1 ? (
              <div>
                <Ballon
                  message={machinemessages[1].message}
                  user={machinemessages[1].user}
                  namePeople={name}
                  name={"name"}
                />
                <Ballon
                  user="user"
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
                ></Ballon>
                {/* used to scroll the screen */}
                <span id={machinemessages[1].id}></span>
              </div>
            ) : null}
            {/* step 2 */}
            {step >= 2 ? (
              <div>
                <Ballon
                  message={machinemessages[2].message}
                  user={machinemessages[2].user}
                />
                <Ballon
                  user="user"
                  id={2}
                  value={maskDate(values.dtnasc)}
                  keypress={keypress}
                  change={handleChange}
                  blur={handleBlur}
                  name={"dtnasc"}
                  placeholder="Data de nascimento"
                  type={"tel"}
                  click={click}
                  erro={valuesErrorState.dtnasc}
                ></Ballon>
                <div id={machinemessages[2].id}></div>
              </div>
            ) : null}
            {/* step 3 */}
            {step >= 3 ? (
              <div>
                <Ballon
                  message={machinemessages[3].message}
                  user={machinemessages[3].user}
                />
                <Ballon
                  user="user"
                  id={3}
                  value={values.email}
                  keypress={keypress}
                  change={handleChange}
                  blur={handleBlur}
                  name={"email"}
                  placeholder="Email"
                  type={"Text"}
                  click={click}
                  erro={valuesErrorState.email}
                ></Ballon>
                {/* used to scroll the screen */}
                <span id={machinemessages[3].id}></span>
              </div>
            ) : null}
            {/* step 4 */}
            {step >= 4 ? (
              <div>
                <Ballon
                  message={machinemessages[4].message}
                  user={machinemessages[4].user}
                />
                <Ballon
                  user="user"
                  id={4}
                  value={values.score}
                  keypress={keypress}
                  change={handleChange}
                  blur={handleBlur}
                  name={"score"}
                  placeholder="Nota"
                  type={"Number"}
                  click={click}
                  erro={valuesErrorState.score}
                ></Ballon>
              </div>
            ) : null}
            
            <div 
            id="send"
            className="divsubmit">
              <button className="buttonsubimit" type="submit" disabled={isSubmitting}>
                Salvar
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
    
  );
}
