import React from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
import './App.css';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
// import GroupExample from './hardik/weather';

  const response = {
    "14th January": {
      title: "Day 1: Arrival and Exploration",
      morning: "After arriving in London, check into your hotel and freshen up.",
      afternoon: "Take rest sleep well and relax",
      evening: "**6:00 PM**: Explore Covent Garden, a vibrant district known for its street performers, boutique shops, and bustling markets. - Take a leisurely walk through the area and immerse yourself in the lively atmosphere.\n  **8:00 PM**: Enjoy a traditional British dinner at The Ivy, renowned for its classic menu and elegant ambiance. Try dishes like fish and chips or steak and ale pie."
    },
    "15th January": {
      title: "Day 2: Historical Landmarks and Architectural Marvels",
      morning: "**9:00 AM**: Start your day by visiting the Tower of London, a historic castle that has served various purposes throughout history. Explore the Crown Jewels exhibition and learn about the tower's fascinating past. **11:00 AM**: Cross the iconic Tower Bridge and enjoy panoramic views of the city from its high-level walkways. Don't forget to take some memorable pictures.",
      afternoon: "**1:00 PM**: Visit the majestic St. Paul's Cathedral, a masterpiece of Baroque architecture. Explore the interior, climb to the Whispering Gallery for exceptional acoustics, and enjoy breathtaking views from the Golden Gallery. Budget: $$\n  - **3:00 PM**: Take a guided tour of the Houses of Parliament and Big Ben, the iconic symbol of London. Marvel at the intricate Gothic architecture and learn about the political history of the United Kingdom. Budget: $\n\n-",
      evening: "  **6:00 PM**: Explore the vibrant neighborhood of Shoreditch, known for its street art and trendy atmosphere. Stroll through the streets and discover unique galleries, vintage shops, and vibrant nightlife.\n  - **8:00 PM**: Indulge in a delicious American-style dinner at Hard Rock Cafe London, located in the heart of the city. Enjoy classic burgers, ribs, or other American favorites while surrounded by iconic music memorabilia. Budget: $$\n\n**"
    },
    "16th January": {
      title: "Day 3: Outdoor Activities and Shopping",
      morning: "- **9:00 AM**: Visit the iconic British Museum, home to a vast collection of art and artifacts from around the world. Explore exhibits like the Rosetta Stone, Egyptian mummies, and ancient Greek sculptures. Budget: Free admission (donations encouraged)\n  - **11:30 AM**: Take a relaxing stroll along the South Bank of the River Thames, enjoying views of the city skyline. Make a stop at the famous London Eye, and consider taking a ride for stunning aerial views of London. Budget: $$\n\n-",
      afternoon: "**1:30 PM**: Explore the vibrant shopping district of Oxford Street, known for its numerous department stores, high-end fashion brands, and bustling atmosphere. Indulge in some retail therapy and pick up unique souvenirs.\n  - **4:00 PM**: Visit the luxurious department store Harrods in Knightsbridge. Explore its multiple floors filled with designer fashion, exquisite homeware, and gourmet food. Don't forget to visit the famous Food Halls for a variety of culinary treats.\n\n-",
      evening: "**6:30 PM**: Enjoy a leisurely dinner at Gordon Ramsay's York and Albany, offering a blend of British and American flavors. Experience delicious dishes like roasted beef Wellington or grilled lobster, crafted with culinary excellence. Budget: $$$\n  - **8:30 PM**: End your London trip by taking a relaxing evening walk along the Thames Embankment, enjoying the scenic views of the city's illuminated landmarks.\n\n**Please note that the budgets indicated ($, $$, $$$) are subjective and can vary based on personal preferences and prices at the time of travel."
    }
  }

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

const Timelinenew = () => {
  const [lists, setLists] = React.useState(responseToLists(response));
  const timeOfDay = ['Morning', 'Afternoon', 'Evening'];
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
                  <div className="LeftSide"><LeftSide list={list} timeOfDay={timeOfDay}/></div>
                </>
              ) : (
                <>
                  <div className="LeftSide"><LeftSide list={list} timeOfDay={timeOfDay}/></div>
                  <div className="Date">{list.date}</div>
                  <div className="hello"><RightSide list={list}/></div>
                </>
              )}
            </div>
          ))}
        </div>
      </DragDropContext>
    );
}

export default Timelinenew;

