import { useState } from "react";
import styled from "styled-components";

const FormContent = styled.div`
  width: 300px;
  padding: 30px;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const FormField = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <form onSubmit={onSubmit}>
      <FormContent>
        <h1>Sign up</h1>
        <FormField>
          <label>Email Address</label>
          <input value={email} onChange={onEmailChange} />
        </FormField>
        <FormField>
          <label>Password</label>
          <input value={password} onChange={onPasswordChange} type="password" />
        </FormField>
        <button>Sign Up</button>
      </FormContent>
    </form>
  );
};
export default SignUp;
