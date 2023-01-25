import React from 'react'


function FormField({labelName, type, name , placeholder, value, handleChange, isSurpriseMe, handleSurprise}) {
  return(
    <>
  <div className="flex items-center gap-2 mb-1">
    <label htmlFor={name} className = "block text-sm font-medium text-gray-900">
    {labelName}
    </label>
    {isSurpriseMe && (
      <button type='button' 
        onClick={handleSurprise} 
        className="font-semibold text-xs bg-[#ECECF1] py-1 px-1 rounded-[5px] text-black">
          Surprise Me!
      </button>
    )}
  </div>
  <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff]
  outline-none block w-full p-3'
    type={type}
    name={name}
    id={name}
    placeholder={placeholder}
    value={value}
    onChange={handleChange}
    required
  />
    </>
    );
}

export default FormField;

