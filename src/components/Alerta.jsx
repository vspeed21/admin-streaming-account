
function Alerta({alerta}) {
  return <p className={`border-l-4 p-2 text-center mb-5 uppercase text-sm font-semibold ${alerta.error ? 'border-l-red-400 bg-red-100' : 'border-l-green-400 bg-green-100'}`}>
    {alerta.msg}
  </p>
}

export default Alerta;