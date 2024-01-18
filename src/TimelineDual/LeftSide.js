import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './timelinedual.css'

const LeftSide = ({ list, timeOfDay }) => (
  <Droppable droppableId={list.id} >
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps} className="activities">
        <div className="title-banner">
        <img src={list.bannerImage} alt="Banner" className="leftSide-banner-image" />
          <h2>{list.title}</h2>
          <br/>
        </div>
        {list.items.map((item, index) => (
          <Draggable draggableId={item.id} index={index} key={item.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="activity-box">
                <h3>{timeOfDay[parseInt(item.id.split('-').pop()) - 1]}</h3>
                <p>{item.content}</p>
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default LeftSide;

