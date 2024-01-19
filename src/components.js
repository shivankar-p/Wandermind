// components.js
import React from "react";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import { Button, ResponseContainer, ResponseTitle,
        ResponseText,ButtonContainer} from "./styledComponents";   
import Itineraryinfo from "./components/info";
import './response.css';
import Timeline from "./timeline";
import TimelineDual from './TimelineDual/timelinedual';

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
    <Button onClick={onClick} disabled={loading} style={{marginBottom: '300px', marginTop: '20px'}}>
      {loading ? "Please wait..." : "Regenerate"}
    </Button>
  );

const ReGenerateButton = ({ loading, onClick }) => (
  <Button style={{ backgroundColor: '#28a745', marginTop: '20px', marginBottom: '110px '}}onClick={onClick} disabled={loading}>
    {loading ? "Please wait..." : "ReGenerate"}
  </Button>
);

const ResponseData = ({ response, itinerary, setItinerary, values, setValues }) => {
  // response = "**Day 1: Arrival and Exploration**\n\n- **Morning**: After arriving in London, check into your hotel and freshen up.\n\n- **Evening**:\n  - **6:00 PM**: Explore Covent Garden, a vibrant district known for its street performers, boutique shops, and bustling markets. Take a leisurely walk through the area and immerse yourself in the lively atmosphere.\n  - **8:00 PM**: Enjoy a traditional British dinner at The Ivy, renowned for its classic menu and elegant ambiance. Try dishes like fish and chips or steak and ale pie. Budget: $$$\n\n**Day 2: Historical Landmarks and Architectural Marvels**\n\n- **Morning**:\n  - **9:00 AM**: Start your day by visiting the Tower of London, a historic castle that has served various purposes throughout history. Explore the Crown Jewels exhibition and learn about the tower's fascinating past. Budget: $$\n  - **11:00 AM**: Cross the iconic Tower Bridge and enjoy panoramic views of the city from its high-level walkways. Don't forget to take some memorable pictures.\n\n- **Afternoon**:\n  - **1:00 PM**: Visit the majestic St. Paul's Cathedral, a masterpiece of Baroque architecture. Explore the interior, climb to the Whispering Gallery for exceptional acoustics, and enjoy breathtaking views from the Golden Gallery. Budget: $$\n  - **3:00 PM**: Take a guided tour of the Houses of Parliament and Big Ben, the iconic symbol of London. Marvel at the intricate Gothic architecture and learn about the political history of the United Kingdom. Budget: $\n\n- **Evening**:\n  - **6:00 PM**: Explore the vibrant neighborhood of Shoreditch, known for its street art and trendy atmosphere. Stroll through the streets and discover unique galleries, vintage shops, and vibrant nightlife.\n  - **8:00 PM**: Indulge in a delicious American-style dinner at Hard Rock Cafe London, located in the heart of the city. Enjoy classic burgers, ribs, or other American favorites while surrounded by iconic music memorabilia. Budget: $$\n\n**Day 3: Outdoor Activities and Shopping**\n\n- **Morning**:\n  - **9:00 AM**: Visit the iconic British Museum, home to a vast collection of art and artifacts from around the world. Explore exhibits like the Rosetta Stone, Egyptian mummies, and ancient Greek sculptures. Budget: Free admission (donations encouraged)\n  - **11:30 AM**: Take a relaxing stroll along the South Bank of the River Thames, enjoying views of the city skyline. Make a stop at the famous London Eye, and consider taking a ride for stunning aerial views of London. Budget: $$\n\n- **Afternoon**:\n  - **1:30 PM**: Explore the vibrant shopping district of Oxford Street, known for its numerous department stores, high-end fashion brands, and bustling atmosphere. Indulge in some retail therapy and pick up unique souvenirs.\n  - **4:00 PM**: Visit the luxurious department store Harrods in Knightsbridge. Explore its multiple floors filled with designer fashion, exquisite homeware, and gourmet food. Don't forget to visit the famous Food Halls for a variety of culinary treats.\n\n- **Evening**:\n  - **6:30 PM**: Enjoy a leisurely dinner at Gordon Ramsay's York and Albany, offering a blend of British and American flavors. Experience delicious dishes like roasted beef Wellington or grilled lobster, crafted with culinary excellence. Budget: $$$\n  - **8:30 PM**: End your London trip by taking a relaxing evening walk along the Thames Embankment, enjoying the scenic views of the city's illuminated landmarks.\n\n**Please note that the budgets indicated ($, $$, $$$) are subjective and can vary based on personal preferences and prices at the time of travel."
  return (
    <>
    <Itineraryinfo/>
    <ResponseContainer>
      <br/>
      <ResponseTitle>
        TRAVEL ITINERARY
      </ResponseTitle>
      
      <p>Your recommended <a href="http://127.0.0.1:3000/hotels">hotels</a> and <a href="http://127.0.0.1:3000/flights">flights</a>.</p>
      {/* <ResponseText>
        <ReactMarkdown>{response}</ReactMarkdown>
      </ResponseText> */}
      <TimelineDual itinerary={itinerary} setItinerary = {setItinerary} values={values} setValues={setValues}/>
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
