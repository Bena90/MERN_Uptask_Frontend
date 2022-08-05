import React from 'react'

const Alert = ({alert}) => {
  return (
    <div className='flex justify-center w-full'>
      <div className={`${alert.error ? 'from-red-400 to-red-600' : 'from-emerald-400 to-emerald-600'} max-w-md bg-gradient-to-br text-center p-3 mt-3 rounded-xl uppercase text-white font-bold text-sm mb-5`}>
          {alert.msg}
      </div>
    </div>
  )
}

export default Alert;