import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ item, initialMousePosition }) => {
  const [, drag, preview] = useDrag({
    type: 'BOX',
    item: { ...item },
  });

  const itemRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (itemRef.current) {
        const { clientX, clientY } = e;
        const deltaX = clientX - initialMousePosition.x;
        const deltaY = clientY - initialMousePosition.y;

        // Apply transform directly for dragging
        itemRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [initialMousePosition]);

  // Use preview to attach the drag preview
  useEffect(() => {
    preview(drag(itemRef.current));
  }, [preview, drag]);

  return (
    <div
      ref={itemRef}
      style={{
        left: initialMousePosition.x - 20,
        top: initialMousePosition.y - 20,
        opacity: 0.5,
        cursor: 'move',
        border: '1px solid #ddd',
        padding: '8px',
        marginBottom: '8px',
        borderRadius: '4px',
        width: '200px',
        background: 'gray',
        position: 'absolute',
        zIndex: 1000,
      }}
    >
      <h3>{item.cardTitle}</h3>
      <p>{item.cardDetailedText}</p>
    </div>
  );
};

export default DraggableItem;
