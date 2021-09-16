import React, { useCallback } from "react";
import { useFragment } from "react-relay";
import { TodoListFooter_user$key } from "./__generated__/TodoListFooter_user.graphql";
import useClearCompleteTodosMutation from "./useClearCompleteTodosMutation";
const graphql = require("babel-plugin-relay/macro");

interface Props {
  user: TodoListFooter_user$key;
}

export default function TodoListFooter(props: Props) {
  const user = useFragment(
    graphql`
      fragment TodoListFooter_user on User {
        id
        userId
        completedCount
        todos(
          first: 2147483647 # max GraphQLInt
        ) @connection(key: "TodoList_todos") {
          edges {
            node {
              id
              complete
            }
          }
        }
        totalCount
      }
    `,
    props.user
  );
  const [clearCompleteTodos] = useClearCompleteTodosMutation();
  const { todos, totalCount, completedCount } = user;

  const numRemainingTodos = totalCount - completedCount;

  const handleRemoveCompletedTodosClick = useCallback(() => {
    const completedIds =
      todos && todos.edges
        ? todos.edges
            .filter(edge => edge?.node?.complete === true)
            .map(edge => edge?.node?.id)
        : [];
    clearCompleteTodos(user.id, completedIds);
  }, [clearCompleteTodos, user.id, todos]);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{numRemainingTodos}</strong> item
        {numRemainingTodos === 1 ? "" : "s"} left
      </span>

      {completedCount > 0 && (
        <button
          className="clear-completed"
          onClick={handleRemoveCompletedTodosClick}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
}
