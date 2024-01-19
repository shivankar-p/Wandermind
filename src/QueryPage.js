import React, { useState, useEffect, useRef } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Dictaphone from "./speech";
import styled from "styled-components";
import axios from 'axios';
import {
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
LeadButton } from './styledComponents';

import {options, topLocations, defaultValues} from './options';
import {ActionButton, GenerateButton, ResponseData, ReGenerateButton} from './components';
import logo from './assets/tbo_logo.svg';
import PopupChatbot from "./assistant";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LoadingIcons from 'react-loading-icons';
import { Avatar } from "./components/Avatar";
import PersonIcon from '@mui/icons-material/Person';

const Main = ({ loading, response }) => (
    <MainContent>
      {/* {! response && <Title>⭐️ Wandermind ⭐️</Title>}
      {!response && <Subtitle>Fill the form to generate your itinerary</Subtitle>} */}
  
      {loading ? <Loading /> : !response && <ResponseData response={response} />}
    </MainContent>
  );

const QueryPage = () => {
    const [activeavatar, setActiveavatar] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [values, setValues] = useState(defaultValues);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [selectedCuisineTypes, setSelectedCuisineTypes] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(
      options.languages[0]
    );
  

    const handleDictaphoneTranscript = (transcript) => {
      // Check if the current transcript is different from the previous one
      if (transcript !== values.feedback) {
        setValues((prevState) => ({
          ...prevState,
          feedback: transcript,
        }));
      }
    };
    

    const handleCuisineTypeClick = (cuisineType) => {
      if (selectedCuisineTypes.includes(cuisineType)) {
        setSelectedCuisineTypes(
          selectedCuisineTypes.filter((item) => item !== cuisineType)
        );
        setValues((prevState) => ({
          ...prevState,
          cuisineType: selectedCuisineTypes.filter(
            (item) => item !== cuisineType
          ),
        }));
      } else {
        if (selectedCuisineTypes.length >= 3) {
          setSelectedCuisineTypes((prevSelectedCuisineTypes) => {
            const newSelectedCuisineTypes = [
              ...prevSelectedCuisineTypes.slice(1),
              cuisineType,
            ];
            setValues((prevState) => ({
              ...prevState,
              cuisineType: newSelectedCuisineTypes,
            }));
            return newSelectedCuisineTypes;
          });
        } else {
          setSelectedCuisineTypes((prevSelectedCuisineTypes) => {
            const newSelectedCuisineTypes = [
              ...prevSelectedCuisineTypes,
              cuisineType,
            ];
            setValues((prevState) => ({
              ...prevState,
              cuisineType: newSelectedCuisineTypes,
            }));
            return newSelectedCuisineTypes;
          });
        }
      }
    };
  
    const handleInterestClick = (interest) => {
      if (selectedInterests.includes(interest)) {
        setSelectedInterests(
          selectedInterests.filter((item) => item !== interest)
        );
      } else {
        if (selectedInterests.length >= 3) {
          setSelectedInterests((prevSelectedInterests) => {
            const newSelectedInterests = [
              ...prevSelectedInterests.slice(1),
              interest,
            ];
            setValues((prevState) => ({
              ...prevState,
              interestsNew: newSelectedInterests,
            }));
            return newSelectedInterests;
          });
        } else {
          setSelectedInterests((prevSelectedInterests) => {
            const newSelectedInterests = [...prevSelectedInterests, interest];
            setValues((prevState) => ({
              ...prevState,
              interestsNew: newSelectedInterests,
            }));
            return newSelectedInterests;
          });
        }
      }
    };

const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLocationClick = (location) => {
    setValues((prevState) => ({
      ...prevState,
      destinationCountry: location.name,
    }));
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setValues((prevState) => ({
      ...prevState,
      [name]: selectedOptions,
    }));
  };

  const handleLanguageClick = (option) => {
    setSelectedLanguage(option.value);

    setValues((prevState) => ({
      ...prevState,
      language: option.label,
    }));
  };

  const handleavatar = () => {
    if(activeavatar) setActiveavatar(false);
    else setActiveavatar(true);
  }

  const handleButtonClick = async () => {
    setUploading(true)
    const response = await axios.post('http://127.0.0.1:5000/upload', {url: values.destinationCountry}, {
      headers: {
        'Content-Type': 'application/json',
      }})
    .then((response) => {
      console.log(response);

      const locality = response.data['locality'];

      console.log(locality);

      setValues((prevState) => ({
        ...prevState,
        destinationCountry: locality || '',
      }));

      console.log(values.destinationCountry);

      setUploading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });

    console.log();
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let prompt = `Generate a personalized travel itinerary for a trip to ${values.destinationCountry} with a budget of ${values.budget}. 
    The traveler is interested in a ${values.travelStyle} vacation and enjoys ${values.interestsNew}. 
    They are looking for ${values.accommodationType} accommodations and prefer ${values.transportationType} transportation. 
    The itinerary should include ${values.activityType} activities and ${values.cuisineType} dining options. 
    Please provide a detailed itinerary with daily recommendations for ${values.tripDuration} days, including suggested destinations, activities, and dining options. 
    The itinerary should be written in ${values.language} and have day-wise itinerary with a title for each day and time for each activity proposed in a day. 
    only give markdown output. 
    Strictly start with day-1 in the output. Format the output using Markdown follwing the below format:
    [day_no]: title \n
      [time]: activity 1 description - [budget] \n
      [time]: activity 2 description - [budget] \n
      ....
      Ensure activites under day are indented and formatted as bullet points and assign proper headers to main title and day titles. 
      Also Ensure that above times, budgets are in bold and highlight key places in bold as well using markdown`;
    values.feedbacks.push(prompt);
    axios.post('http://127.0.0.1:5000/generate_itinerary', { prompts: values.feedbacks, responses: values.responses }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        values.responses.push(response.data.generated_response);
        setResponse(response.data.generated_response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

const RegenerateItinerary = () => {
    setLoading(true);
    
    values.feedbacks.push(values.feedback);
    axios.post('http://127.0.0.1:5000/generate_itinerary', { prompts: values.feedbacks, responses: values.responses }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        values.responses.push(response.data.generated_response);
        setResponse(response.data.generated_response);
        values.feedback = "";
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
};
    return (
          <>
          <Container>
            {/* <Main
                loading={loading}
                response={response}
              /> */}
              <Panel>
              <div style={{marginRight: '1px'}}>
              <img src={logo} alt="Logo" width="180" height="90" />
              </div>
                <FormContainer onSubmit={handleSubmit}>
                  <Label htmlFor="destinationCountry">Destination Country</Label>
                  <div style={{alignItems: 'center', display: 'flex', marginTop: '-25px'}}>
                  <Input
                    type="text"
                    placeholder="e.g. San Francisco/USA, Paris/France, Istanbul/Turkey, etc."
                    id="destinationCountry"
                    name="destinationCountry"
                    value={values.destinationCountry}
                    onChange={handleChange}
                    required
                  />
                  <button className="next-button" onClick={handleButtonClick} style={{marginBottom: '15px', display: 'inline-block', textAlign: 'center', textDecoration: 'none', marginLeft: '5px'}}>
                    {(!uploading) ? <AttachFileIcon/> : (<LoadingIcons.TailSpin width={20} height={20}/>)}
                  </button>
                  </div>
                  <TopLocationContainer>
                    <Label htmlFor="topDestinations">🔥Top Destionations:</Label>
                    {topLocations.map((location) => (
                      <PinButton
                        key={location.value}
                        onClick={() => handleLocationClick(location)}
                      >
                        {location.name}
                      </PinButton>
                    ))}
                  </TopLocationContainer>
                  <FormRow>
                    <FormGroup>
                      <Label htmlFor="budget">
                        Budget
                        <p
                          style={{
                            display: "inline-block",
                            color: "#666",
                            fontSize: "10px",
                          }}
                        >
                          (with currency)
                        </p>
                      </Label>
                      <Input
                        type="text"
                        placeholder="e.g. $1000 USD, 1000 EUR, etc."
                        id="budget"
                        name="budget"
                        value={values.budget}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="tripDuration">
                        Trip Duration
                        <p
                          style={{
                            display: "inline-block",
                            color: "#666",
                            fontSize: "10px",
                          }}
                        >
                          (in days)
                        </p>
                      </Label>
                      <Input
                        type="number"
                        id="tripDuration"
                        name="tripDuration"
                        value={values.tripDuration}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </FormRow>
                  <Label htmlFor="interests">Interests</Label>
                  <InterestsContainerNew>
                    {options.interestsNew.map((interest, index) => (
                      <InterestItemNew
                        key={index}
                        className={
                          selectedInterests.includes(interest.name) ? "selected" : ""
                        }
                        onClick={() => {
                          handleInterestClick(interest.name);
                        }}
                        value={interest}
                      >
                        <InterestEmoji aria-label="emoji">
                          {interest.emoji}
                        </InterestEmoji>
                        <InterestName>{interest.name}</InterestName>
                      </InterestItemNew>
                    ))}
                  </InterestsContainerNew>
      
                  <FormRow>
                    <FormGroup>
                      <Label htmlFor="accommodationType">Accommodation</Label>
                      <Select
                        id="accommodationType"
                        name="accommodationType"
                        value={values.accommodationType}
                        onChange={handleChange}
                      >
                        {options.accommodationTypes.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="travelStyle">Travel Style</Label>
                      <Select
                        id="travelStyle"
                        name="travelStyle"
                        value={values.travelStyle}
                        onChange={handleChange}
                      >
                        {options.travelStyles.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    </FormGroup>
                  </FormRow>
      
                  <Label htmlFor="transportationType">
                    Transportation Type
                    <p
                      style={{
                        display: "inline-block",
                        fontSize: "10px",
      
                        color: "#666",
                      }}
                    >
                      (e.g. car, train, bus, etc.)
                    </p>
                  </Label>
                  <Input
                    type="text"
                    id="transportationType"
                    name="transportationType"
                    value={values.transportationType}
                    onChange={handleChange}
                    required
                  />
      
                  <Label htmlFor="activityType">
                    Activity Type
                    <p
                      style={{
                        display: "inline-block",
                        fontSize: "10px",
      
                        color: "#666",
                      }}
                    >
                      (select multiple options)
                    </p>
                  </Label>
                  <Select
                    id="activityType"
                    name="activityType"
                    multiple
                    value={values.activityType}
                    onChange={handleMultiSelectChange}
                  >
                    {options.activityTypes.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                  <Label htmlFor="cuisineType">Cuisine Type</Label>
                  <CuisineTypesContainer>
                    {options.cuisineTypes.map((cuisineType) => (
                      <CuisineType
                        multiple
                        value={values.cuisineType}
                        onChange={handleMultiSelectChange}
                        key={cuisineType.name}
                        className={
                          selectedCuisineTypes.includes(cuisineType.name)
                            ? "selected"
                            : ""
                        }
                        onClick={() => {
                          handleCuisineTypeClick(cuisineType.name);
                        }}
                      >
                        <span role="img" aria-label={cuisineType.name}>
                          {cuisineType.emoji}
                        </span>
      
                        <br />
      
                        <span>{cuisineType.name}</span>
                      </CuisineType>
                    ))}
                  </CuisineTypesContainer>
      
                  <LanguageSelectorContainer>
                    <Label>Language</Label>
                    <LanguageRow>
                      {options.languages.map((option) => (
                        <LanguageOption
                          key={option.value}
                          onClick={() => {
                            handleLanguageClick(option);
                          }}
                          value={values.language}
                          className={
                            selectedLanguage === option.value ? "selected" : ""
                          }
                        >
                          <span role="img" aria-label={option.label}>
                            {option.icon}
                          </span>
                        </LanguageOption>
                      ))}
                    </LanguageRow>
                  </LanguageSelectorContainer>
                  
      
                  {response != "" && (
                    <GenerateButton
                    loading={loading}
                    type="submit"
                    disabled={loading}
                    className={loading ? "loading" : ""}
                  ></GenerateButton>
                  )
                  }

                {response == "" && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <Label htmlFor="feedback">
                        Feedback
                        <p
                          style={{
                            display: "inline-block",
                            fontSize: "10px",
                            color: "#666",
                          }}
                        ></p>
                      </Label>
                      <Input
                        type="text"
                        id="feedback"
                        name="feedback"
                        value={values.feedback}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Dictaphone onTranscriptChange={handleDictaphoneTranscript}/>
                    </div>
                  </div>
                )}    
      
                  {response == "" && (
                    <ReGenerateButton
                    loading={loading}
                    type="submit"
                    disabled={loading}
                    className={loading ? "loading" : ""}
                    onClick={() => RegenerateItinerary()}
                  ></ReGenerateButton>
                  )
                  }
                </FormContainer>
              </Panel>
              <Main
                loading={loading}
                response={response}
              />
            </Container>
            <div>
                  <PopupChatbot/>
                  {/* <button className="next-button" onClick={handleavatar} style={{marginBottom: '15px', display: 'inline-block', textAlign: 'center', textDecoration: 'none'}}>
                    <PersonIcon/>
                  </button>
                  {(activeavatar)?<Avatar/>:(<p></p>)} */}
            </div>
          </>
        );
};
export default QueryPage;

