// components.js
import React from "react";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import { Button, ResponseContainer, ResponseTitle,
        ResponseText,ButtonContainer} from "./styledComponents";   
import Itineraryinfo from "./components/info";
import './response.css';

// Button component
const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  margin: 0 4px;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border: 1px solid transparent;

  &::before {
    content: "⬇️";
    margin-right: 4px;
    left: 8px;
    top: 8px;
  }

  &:hover {
    background-color: #dadada;
    border: 1px solid #ccc;
  }
`;

const GenerateButton = ({ loading, onClick }) => (
    <Button onClick={onClick} disabled={loading}>
      {loading ? "Please wait..." : "Generate"}
    </Button>
  );

const ReGenerateButton = ({ loading, onClick }) => (
  <Button style={{ backgroundColor: '#28a745', marginTop: '20px', marginBottom: '110px '}}onClick={onClick} disabled={loading}>
    {loading ? "Please wait..." : "ReGenerate"}
  </Button>
);

const ResponseData = ({ response }) => {
  return (
    <>
    <Itineraryinfo/>
    <ResponseContainer>
      <ResponseTitle>
        Your travel plan is ready 🎉
      </ResponseTitle>
      <p>You can find the recommended hotels <a href="http://127.0.0.1:5000/hotels">here</a></p>
      <ResponseText>
        <ReactMarkdown>{response}</ReactMarkdown>
      </ResponseText>
      <ButtonContainer>
        <ActionButton
          onClick={() => {
            const blob = new Blob([response], {
              type: "text/plain;charset=utf-8",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "travel-plan.txt");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            return false;
          }}
        >
          Download
        </ActionButton>
      </ButtonContainer>
    </ResponseContainer>
    </>
  );
};

export { ActionButton, GenerateButton, ResponseData, ReGenerateButton };
