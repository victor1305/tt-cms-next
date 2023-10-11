const PrincipalBtn = ({ data }) => (
  <button className="btn btn--primary" onClick={data.handleClick}>
    {data.copy}
  </button>
);

export default PrincipalBtn;
