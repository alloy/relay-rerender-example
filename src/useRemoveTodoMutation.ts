import { useMutation } from "react-relay";
import { useCallback } from "react";
import { ConnectionHandler, RecordSourceSelectorProxy } from "relay-runtime";
import { RemoveTodoInput } from "./__generated__/useRemoveTodoMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

const mutation = graphql`
  mutation useRemoveTodoMutation($input: RemoveTodoInput!) {
    removeTodo(input: $input) {
      deletedTodoId
      user {
        completedCount
        totalCount
      }
    }
  }
`;

function sharedUpdater(
  store: RecordSourceSelectorProxy,
  userId: string,
  deletedID: string
) {
  const userProxy = store.get(userId);
  if (!userProxy) {
    return;
  }
  const connection = ConnectionHandler.getConnection(
    userProxy,
    "TodoList_todos"
  );
  if (!connection) {
    return;
  }
  ConnectionHandler.deleteNode(connection, deletedID);
}

export default function useRemoveTodoMutation() {
  const [commit] = useMutation(mutation);
  return [
    useCallback(
      (todoId: string, userId: string) => {
        const input: RemoveTodoInput = {
          id: todoId,
          userId: userId
        };

        return commit({
          variables: {
            input
          },
          updater: (store: RecordSourceSelectorProxy) => {
            const payload = store.getRootField("removeTodo");
            if (!payload) {
              return;
            }
            const deletedTodoId = payload.getValue("deletedTodoId");

            if (typeof deletedTodoId !== "string") {
              throw new Error(
                `Expected removeTodo.deletedTodoId to be string, but got: ${typeof deletedTodoId}`
              );
            }

            sharedUpdater(store, userId, deletedTodoId);
          },
          optimisticUpdater: (store: RecordSourceSelectorProxy) => {
            sharedUpdater(store, userId, todoId);
          }
        });
      },
      [commit]
    )
  ];
}
