import { useMutation } from "react-relay";
import { useCallback } from "react";
import {
  useRenameTodoMutationResponse,
  RenameTodoInput
} from "./__generated__/useRenameTodoMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

const mutation = graphql`
  mutation useRenameTodoMutation($input: RenameTodoInput!) {
    renameTodo(input: $input) {
      todo {
        id
        text
      }
    }
  }
`;

function getOptimisticResponse(
  text: string,
  todoId: string
): useRenameTodoMutationResponse {
  return {
    renameTodo: {
      todo: {
        id: todoId,
        text: text
      }
    }
  };
}

export default function useRenameTodoMutation() {
  const [commit] = useMutation(mutation);
  return [
    useCallback(
      (text: string, todoId: string) => {
        const input: RenameTodoInput = {
          text,
          id: todoId
        };

        return commit({
          variables: { input },
          optimisticResponse: getOptimisticResponse(text, todoId)
        });
      },
      [commit]
    )
  ];
}
