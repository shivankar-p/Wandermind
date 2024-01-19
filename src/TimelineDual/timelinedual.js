import React, { useEffect, useState } from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
import './timelinedual.css';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import axios from 'axios';
// import options from '../../options';
import {defaultValues} from '../options';



  // var itinerary = {
  //   "14th January": {
  //     title: "Day 1: Arrival and Exploration",
  //     morning: "After arriving in London, check into your hotel and freshen up.",
  //     afternoon: "Take rest sleep well and relax",
  //     evening: "**6:00 PM**: Explore Covent Garden, a vibrant district known for its street performers, boutique shops, and bustling markets. - Take a leisurely walk through the area and immerse yourself in the lively atmosphere.\n  **8:00 PM**: Enjoy a traditional British dinner at The Ivy, renowned for its classic menu and elegant ambiance. Try dishes like fish and chips or steak and ale pie."
  //   },
  //   "15th January": {
  //     title: "Day 2: Historical Landmarks and Architectural Marvels",
  //     morning: "**9:00 AM**: Start your day by visiting the Tower of London, a historic castle that has served various purposes throughout history. Explore the Crown Jewels exhibition and learn about the tower's fascinating past. **11:00 AM**: Cross the iconic Tower Bridge and enjoy panoramic views of the city from its high-level walkways. Don't forget to take some memorable pictures.",
  //     afternoon: "**1:00 PM**: Visit the majestic St. Paul's Cathedral, a masterpiece of Baroque architecture. Explore the interior, climb to the Whispering Gallery for exceptional acoustics, and enjoy breathtaking views from the Golden Gallery. Budget: $$\n  - **3:00 PM**: Take a guided tour of the Houses of Parliament and Big Ben, the iconic symbol of London. Marvel at the intricate Gothic architecture and learn about the political history of the United Kingdom. Budget: $\n\n-",
  //     evening: "  **6:00 PM**: Explore the vibrant neighborhood of Shoreditch, known for its street art and trendy atmosphere. Stroll through the streets and discover unique galleries, vintage shops, and vibrant nightlife.\n  - **8:00 PM**: Indulge in a delicious American-style dinner at Hard Rock Cafe London, located in the heart of the city. Enjoy classic burgers, ribs, or other American favorites while surrounded by iconic music memorabilia. Budget: $$\n\n**"
  //   },
  //   "16th January": {
  //     title: "Day 3: Outdoor Activities and Shopping",
  //     morning: "- **9:00 AM**: Visit the iconic British Museum, home to a vast collection of art and artifacts from around the world. Explore exhibits like the Rosetta Stone, Egyptian mummies, and ancient Greek sculptures. Budget: Free admission (donations encouraged)\n  - **11:30 AM**: Take a relaxing stroll along the South Bank of the River Thames, enjoying views of the city skyline. Make a stop at the famous London Eye, and consider taking a ride for stunning aerial views of London. Budget: $$\n\n-",
  //     afternoon: "**1:30 PM**: Explore the vibrant shopping district of Oxford Street, known for its numerous department stores, high-end fashion brands, and bustling atmosphere. Indulge in some retail therapy and pick up unique souvenirs.\n  - **4:00 PM**: Visit the luxurious department store Harrods in Knightsbridge. Explore its multiple floors filled with designer fashion, exquisite homeware, and gourmet food. Don't forget to visit the famous Food Halls for a variety of culinary treats.\n\n-",
  //     evening: "**6:30 PM**: Enjoy a leisurely dinner at Gordon Ramsay's York and Albany, offering a blend of British and American flavors. Experience delicious dishes like roasted beef Wellington or grilled lobster, crafted with culinary excellence. Budget: $$$\n  - **8:30 PM**: End your London trip by taking a relaxing evening walk along the Thames Embankment, enjoying the scenic views of the city's illuminated landmarks.\n\n**Please note that the budgets indicated ($, $$, $$$) are subjective and can vary based on personal preferences and prices at the time of travel."
  //   }
  // }


