import { Slide } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import TodoListItem from "./TodoListItem";
import DragHandler from "../../components/DragHandler";

const TodoListDraggable = (props) => {
  const { item, index, showConfirmation, mount, unmountHandler } = props;

  return (
    <Draggable
      key={item.id}
      draggableId={"draggable-" + item.id}
      index={index}
      isDragDisabled={item.completed}
    >
      {(provided, snapshot) => (
        <Slide
          in={mount}
          timeout={{ enter: 300, exit: 200 }}
          direction="right"
          mountOnEnter
          unmountOnExit
        >
          <div
            className="todoListItem"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <DragHandler dragHandleProps={provided.dragHandleProps} />
            <TodoListItem
              key={item.id}
              item={item}
              showConfirmation={showConfirmation}
              onUnmount={unmountHandler}
            />
          </div>
        </Slide>
      )}
    </Draggable>
  );
};

export default TodoListDraggable;
