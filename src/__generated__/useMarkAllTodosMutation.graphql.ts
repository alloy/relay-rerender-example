/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MarkAllTodosInput = {
    complete: boolean;
    userId: string;
    clientMutationId?: string | null;
};
export type useMarkAllTodosMutationVariables = {
    input: MarkAllTodosInput;
};
export type useMarkAllTodosMutationResponse = {
    readonly markAllTodos: {
        readonly changedTodos: ReadonlyArray<{
            readonly id: string;
            readonly complete: boolean;
        }> | null;
        readonly user: {
            readonly id: string;
            readonly completedCount: number;
        };
    } | null;
};
export type useMarkAllTodosMutation = {
    readonly response: useMarkAllTodosMutationResponse;
    readonly variables: useMarkAllTodosMutationVariables;
};



/*
mutation useMarkAllTodosMutation(
  $input: MarkAllTodosInput!
) {
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "MarkAllTodosPayload",
    "kind": "LinkedField",
    "name": "markAllTodos",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Todo",
        "kind": "LinkedField",
        "name": "changedTodos",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "complete",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "completedCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useMarkAllTodosMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useMarkAllTodosMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "99a6c3b99e43bbfe8351459d128a0c73",
    "id": null,
    "metadata": {},
    "name": "useMarkAllTodosMutation",
    "operationKind": "mutation",
    "text": "mutation useMarkAllTodosMutation(\n  $input: MarkAllTodosInput!\n) {\n  markAllTodos(input: $input) {\n    changedTodos {\n      id\n      complete\n    }\n    user {\n      id\n      completedCount\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'eddc4bb1aa1696647a8196366028df69';
export default node;
