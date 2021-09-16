import { useMutation } from "react-relay";
import { useCallback } from "react";
import {
  ConnectionHandler,
  RecordSourceSelectorProxy,
  RecordProxy
} from "relay-runtime";
import { AddTodoInput } from "./__generated__/useAddTodoMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

const mutation = graphql`
  mutation useAddTodoMutation($input: AddTodoInput!) {
    addTodo(input: $input) {
      todoEdge {
        __typename
        cursor
        node {
          complete
          id
          text
        }
      }
      user {
        id
        totalCount
      }
    }
  }
`;

function sharedUpdater(
  store: RecordSourceSelectorProxy,
  userId: string,
  newEdge: RecordProxy
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
  ConnectionHandler.insertEdgeAfter(connection, newEdge);
}
let tempID = 0;

export default function useAddTodoMutation() {
  const [commit] = useMutation(mutation);
  return [
    useCallback(
      (text: string, userId: string) => {
        const input: AddTodoInput = {
          text,
          userId: userId
        };
        return commit({
          variables: {
            input
          },
          updater: (store: RecordSourceSelectorProxy) => {
            const payload = store.getRootField("addTodo");
            if (!payload) {
              return;
            }
            const newEdge = payload.getLinkedRecord("todoEdge");
            if (!newEdge) {
              return;
            }
            sharedUpdater(store, userId, newEdge);
          },
          optimisticUpdater: (store: RecordSourceSelectorProxy) => {
            const id = "client:newTodo:" + tempID++;
            const node = store.create(id, "Todo");
            node.setValue(text, "text");
            node.setValue(id, "id");

            const newEdge = store.create(
              "client:newEdge:" + tempID++,
              "TodoEdge"
            );
            newEdge.setLinkedRecord(node, "node");
            sharedUpdater(store, userId, newEdge);

            // Get the UserProxy, and update the totalCount
            const userProxy = store.get(userId);

            if (!userProxy) {
              throw new Error("Failed to retrieve userProxy from store");
            }

            const totalCount = userProxy.getValue("totalCount");

            if (typeof totalCount !== "number") {
              throw new Error(
                `Expected userProxy.totalCount to be number, but got: ${typeof totalCount}`
              );
            }

            userProxy.setValue(totalCount + 1, "totalCount");
          }
        });
      },
      [commit]
    )
  ];
}
