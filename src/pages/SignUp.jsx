import { useState } from "react";
import AlertaInputs from "../components/AlertaInputs";
import NavLinks from "../components/NavLinks";

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatePass, setRepeatePass] = useState('');

  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validRepeatPass, setValidRepeatPass] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    
    if([name, email, password, repeatePass].includes('')) {
      alert('todos los campos son obligatorios');
      return;
    }
  }

  const handleInput = e => {
    if(e.target.name === 'name' && e.target.value.length < 3) {
      setValidName(true);
      return;
    }
    setValidName(false);

    if(e.target.name === 'email' && !validarEmail(e.target.value)) {
      setValidEmail(true);
      return;
    }
    setValidEmail(false);

    if(e.target.name === 'password' && e.target.value.length < 8) {
      setValidPassword(true);
      return;
    }
    setValidPassword(false);

    if(e.target.name === 'repetirpassword' && (e.target.value !== password)) {
      setValidRepeatPass(true);
      return;
    }
    setValidRepeatPass(false);
  }

  function validarEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return regex.test(email)
  }

  return (
    <>
      <div className="">
      <h1 className="text-7xl text-red-500 font-black text-center md:text-left">
          Registrate y empieza a administrar {''} 
          <span className="text-black">tus cuentas</span>
        </h1>
      </div>
      
      <div className="mt-8 md:mt-0">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md p-10 mx-3 rounded-lg"
        >
        <div className="flex flex-col mb-5 gap-3">
            <label 
              htmlFor="name"
              className="text-gray-700 font-bold uppercase"
            >Nombre:</label>
            <input
              id="name"
              name="name"
              type="text"
              className="border-2 p-1 bg-gray-50 rounded-md focus:outline-0 pl-2"
              placeholder="Ingresa tu correo"
              onInput={handleInput}
              value={name}
              onChange={e  => setName(e.target.value)}
            />

            {validName && <AlertaInputs msg="Nombre muy corto"/>}
          </div>

          <div className="flex flex-col mb-5 gap-3">
            <label 
              htmlFor="email"
              className="text-gray-700 font-bold uppercase"
            >Correo electronico</label>
            <input
              id="email" 
              type="email"
              name="email"
              className="border-2 p-1 bg-gray-50 rounded-md focus:outline-0 pl-2"
              placeholder="Ingresa tu correo"
              onInput={handleInput}
              value={email}
              onChange={e  => setEmail(e.target.value)}
            />

            {validEmail ? <AlertaInputs msg="Correo no valido"/>: null}
          </div>

          <div className="flex flex-col mb-5 gap-3">
            <label 
              htmlFor="password"
              className="text-gray-700 font-bold uppercase"
            >Contraseña</label>
            <input
              id="password" 
              type="password"
              name="password"
              className="border-2 p-1 bg-gray-50 rounded-md focus:outline-0 pl-2"
              placeholder="Ingresa tu contraseña"
              onInput={handleInput}
              value={password}
              onChange={e  => setPassword(e.target.value)}
            />

            {validPassword ? <AlertaInputs msg="Contraseña muy corta"/> : null}
          </div>

          <div className="flex flex-col mb-5 gap-3">
            <label 
              htmlFor="repetirpassword"
              className="text-gray-700 font-bold uppercase"
            >repetir contraseña</label>
            <input
              id="repetirpassword" 
              type="password"
              name="repetirpassword"
              className="border-2 p-1 bg-gray-50 rounded-md focus:outline-0 pl-2"
              placeholder="Ingresa tu correo"
              onInput={handleInput}
              value={repeatePass}
              onChange={e  => setRepeatePass(e.target.value)}
            />

            { validRepeatPass ? <AlertaInputs msg="Las contraseñas no son iguales"/> : null}
          </div>

          <div className="flex md:justify-end justify-start">
            <input
              type="submit"
              value="Iniciar sesión"
              className="bg-red-500 text-white uppercase py-2 px-4 font-bold hover:cursor-pointer hover:bg-red-600 transition-colors rounded-md"
            />
          </div>
        </form>
        <NavLinks
          linker="¿Ya tienes una cuenta? Inicia sesión"
          linkdo="Contraseña olvidada"
        />
      </div>
    </>
  )
}

export default SignUp