const responseToLists = (response) => {
  return Object.entries(response).map(([date, activities], index) => {
    return {
      id: `list${index + 1}`,
      title: activities.title,
      date,
      bannerImage:'https://static.cozycozy.com/images/catalog/bg2/horizontal-london.jpg',
      items: ['morning', 'afternoon', 'evening'].map((time, i) => {
        return {
          id: `item-${index + 1}-${i + 1}`,
          content: activities[time],
        };
      }),
    };
  });
};

const listsToResponse = (lists) => {
  const response = {};

  lists.forEach((list, index) => {
    const { id, title, date, bannerImage, items } = list;

    if (!response[date]) {
      response[date] = {
        title,
        morning: '',
        afternoon: '',
        evening: '',
      };
    }

    const mp = {'1': 'morning', '2': 'afternoon', '3': 'evening'};

    items.forEach((item) => {
      const timePeriod = item.id.split('-')[2]; // Extract morning, afternoon, evening
      //console.log(mp[timePeriod]);
      response[date][mp[timePeriod]] += (response[date][mp[timePeriod]] ? '\n' : '') + item.content;
    });
  });

  return response;
};

// const defaultValues = {
//   destinationCountry: "Hawaii",
//   budget: "4000 USD",
//   travelStyle: options.travelStyles[0],
//   interestsNew: [],
//   accommodationType: options.accommodationTypes[0],
//   transportationType: "Bus",
//   activityType: [options.activityTypes[0]],
//   cuisineType: options.cuisineTypes[0],
//   tripDuration: "3",
//   startDate: "3/2/2024",
//   language: options.languages[0].value,
//   feedbacks: [],
//   responses: [],
//   feedback: ""
// };

var cnt = 0;

