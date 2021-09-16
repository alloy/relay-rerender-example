import { useMutation } from "react-relay";
import { useCallback } from "react";
import { ConnectionHandler, RecordSourceSelectorProxy } from "relay-runtime";
import { RemoveCompletedTodosInput } from "./__generated__/useClearCompleteTodosMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

const mutation = graphql`
  mutation useClearCompleteTodosMutation($input: RemoveCompletedTodosInput!) {
    removeCompletedTodos(input: $input) {
      deletedTodoIds
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
  deletedIDs: Array<string | null | undefined>
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
  deletedIDs.forEach((deletedID: string | null | undefined) => {
    if (deletedID != null) {
      ConnectionHandler.deleteNode(connection, deletedID);
    }
  });
}

export default function useClearCompleteTodosMutation() {
  const [commit] = useMutation(mutation);
  return [
    useCallback(
      (userId: string, completedIds: Array<string | null | undefined>) => {
        const input: RemoveCompletedTodosInput = {
          userId: userId
        };

        return commit({
          variables: { input },
          updater: (store: RecordSourceSelectorProxy) => {
            const payload = store.getRootField("removeCompletedTodos");
            if (!payload) {
              return;
            }
            const deletedIds: any = payload.getValue("deletedTodoIds");
            sharedUpdater(store, userId, deletedIds);
          },
          optimisticUpdater: (store: RecordSourceSelectorProxy) => {
            sharedUpdater(store, userId, completedIds);
          }
        });
      },
      [commit]
    )
  ];
}
