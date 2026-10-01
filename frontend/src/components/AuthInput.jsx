const AuthInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
}) => {
  return (
    <div className="auth-field">
      <label className="auth-label" htmlFor={name}>
        {label}
      </label>

      <input
        className="auth-input"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default AuthInput;
