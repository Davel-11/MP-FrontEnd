import React from 'react'
import './InputData.scss'

const InputData = ({
  description, type, changed, value, hasError, checkFocus, placeholder, maxLength, disabled,
}) => (
  <div className="input-data">
    <label className="st-text">{description}</label>
    <input
      className="input-data-id"
      value={value}
      type={type}
      maxLength={maxLength || 300}
      onChange={(event) => changed(event.target.value)}
      onFocus={checkFocus ? () => checkFocus(true) : null}
      placeholder={placeholder}
      disabled={disabled}
    />
    { hasError ? <p className="std-error">Validar este campo</p> : null}
  </div>
)

export default InputData;