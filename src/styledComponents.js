import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: stretch;
  min-height: 100vh;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }

  &::-webkit-scrollbar {
    display: none;
    width: 0px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
`;

const MainContent = styled.div`
  margin-left:auto;
  margin-right:-13px;
  right:0;
  flex-basis: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 100vh;
  background-image: linear-gradient(
    to bottom right,
    #1a1a1a,
    #222222,
    #333333,
    #444444,
    #555555
  );
  background-size: 400% 400%;
  color: #fff;
  width: 100%;
  height: 100%;

  animation: gradient 15s ease infinite;
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    20% {
      background-position: 50% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media screen and (max-width: 1320px) {
    flex-basis: 60%;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 50px;
    overflow-x: hidden;
  }
  overflow-x: hidden;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-top: 4rem;
  color: #fff;
  font-weight: bold;
  text-shadow: 0 0 10px #000;
  /* text-shadow: #f4ffcf 1px 0 10px; */
  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  fon-family: "Roboto", sans-serif;
`;

const FormContainer = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;

  top: 0;
`;

const Loading = styled.p`
  color: gradient;
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
  vertical-align : center;

  &::after {
    content: "⏳";
    animation: loading 2s infinite;
  }

  @keyframes loading {
    0% {
      content: "⌛️";
    }
    50% {
      content: "⏳";
    }
    100% {
      content: "⌛️";
    }
  }
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: bold;
  font-weight: 600;
  color: #000fs0;
  padding: 0.4rem;
`;

const Input = styled.input`
  border-radius: 0.4rem;
  border: 1px solid #ccc;
  font-size: 0.8rem;
  color: #000;
  width: calc(100% - 2rem);
  padding: 0.6rem 0.6rem;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #007bff;
  }
`;

const Select = styled.select`
  padding: 0.6rem 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 0.8rem;
  width: calc(100% - 0.6rem);
  color: #000;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  width: 100%;
  border: none;
  font-size: 1rem;

  background-color: #0080ff;
  color: #fff;
  cursor: pointer;
  border-radius: 0.4rem;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #00bf2f;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &.loading {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ResponseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResponseTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const ResponseText = styled.div`
  width: 80%;
  font-size: 1rem;
  font-weight: normal;
  color: #fff;
  border-radius: 0.4rem;
  margin-top: 0;
  @media (max-width: 768px) {
    width: calc(100% - 2rem);
    font-size: 0.9rem;
  }
  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
  }

  a {
    color: #fff;
    text-decoration: underline;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
`;

const LanguageSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const LanguageRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

const TopLocationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.3rem;
  margin-top: -1rem;
`;

const LanguageOption = styled.div`
  display: flex;
  font-size: 1.4rem;
  flex-direction: column;
  align-items: center;
  margin-right: 0.2rem;
  padding: 0.2rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  &.selected {
    border: 1px solid #007bff;
    border-radius: 0.4rem;
  }

  &:hover {
    border-color: #333;
    border-radius: 0.4rem;
  }
`;

const PinButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 4px;
  font-size: 12px;
  letter-spacing: 0px;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border: 1px solid transparent;

  &::before {
    content: "📍";
    margin-right: 4px;
    left: 8px;
    top: 8px;
  }

  &:hover {
    background-color: #f5f5f5;
    border: 1px solid #ccc;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4px;
  margin-bottom: 16px;
`;


const InterestsContainerNew = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
`;

const InterestItemNew = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;
  border-radius: 0.4rem;

  &:hover {
    border-color: #333;
    border-radius: 0.4rem;
  }

  &.selected {
    border: 1px solid #007bff;
    border-radius: 0.4rem;
  }
`;

const InterestName = styled.span`
  margin-left: 6px;
  margin-right: 6px;
`;

const InterestEmoji = styled.span`
  font-size: 16px;
`;

const Panel = styled.div`
  display: flex;
  flex-basis: 30%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: #fff;
  position: fixed;
  width: 30%;
  top: 0;
  left: 0;
  overflow-y: auto;

  @media screen and (max-width: 1320px) {
    flex-basis: calc(40% - 2.2rem);
    width: calc(40% - 2.2rem);
    position: relative;
  }

  @media (max-width: 768px) {
    width: calc(100% - 2rem);
    margin: 0 auto;
  }

  @media (max-height: 500px) {
    width: calc(100% - 2rem);
    margin: 0 auto;
    overflow-y: scroll;
    position: relative;
  }
`;


const CuisineTypesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const CuisineType = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.4rem;
  margin-bottom: 5px;
  margin-right: 5px;
  border-radius: 0.4rem;
  border: 1px solid transparent;
  &.selected {
    border: 1px solid #007bff;
    border-radius: 0.4rem;
  }
  &:hover {
    border-color: #333;
    border-radius: 0.4rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

const Info = styled.div`
  margin: 1rem;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: #333;
`;

const InfoTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const InfoText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #fff;
`;

// Lead form will remove later on

const LeadForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LeadInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem 0 0 0.5rem;
  border: 2px solid #ccc;
  font-size: 1.2rem;
  width: 20rem;
  margin-bottom: 1rem;
`;

const LeadButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border-radius: 0.5rem;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #0069d9;
  }
`;

export {
    Container,
    MainContent,
    Title,
    Subtitle,
    FormContainer,
    Loading,
    Label,
    Input,
    Select,
    Button,
    FormRow,
    ResponseContainer,
    ResponseTitle,
    ResponseText,
    FormGroup,
    LanguageSelectorContainer,
    LanguageRow,
    TopLocationContainer,
    LanguageOption,
    PinButton,
    ButtonContainer,
    InterestsContainerNew,
    InterestItemNew,
    InterestName,
    InterestEmoji,
    Panel,
    CuisineTypesContainer,
    CuisineType,
    InfoContainer,
    Info,
    InfoTitle,
    InfoText,
    LeadForm,
    LeadInput,
    LeadButton
};