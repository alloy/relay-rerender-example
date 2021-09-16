/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RemoveCompletedTodosInput = {
    userId: string;
    clientMutationId?: string | null;
};
export type useClearCompleteTodosMutationVariables = {
    input: RemoveCompletedTodosInput;
};
export type useClearCompleteTodosMutationResponse = {
    readonly removeCompletedTodos: {
        readonly deletedTodoIds: ReadonlyArray<string> | null;
        readonly user: {
            readonly completedCount: number;
            readonly totalCount: number;
        };
    } | null;
};
export type useClearCompleteTodosMutation = {
    readonly response: useClearCompleteTodosMutationResponse;
    readonly variables: useClearCompleteTodosMutationVariables;
};



/*
mutation useClearCompleteTodosMutation(
  $input: RemoveCompletedTodosInput!
) {
  removeCompletedTodos(input: $input) {
    deletedTodoIds
    user {
      completedCount
      totalCount
      id
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
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "deletedTodoIds",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "completedCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useClearCompleteTodosMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveCompletedTodosPayload",
        "kind": "LinkedField",
        "name": "removeCompletedTodos",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useClearCompleteTodosMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveCompletedTodosPayload",
        "kind": "LinkedField",
        "name": "removeCompletedTodos",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "27dc610ba0a989b698543a810eb6b5c3",
    "id": null,
    "metadata": {},
    "name": "useClearCompleteTodosMutation",
    "operationKind": "mutation",
    "text": "mutation useClearCompleteTodosMutation(\n  $input: RemoveCompletedTodosInput!\n) {\n  removeCompletedTodos(input: $input) {\n    deletedTodoIds\n    user {\n      completedCount\n      totalCount\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '108eada9e88d6bded77850429cae6cd1';
export default node;
