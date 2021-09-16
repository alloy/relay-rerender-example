import { useMutation } from "react-relay";
import { useCallback } from "react";
import {
  useChangeTodoStatusMutationResponse,
  ChangeTodoStatusInput
} from "./__generated__/useChangeTodoStatusMutation.graphql";

const graphql = require("babel-plugin-relay/macro");

const mutation = graphql`
  mutation useChangeTodoStatusMutation($input: ChangeTodoStatusInput!) {
    changeTodoStatus(input: $input) {
      todo {
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
  todoId: string;
  userId: string;
  completedCount: number;
}

function getOptimisticResponse(
  optimisticData: MutationData
): useChangeTodoStatusMutationResponse {
  return {
    changeTodoStatus: {
      todo: {
        complete: optimisticData.complete,
        id: optimisticData.todoId
      },
      user: {
        id: optimisticData.userId,
        completedCount: optimisticData.complete
          ? optimisticData.completedCount + 1
          : optimisticData.completedCount - 1
      }
    }
  };
}

export default function useChangeTodoStatusMutation() {
  const [commit] = useMutation(mutation);
  return [
    useCallback(
      (mutationData: MutationData) => {
        const input: ChangeTodoStatusInput = {
          complete: mutationData.complete,
          userId: mutationData.userId,
          id: mutationData.todoId
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