function App({itinerary, setItinerary, values, setValues}) {
  console.log(itinerary)
  const timeOfDay = ['Morning', 'Afternoon', 'Evening'];
  //const [values, setValues] = useState(defaultValues);
  // const [responsestate, setResponsestate] = useState(response);
  const [lists, setLists] = useState(responseToLists(itinerary));
  //const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   handleSubmit();
  //   // console.log(lists);
  //   // console.log(listsToResponse(lists));
  // }, []);

  // useEffect(() => {
  //   // handleSubmit();
  //   // console.log(lists);
  //   // console.log(listsToResponse(lists));
  //   cnt++;
  //   console.log(cnt);
  //   itinerary = listsToResponse(lists);
  //   if(cnt > 1) handleReSubmit();
  // }, [lists]);

  const handleFeedback = (feedback_input, day) => {
    let prompt = `User has provided a feedback for day ${day} as follows:
    ${feedback_input}
    Please update the itinerary accordingly.For example, if user says that he wants to visit a beach in the morning, then you can add a beach activity in the morning slot.
    This json format is really important and follow it as an SOP. Ensure that content of each of morning, afternoon, evening is consiced to 2-3 lines. 
    I will run JSON.parse on the response you are returning. so please ensure its a valid json`;
    values.feedbacks.push(prompt);

    setValues((prevValues) => ({
      ...prevValues,
      responses: [...prevValues.feedbacks, prompt],
    }));


    axios.post('http://127.0.0.1:5000/generate_itinerary', { prompts: values.feedbacks, responses: values.responses }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        setItinerary(JSON.parse(response.data.generated_response));
        //values.responses.push(response.data.generated_response);
        setValues((prevValues) => ({
          ...prevValues,
          responses: [...prevValues.responses, response.data.generated_response],
        }));
        
        setLists(responseToLists(itinerary));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReSubmit = () => {
    itinerary = listsToResponse(lists);
    let prompt = `User has edited/modified the response to this:
    ${itinerary}
    In the above json if a field is empty add some new activity to it. and for the remaining rephrase and update this json properly.
    This json format is really important and follow it as an SOP. Ensure that content of each of morning, afternoon, evening is consiced to 2-3 lines. 
    I will run JSON.parse on the response you are returning. so please ensure its a valid json`;
    values.feedbacks.push(prompt);
    axios.post('http://127.0.0.1:5000/generate_itinerary', { prompts: values.feedbacks, responses: values.responses }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        itinerary = JSON.parse(response.data.generated_response);
        //values.responses.push(response.data.generated_response);
        setValues((prevValues) => ({
          ...prevValues,
          responses: [...prevValues.responses, response.data.generated_response],
        }));
        
        setLists(responseToLists(itinerary));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = () => {
    let prompt = `Generate a personalized travel itinerary for a trip to ${values.destinationCountry} with a budget of ${values.budget}. 
    The traveler is interested in a ${values.travelStyle} vacation and enjoys ${values.interestsNew}. 
    They are looking for ${values.accommodationType} accommodations and prefer ${values.transportationType} transportation. 
    The itinerary should include ${values.activityType} activities and ${values.cuisineType} dining options. 
    Please provide a detailed itinerary with daily recommendations for ${values.tripDuration} days from ${values.startDate}, including suggested destinations, activities, and dining options. 
    The itinerary should be written in ${values.language} and itinerary should be returned in a day-wise format.
    For example:
    If destination is london and user is going for a 3 day trip from 14th to 17th January. The json should be as follows:
    {
      "14th January": {
        title: "Day 1: Arrival and Exploration",
        morning: "After arriving in London, check into your hotel and freshen up.",
        afternoon: "Take rest sleep well and relax",
        evening: "Explore Covent Garden, a vibrant district known for its street performers, boutique shops, and bustling markets. Take a leisurely walk through the area and immerse yourself in the lively atmosphere. Enjoy a traditional British dinner at The Ivy, renowned for its classic menu and elegant ambiance."
      },
      "15th January": {
        title: "Day 2: Historical Landmarks and Architectural Marvels",
        morning: "...",
        afternoon: "...",
        evening: "..."
      },
      "16th January": {
        title: "Day 3: Outdoor Activities and Shopping",
        morning: "...",
        afternoon: "...",
        evening: "..."
      }
    }
    This json format is really important and follow it as an SOP. Ensure that content of each of morning, afternoon, evening is consiced to 2-3 lines. 
    I will run JSON.parse on the response you are returning. so please ensure its a valid json`;
    values.feedbacks.push(prompt);
    axios.post('http://127.0.0.1:5000/generate_itinerary', { prompts: values.feedbacks, responses: values.responses }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        itinerary = JSON.parse(response.data.generated_response);
        //values.responses.push(response.data.generated_response);
        setValues((prevValues) => ({
          ...prevValues,
          responses: [...prevValues.responses, response.data.generated_response],
        }));
        
        setLists(responseToLists(itinerary));
      })
      .catch((error) => {
        console.error(error);
      });
  };
    const onDragEnd = (result) => {
      const { source, destination } = result;

      // Ignore drop outside the list
      if (!destination) {
        return;
      }

      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destList = lists.find((list) => list.id === destination.droppableId);

      if (sourceList.id === destList.id) {
        const newList = [...sourceList.items];
        const [removed] = newList.splice(source.index, 1);
        newList.splice(destination.index, 0, removed);

        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === sourceList.id ? { ...list, items: newList } : list
          )
        );
      } else {
        const sourceClone = [...sourceList.items];
        const destClone = [...destList.items];
        const [removed] = sourceClone.splice(source.index, 1);
        destClone.splice(destination.index, 0, removed);

        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === sourceList.id
              ? { ...list, items: sourceClone }
              : list.id === destList.id
              ? { ...list, items: destClone }
              : list
          )
        );
      }
    };

    return (
      (<div>
      {/* <button onClick={handleReSubmit} style={{width: '50px', height: '25px'}}></button> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="timeline">
        <div className="timeline-line"></div>
        <div className="timeline-arrow"></div>

          {lists.map((list, i) => (
            <div className="day" key={list.id}>
              {i % 2 !== 0 ? (
                <>
                  <div className="hello"><RightSide list={list}/></div>
                  <div className="Date">{list.date}</div>
                  <div className="LeftSide"><LeftSide list={list} timeOfDay={timeOfDay}  day={list.id} handleFeedback={handleFeedback}/></div>
                </>
              ) : (
                <>
                  <div className="LeftSide"><LeftSide list={list} timeOfDay={timeOfDay}  day={list.id} handleFeedback={handleFeedback}/></div>
                  <div className="Date">{list.date}</div>
                  <div className="hello"><RightSide list={list}/></div>
                </>
              )}
            </div>
          ))}
        </div>
      </DragDropContext>
      </div>)
    );
}

export default App;

