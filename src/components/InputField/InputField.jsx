import React from 'react';
import './InputField.css';

const InputField = ({ label, type, id, name, value, onChange, required, pattern, options, placeholder }) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      {type === 'radio' ? (
        <div className="radio-options">
          {options.map((option) => (
            <div key={option.value} className="radio-option">
              <input
                type="radio"
                id={option.value}
                name={name}
                value={option.value}
                onChange={onChange}
                required={required}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          pattern={pattern}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputField;
