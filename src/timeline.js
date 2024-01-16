import React, { useRef, useState, useEffect } from "react"
import { Chrono } from "react-chrono";
import DraggableItem from "./DraggableItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const Timeline = () => {
  
  const [items, setItems] = useState([
    {
      id: "dumid",
      title: "14th January",
      cardTitle: "Day1 - Exploring London",
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
      },
      items: [
        { cardTitle: 'Morning', cardDetailedText: 'morning desc1' },
        { cardTitle: 'Afternoon', cardDetailedText: 'afternoon desc1' },
        { cardTitle: 'Evening', cardDetailedText: 'evening desc1' }
      ],
    },
    {
      title: "15th January",
      cardTitle: "Dunkirk",
      items: [
        { cardTitle: 'Morning', cardDetailedText: 'morning desc2' },
        { cardTitle: 'Afternoon', cardDetailedText: 'afternoon desc2' },
        { cardTitle: 'Evening', cardDetailedText: 'evening desc2' }
      ],
    },
    {
      title: "16th January",
      cardTitle: "Dunkirk",
      items: [
        { cardTitle: 'Morning', cardDetailedText: 'morning desc3' },
        { cardTitle: 'Afternoon', cardDetailedText: 'afternoon desc3' },
        { cardTitle: 'Evening', cardDetailedText: 'evening desc3' }
      ],
    },
  ]);

  //this will be api response
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
      evening: "  - **6:00 PM**: Explore the vibrant neighborhood of Shoreditch, known for its street art and trendy atmosphere. Stroll through the streets and discover unique galleries, vintage shops, and vibrant nightlife.\n  - **8:00 PM**: Indulge in a delicious American-style dinner at Hard Rock Cafe London, located in the heart of the city. Enjoy classic burgers, ribs, or other American favorites while surrounded by iconic music memorabilia. Budget: $$\n\n**"
    },
    "16th January": {
      title: "Day 3: Outdoor Activities and Shopping",
      morning: "- **9:00 AM**: Visit the iconic British Museum, home to a vast collection of art and artifacts from around the world. Explore exhibits like the Rosetta Stone, Egyptian mummies, and ancient Greek sculptures. Budget: Free admission (donations encouraged)\n  - **11:30 AM**: Take a relaxing stroll along the South Bank of the River Thames, enjoying views of the city skyline. Make a stop at the famous London Eye, and consider taking a ride for stunning aerial views of London. Budget: $$\n\n-",
      afternoon: "**Afternoon**:\n  - **1:30 PM**: Explore the vibrant shopping district of Oxford Street, known for its numerous department stores, high-end fashion brands, and bustling atmosphere. Indulge in some retail therapy and pick up unique souvenirs.\n  - **4:00 PM**: Visit the luxurious department store Harrods in Knightsbridge. Explore its multiple floors filled with designer fashion, exquisite homeware, and gourmet food. Don't forget to visit the famous Food Halls for a variety of culinary treats.\n\n-",
      evening: "**6:30 PM**: Enjoy a leisurely dinner at Gordon Ramsay's York and Albany, offering a blend of British and American flavors. Experience delicious dishes like roasted beef Wellington or grilled lobster, crafted with culinary excellence. Budget: $$$\n  - **8:30 PM**: End your London trip by taking a relaxing evening walk along the Thames Embankment, enjoying the scenic views of the city's illuminated landmarks.\n\n**Please note that the budgets indicated ($, $$, $$$) are subjective and can vary based on personal preferences and prices at the time of travel."
    }
  }

//   const items = [{
//     id: "dumid",
//     title: "14th January",
//     cardTitle: "Day1 - Exploring London",
//     media: {
//       type: 'IMAGE',
//       source: {
//         url: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
//       },
//     },
//     items: [
//       { cardTitle: 'Morning',
//         cardDetailedText: 'morning desc' },
//       { cardTitle: 'Afternoon',
//         cardDetailedText: 'afternoon desc' },
//       { cardTitle: 'Evening',
//         cardDetailedText: 'evening desc'}
//     ],
//   },
//   {
//     title: "15th January",
//     cardTitle: "Dunkirk",
//     items: [
//       { cardTitle: 'Morning',
//         cardDetailedText: 'morning desc' },
//       { cardTitle: 'Afternoon',
//         cardDetailedText: 'afternoon desc' },
//       { cardTitle: 'Evening',
//         cardDetailedText: 'evening desc'}
//     ],
//   },
//   {
//     title: "16th January",
//     cardTitle: "Dunkirk",
//     items: [
//       { cardTitle: 'Morning',
//         cardDetailedText: 'morning desc' },
//       { cardTitle: 'Afternoon',
//         cardDetailedText: 'afternoon desc' },
//       { cardTitle: 'Evening',
//         cardDetailedText: 'evening desc'}
//     ],
//   },
// ];

  // const items = [];

  // for (const [date, details] of Object.entries(response)) {
  //   const item = {
  //     title: date,
  //     cardTitle: details.title,
  //     media: {
  //       type: 'IMAGE',
  //       source: {
  //         url: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
  //       },
  //     },
  //     items: []
  //   };

  //   //Extract morning, afternoon, and evening details
  //   const timesOfDay = ['morning', 'afternoon', 'evening'];
  //   timesOfDay.forEach(time => {
  //     if (details[time]) {
  //       item.items.push({
  //         cardTitle: time.charAt(0).toUpperCase() + time.slice(1),
  //         cardDetailedText: details[time]
  //       });
  //     }
  //   });

  //   items.push(item);
  // }

  const commonAncestorRef = useRef(null);
  const [removedItem, setRemovedItem] = useState(null);
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    // This useEffect will run whenever removedItem changes
    console.log("Removed Item:", removedItem);
  }, [removedItem]);


  const handleClick = (event) => {
    // Access the clicked element
    const clickedElement = event.target;

    // Check if the clicked element is a descendant of the common ancestor
    if (commonAncestorRef.current.contains(clickedElement)) {
      // Retrieve information about the element (e.g., id, class, text content)
      const elementClass = clickedElement.className;
      const elementTextContent = clickedElement.textContent;

      console.log(elementClass.split(" ").pop());

      if(elementClass.split(" ").pop() === "rc-card")
      {
        let removedItem = null;
        setItems(prevItems => {
          const updatedItems = prevItems.map(item => {
            const updatedNestedItems = item.items.filter(nestedItem => {
              return `${nestedItem.cardTitle}${nestedItem.cardDetailedText}` !== elementTextContent;
            });

             // Check if the item was removed
        if (updatedNestedItems.length !== item.items.length) {
          // Find the removed item
          removedItem = item.items.find(
            (nestedItem) =>
              `${nestedItem.cardTitle}${nestedItem.cardDetailedText}` ===
              elementTextContent
          );
          
        }
  
            return { ...item, items: updatedNestedItems };
          });
  
          return updatedItems;
        });

        if (removedItem) {
          setRemovedItem(removedItem);
          setInitialMousePosition({ x: event.clientX, y: event.clientY });
        }

      }

      console.log('Clicked Element Class:', elementClass);
      console.log('Clicked Element Text Content:', elementTextContent);
    }
  };

    return (
    <DndProvider backend={HTML5Backend}>
    <div ref={commonAncestorRef} onMouseDown={handleClick} style={{width: '1200px', userSelect: 'none'}}>
      {removedItem && <DraggableItem key="removedItem" item={removedItem} initialMousePosition={initialMousePosition}/>}
      <Chrono items={items} mode = "VERTICAL_ALTERNATING" allowDynamicUpdate={true} />
    </div>
    </DndProvider>
    );
}

export default Timeline;