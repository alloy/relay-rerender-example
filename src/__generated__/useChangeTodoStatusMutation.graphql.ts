/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ChangeTodoStatusInput = {
    complete: boolean;
    id: string;
    userId: string;
    clientMutationId?: string | null;
};
export type useChangeTodoStatusMutationVariables = {
    input: ChangeTodoStatusInput;
};
export type useChangeTodoStatusMutationResponse = {
    readonly changeTodoStatus: {
        readonly todo: {
            readonly id: string;
            readonly complete: boolean;
        };
        readonly user: {
            readonly id: string;
            readonly completedCount: number;
        };
    } | null;
};
export type useChangeTodoStatusMutation = {
    readonly response: useChangeTodoStatusMutationResponse;
    readonly variables: useChangeTodoStatusMutationVariables;
};



/*
mutation useChangeTodoStatusMutation(
  $input: ChangeTodoStatusInput!
) {
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
    "concreteType": "ChangeTodoStatusPayload",
    "kind": "LinkedField",
    "name": "changeTodoStatus",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Todo",
        "kind": "LinkedField",
        "name": "todo",
        "plural": false,
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
    "name": "useChangeTodoStatusMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useChangeTodoStatusMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "41db6cc01ad247d6bd25f0c9df14c6f5",
    "id": null,
    "metadata": {},
    "name": "useChangeTodoStatusMutation",
    "operationKind": "mutation",
    "text": "mutation useChangeTodoStatusMutation(\n  $input: ChangeTodoStatusInput!\n) {\n  changeTodoStatus(input: $input) {\n    todo {\n      id\n      complete\n    }\n    user {\n      id\n      completedCount\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '05f7e7aaf8ff89087a9891852c1efbac';
export default node;
