import { useState } from 'react';
import useAccounts from '../hooks/useAccounts';

import AlertaInputs from './AlertaInputs'
import Alerta from './Alerta'

function Formulario() {
  const { saveAccounts } = useAccounts();

  const [name, setName] = useState('');
  const [screen, setScreen] = useState('');
  const [pin, setPin] = useState('');
  const [card, setCard] = useState('');
  const [deadline, setDeadLine] = useState('');

  const [alerta, setAlerta] = useState({});

  const [pinValid, setPinValid] = useState(false);
  const [cardValid, setCardValid] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if([name, screen, pin, card, deadline].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    setAlerta({});
    saveAccounts({name, screen, pin, card, deadline});
  }

  const handleInput = e => {
    if(e.target.name === 'card' && !validateNumber(e.target.value)) {
      setCardValid(true);
      return;
    }
    setCardValid(false);

    if(e.target.name === 'pin' && !validateNumber(e.target.value)) {
      setPinValid(true);
      return;
    }
    setPinValid(false);
  }

  function validateNumber(field) {
    const regex = /^[0-9]*[0-9]+$/;
    return regex.test(field);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-5 rounded-lg"
    >
      {alerta.msg && <Alerta alerta={alerta}/>}
      <div className='flex gap-2 flex-col mb-3'>
        <label 
          htmlFor='name'
          className='uppercase text-gray-600 font-bold'
        >
          Nombre:
        </label>

        <input
          type="text"
          id='name'
          name='name'
          placeholder='Nombre de la persona a quien se la alquilo'
          className='p-2 border-2 bg-gray-50 outline-0 rounded focus:shadow'
          onInput={handleInput}
          value={name}
          onChange={e => setName(e.target.value)}
        />

        
      </div>

      <div className='flex gap-2 flex-col mb-3'>
        <label 
          htmlFor='screen'
          className='uppercase text-gray-600 font-bold'
        >
          Nombre pantalla:
        </label>

        <input
          type="text"
          id='screen'
          name='screen'
          placeholder='Ingrese nombre de la pantalla'
          className='p-2 border-2 bg-gray-50 outline-0 rounded focus:shadow'
          onInput={handleInput}
          value={screen}
          onChange={e => setScreen(e.target.value)}
        />

        
      </div>

      <div className='flex gap-2 flex-col mb-3'>
        <label 
          htmlFor='pin'
          className='uppercase text-gray-600 font-bold'
        >
          Pin pantalla:
        </label>

        <input
          type="text"
          id='pin'
          name='pin'
          placeholder='Ingrese el pin de la pantalla'
          className='p-2 border-2 bg-gray-50 outline-0 rounded focus:shadow'
          onInput={handleInput}
          maxLength="4"
          value={pin}
          onChange={e => setPin(e.target.value)}
        />
        {pinValid ? <AlertaInputs msg="Solo puede ingresar numeros"/> : null}
      </div>

      <div className='flex gap-2 flex-col mb-3'>
        <label 
          htmlFor='card'
          className='uppercase text-gray-600 font-bold'
        >
          tarjeta <span className="text-xs text-red-600 normal-case">(Ultimos 4 digitos):</span>
        </label>

        <input
          type="text"
          id='card'
          name='card'
          placeholder='Ingrese la tarjeta asociada a la cuenta'
          className='p-2 border-2 bg-gray-50 outline-0 rounded focus:shadow'
          onInput={handleInput}
          maxLength="4"
          value={card}
          onChange={e => setCard(e.target.value)}
        />
        {cardValid ? <AlertaInputs msg="Solo puede ingresar numeros"/> : null}
      </div>

      <div className='flex gap-2 flex-col mb-3'>
        <label 
          htmlFor='deadline'
          className='uppercase text-gray-600 font-bold'
        >
          Fecha limite de pago:
        </label>
        <select 
         id="deadline"
         name='deadline'
         className='p-2 border-2 bg-gray-50 outline-0 rounded focus:shadow text-center hover:cursor-pointer'
         value={deadline}
          onChange={e => setDeadLine(e.target.value)}
        >
          <option value=""> --Seleccione --</option>
          <option value="primeros">Los primeros de cada mes</option>
          <option value="quincena">Las quincenas de mes</option>
          <option value="finales">Los finales del mes</option>
        </select>
        
      </div>

      <input
        type='submit'
        value={`Agregar`}
        className="w-full text-center bg-red-600 text-white py-2 mt-4 rounded-md hover:cursor-pointer hover:bg-red-700 font-bold uppercase"
      />
    </form>

  )
}

export default Formulario