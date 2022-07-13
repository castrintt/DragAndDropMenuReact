import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const dataList = [
    { id: "1", label: "List Item 1" },
    { id: "2", label: "List Item 2" },
    { id: "3", label: "List Item 3" },
    { id: "4", label: "List Item 4" },
    { id: "5", label: "List Item 5" },
    { id: "6", label: "List Item 6" },
  ];
  const [dragDropList, setDragDropList] = useState(dataList);

  const onDragComplete = (result) => {
    if (!result.destination) return;

    const arr = [...dragDropList];

    //Changing the position of Array element
    let removedItem = arr.splice(result.source.index, 1)[0];
    arr.splice(result.destination.index, 0, removedItem);

    //Updating the list
    setDragDropList(arr);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">Drag and Drop List</div>

        <DragDropContext onDragEnd={onDragComplete}>
          <Droppable droppableId="drag-drop-list">
            {(provided, snapshot) => (
              <div
                className="drag-drop-list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {dragDropList.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.label}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="item-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <span className="material-symbols-outlined">
                          drag_indicator
                        </span>
                        <p className="label">{item.label}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;