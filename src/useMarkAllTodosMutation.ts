import { useMutation } from "react-relay";
import { useCallback } from "react";
import {
  useMarkAllTodosMutationResponse,
  MarkAllTodosInput
} from "./__generated__/useMarkAllTodosMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

const mutation = graphql`
  mutation useMarkAllTodosMutation($input: MarkAllTodosInput!) {
    markAllTodos(input: $input) {
      changedTodos {
        id
        complete
      }
      user {
        id
        completedCount
      }
    }
  }
`;

interface MutationData {
  complete: boolean;
  todoIds: Array<string | null | undefined>;
  userId: string;
  totalCount: number;
}

function getOptimisticResponse(
  mutationData: MutationData
): useMarkAllTodosMutationResponse {
  const { complete, todoIds, userId, totalCount } = mutationData;
  const changedTodos = todoIds
    .filter((todoId): todoId is NonNullable<string> => todoId != null)
    .map((todoId: string) => ({
      complete: complete,
      id: todoId
    }));

  return {
    markAllTodos: {
      changedTodos,
      user: {
        id: userId,
        completedCount: complete ? totalCount : 0
      }
    }
  };
}

export default function useMarkAllTodosMutation() {
  const [commit] = useMutation(mutation);
  return [
    useCallback(
      (mutationData: MutationData) => {
        const input: MarkAllTodosInput = {
          complete: mutationData.complete,
          userId: mutationData.userId
        };

        return commit({
          variables: { input },
          optimisticResponse: getOptimisticResponse(mutationData)
        });
      },
      [commit]
    )
  ];
}
