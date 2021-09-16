import React from "react";
import ReactDOM from "react-dom";
// import "todomvc-app-css/index.css";
import "./base.css";
import "./index.css";
import TodoApp from "./TodoApp";
import reportWebVitals from "./reportWebVitals";
import { loadQuery, RelayEnvironmentProvider } from "react-relay";
import TodoAppEnvironment from "./TodoAppEnvironment";
import * as TodoAppQuery from "./__generated__/TodoAppQuery.graphql";

const initialQueryRef = loadQuery<TodoAppQuery.TodoAppQuery>(
  TodoAppEnvironment,
  TodoAppQuery.default,
  {
    userId: "me"
  }
);
ReactDOM.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={TodoAppEnvironment}>
      <TodoApp initialQueryRef={initialQueryRef} />
    </RelayEnvironmentProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
