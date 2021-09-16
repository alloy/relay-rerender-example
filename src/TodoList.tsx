import React, { useCallback, SyntheticEvent } from "react";
import { useFragment } from "react-relay";
import Todo from "./Todo";
import { TodoList_user$key } from "./__generated__/TodoList_user.graphql";
import useMarkAllTodosMutation from "./useMarkAllTodosMutation";
const graphql = require("babel-plugin-relay/macro");

interface Props {
  user: TodoList_user$key;
}

export default function TodoList(props: Props) {
  const user = useFragment(
    graphql`
      fragment TodoList_user on User {
        todos(
          first: 2147483647 # max GraphQLInt
        ) @connection(key: "TodoList_todos") {
          edges {
            node {
              id
              complete
              ...Todo_todo
            }
          }
        }
        id
        userId
        totalCount
        completedCount
        ...Todo_user
      }
    `,
    props.user
  );
  const [markAllTodos] = useMarkAllTodosMutation();
  const { todos, totalCount, completedCount } = user;

  const handleMarkAllChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      const complete = e.currentTarget.checked;

      if (todos != null && todos.edges != null) {
        const todoIds = todos.edges
          .map(edge => edge?.node?.id)
          .filter(id => id != null);
        markAllTodos({
          complete,
          todoIds,
          userId: user.id,
          totalCount: user.totalCount
        });
      }
    },
    [markAllTodos, todos, user.id, user.totalCount]
  );

  const nodes = todos && todos.edges ? todos.edges.map(edge => edge?.node) : [];

  return (
    <section className="TodoList">
      <input
        checked={totalCount === completedCount}
        className="toggle-all"
        onChange={handleMarkAllChange}
        type="checkbox"
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {nodes.map(node =>
          node != null ? <Todo key={node.id} todo={node} user={user} /> : null
        )}
      </ul>
    </section>
  );
}
