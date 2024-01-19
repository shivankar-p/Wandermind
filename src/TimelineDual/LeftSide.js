import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './timelinedual'

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



const LeftSide = ({ list, timeOfDay }) => (
  <Droppable droppableId={list.id} >
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps} className="activities">
<InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title="Action"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item href="#">Append</Dropdown.Item>
          <Dropdown.Item href="#">Regenerate</Dropdown.Item>
        </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button" placeholder='Enter your query here' onKeyDown = {(event) => {
          console.log(event.target.value)
        }}/>
      </InputGroup>
        <div className="title-banner">
        <img src={list.bannerImage} alt="Banner" className="leftSide-banner-image" />
          <h2>{list.title}</h2>
          <br/>
        </div>
        {list.items.map((item, index) => (
          <Draggable draggableId={item.id} index={index} key={item.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="activity-box">
                <a class="close" onClick={(event) => {
                  console.log(list, item.id)
                  list.items = list.items.slice(1);
                }}></a>
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

