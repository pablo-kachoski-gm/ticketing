import { useState } from "react";
import Router from "next/router";
import styled from "styled-components";
import useRequest from "../../hooks/use-request";

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

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      Router.push("/");
    },
  });
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };
  return (
    <form onSubmit={onSubmit}>
      <FormContent>
        <h1>Sign in</h1>
        <FormField>
          <label>Email Address</label>
          <input value={email} onChange={onEmailChange} />
        </FormField>
        <FormField>
          <label>Password</label>
          <input value={password} onChange={onPasswordChange} type="password" />
        </FormField>
        {errors}
        <button>Sign in</button>
      </FormContent>
    </form>
  );
};
export default SignIn;
