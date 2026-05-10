import React from 'react'

const Formgroup = ({labels,placeholder,value,onChange}) => {
  return (
    <div>
        <input onChange={onChange} value={value} type="text" name={labels} id= {labels} placeholder={placeholder} required/>
    </div>
  )
}

export default Formgroup
