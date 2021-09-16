import React, { useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { usePreloadedQuery, PreloadedQuery } from "react-relay";
import TodoTextInput from "./TodoTextInput";
import * as TodoAppQuery from "./__generated__/TodoAppQuery.graphql";
import TodoList from "./TodoList";
import TodoListFooter from "./TodoListFooter";
import useAddTodoMutation from "./useAddTodoMutation";

const graphql = require("babel-plugin-relay/macro");

interface Props {
  initialQueryRef: PreloadedQuery<TodoAppQuery.TodoAppQuery>;
}

function TodoApp(props: Props) {
  const data = usePreloadedQuery(
    graphql`
      query TodoAppQuery($userId: String!) {
        user(id: $userId) {
          id
          totalCount
          ...TodoListFooter_user
          ...TodoList_user
        }
      }
    `,
    props.initialQueryRef
  );
  const [addTodo] = useAddTodoMutation();

  const user = data.user;
  if (!user) {
    throw new Error("Expected user to be defined");
  }

  const handleTextInputSave = useCallback(
    (text: string) => {
      addTodo(text, user.id);
    },
    [addTodo, user.id]
  );

  const hasTodos = user?.totalCount > 0;

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoTextInput
            className="new-todo"
            onSave={handleTextInputSave}
            placeholder="What needs to be done?"
          />
        </header>

        <TodoList user={user} />
        {hasTodos && <TodoListFooter user={user} />}
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>

        <p>
          Created by the{" "}
          <a href="https://facebook.github.io/relay/">Relay team</a>
        </p>

        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}

export default function TodoAppWrapper({ initialQueryRef }: Props) {
  return (
    <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
      <React.Suspense fallback={<div>Loading</div>}>
        <TodoApp initialQueryRef={initialQueryRef} />
      </React.Suspense>
    </ErrorBoundary>
  );
}
