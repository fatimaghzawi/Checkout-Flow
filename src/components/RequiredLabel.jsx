function RequiredLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor}>
      {children}
      <span className="required-mark" aria-hidden="true">
        {" "}
        *
      </span>
    </label>
  );
}

export default RequiredLabel;
