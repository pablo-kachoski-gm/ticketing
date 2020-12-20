import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const ErrorsPanel = styled.div`
  color: red;
  background-color: rgba(255, 70, 70, 0.25);
  padding: 20px;
  border-radius: 10px 20px;
  & > ul > li:not(:last-child) {
    margin-bottom: 10px;
  }
`;
const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      onSuccess && onSuccess(response.data);
      return response.data;
    } catch (err) {
      setErrors(
        <ErrorsPanel>
          <h4>Oooops...</h4>
          <ul>
            {err.response.data.errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </ErrorsPanel>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
