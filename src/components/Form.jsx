// Big, tappable choices built on real radio buttons and checkboxes,
// so they work with keyboards and screen readers as well as fingers.

export function ChoiceGroup({ legend, name, options, value, onChange, multiple = false, className = '' }) {
  const isSelected = (optionValue) => (multiple ? value.includes(optionValue) : value === optionValue)

  function handleChange(optionValue) {
    if (!multiple) {
      onChange(optionValue)
      return
    }
    onChange(isSelected(optionValue) ? value.filter((item) => item !== optionValue) : [...value, optionValue])
  }

  return (
    <fieldset className={`choice-group ${className}`}>
      <legend>{legend}</legend>
      <div className="choices">
        {options.map((option) => (
          <label key={option.value} className={`choice ${isSelected(option.value) ? 'is-selected' : ''}`}>
            <input
              type={multiple ? 'checkbox' : 'radio'}
              name={name}
              value={option.value}
              checked={isSelected(option.value)}
              onChange={() => handleChange(option.value)}
            />
            {option.visual}
            <span className="choice-text">
              <span className="choice-label">{option.label}</span>
              {option.note && <span className="choice-note">{option.note}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function TextField({ label, name, error, hint, multiline = false, className = '', ...inputProps }) {
  const errorId = error ? `${name}-error` : undefined
  const hintId = hint ? `${name}-hint` : undefined
  const shared = { id: name, name, 'aria-invalid': Boolean(error), 'aria-describedby': errorId ?? hintId, ...inputProps }
  return (
    <div className={`field ${error ? 'has-error' : ''} ${className}`}>
      <label htmlFor={name}>{label}</label>
      {multiline ? <textarea rows={3} {...shared} /> : <input {...shared} />}
      {hint && !error && <p className="field-hint" id={hintId}>{hint}</p>}
      {error && <p className="field-error" id={errorId}>{error}</p>}
    </div>
  )
}

export function SelectField({ label, name, children, className = '', ...selectProps }) {
  return (
    <div className={`field ${className}`}>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} {...selectProps}>
        {children}
      </select>
    </div>
  )
}
