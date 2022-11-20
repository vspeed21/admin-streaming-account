import React from 'react'

function Account({account}) {
  const { name, screen, pin, deadline } = account;

  return (
    <>
      <p className='uppercase font-bold text-gray-700 mb-2'>
        nombre: {''}
        <span className='normal-case text-black'>{name}</span>  
      </p>

      <p className='uppercase font-bold text-gray-700 mb-2'>
        Nombre pantalla: {''}
        <span className='normal-case text-black'>{screen}</span>  
      </p>

      <p className='uppercase font-bold text-gray-700 mb-2'>
        Pin pantalla: {''}
        <span className='normal-case text-black'>{pin}</span>  
      </p> 

      <p className='uppercase font-bold text-gray-700 mb-2'>
        fecha pago: {''}
        <span className='normal-case text-black'>
          {deadline === 'primeros' ? 'Los primeros de cada mes' : deadline === 'quincena' ? 'Las quincenas de mes' : 'Los finales del mes'}
        </span>
      </p> 

      <div className='flex gap-3 justify-between md:justify-end mt-5'>
        <button 
          type="button"
          className="p-2 bg-indigo-600 hover:cursor-pointer hover:bg-indigo-700 text-white rounded uppercase font-bold px-3 transition-colors duration-300"
        >
          Editar
        </button>

        <button 
          type="button"
          className="p-2 bg-red-600 hover:cursor-pointer hover:bg-red-700 text-white rounded uppercase font-bold px-3 transition-colors duration-300"
        >
          Eliminar
        </button>
      </div>
    </>
  )
}

export default Account