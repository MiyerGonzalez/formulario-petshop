export function valida(input){
  const tipoDeInput = input.dataset.tipo;
  if(validadores[tipoDeInput]){
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  }else{
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing", 
  "typeMismatch",
  "patternMismatch",
  "customError",

];

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacio",
  },
  email: {
    valueMissing: "El campo email no puede estar vacio",
    typeMismatch: "El correo no es valido",
  },

  password: {
    valueMissing: "El campo password no puede estar vacio",
    patternMismatch: "almenos 6 caracteres, maximo 12, debe contener una minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales",
  },

  nacimiento: {
    valueMissing: "Este campo no puede estar vacio",
    customError: "debes tener 18 a;os de edad",
  },

  numero: {
    valueMissing: "este campo no puede estar vacio",
    patternMismatch: "el formato requerido es 10 numeros",
  },

  direccion: {
    valueMissing: "este campo no puede estar vacio",
    patternMismatch: "la direccion debe tener entre 10 a 40 caracteres.",
  },

  ciudad: {
    valueMissing: "este campo no puede estar vacio",
    patternMismatch: "la ciudad debe tener entre 4 a 20 caracteres.",
  },

  estado: {
    valueMissing: "este campo no puede estar vacio",
    patternMismatch: "el estado debe tener entre 4 a 20 caracteres.",
  },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
};

function mostrarMensajeDeError(tipoDeInput, input){
  let mensaje = "";
  tipoDeErrores.forEach( error =>{
    if(input.validity[error]){
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
   if(!mayorDeEdad(fechaCliente)){
        mensaje = "debes tener 18 a;os de edad";
   }

   input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
        );
       return diferenciaFechas <= fechaActual;
}
