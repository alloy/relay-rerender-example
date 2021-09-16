import classnames from "classnames";
import React, { useCallback, useState, SyntheticEvent } from "react";
import { useFragment } from "react-relay";
import TodoTextInput from "./TodoTextInput";
import { Todo_user$key } from "./__generated__/Todo_user.graphql";
import { Todo_todo$key } from "./__generated__/Todo_todo.graphql";
import useChangeTodoStatusMutation from "./useChangeTodoStatusMutation";
import useRemoveTodoMutation from "./useRemoveTodoMutation";
import useRenameTodoMutation from "./useRenameTodoMutation";
const graphql = require("babel-plugin-relay/macro");

interface Props {
  user: Todo_user$key;
  todo: Todo_todo$key;
}

export default function Todo(props: Props) {
  const user = useFragment(
    graphql`
      fragment Todo_user on User {
        id
        userId
        totalCount
        completedCount
      }
    `,
    props.user
  );
  const todo = useFragment(
    graphql`
      fragment Todo_todo on Todo {
        complete
        id
        text
      }
    `,
    props.todo
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [changeTodoStatusMutation] = useChangeTodoStatusMutation();
  const [removeTodoMutation] = useRemoveTodoMutation();
  const [renameTodoMutation] = useRenameTodoMutation();

  const removeTodo = useCallback(() => {
    removeTodoMutation(todo.id, user.id);
  }, [removeTodoMutation, todo.id, user.id]);

  const handleCompleteChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      const complete = e.currentTarget.checked;
      changeTodoStatusMutation({
        complete,
        userId: user.id,
        todoId: todo.id,
        completedCount: user.completedCount
      });
    },
    [changeTodoStatusMutation, user.id, todo.id, user.completedCount]
  );

  const handleDestroyClick = () => removeTodo();
  const handleLabelDoubleClick = () => setIsEditing(true);
  const handleTextInputCancel = () => setIsEditing(false);

  const handleTextInputDelete = () => {
    setIsEditing(false);
    removeTodo();
  };

  const handleTextInputSave = useCallback(
    (text: string) => {
      setIsEditing(false);
      renameTodoMutation(text, todo.id);
    },
    [renameTodoMutation, todo.id]
  );

  return (
    <li
      className={classnames({
        completed: todo.complete,
        editing: isEditing
      })}
    >
      <div className="view">
        <input
          checked={todo.complete}
          className="toggle"
          onChange={handleCompleteChange}
          type="checkbox"
        />

        <label onDoubleClick={handleLabelDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={handleDestroyClick} />
      </div>

      {isEditing && (
        <TodoTextInput
          className="edit"
          commitOnBlur={true}
          initialValue={todo.text}
          onCancel={handleTextInputCancel}
          onDelete={handleTextInputDelete}
          onSave={handleTextInputSave}
        />
      )}
    </li>
  );
}
