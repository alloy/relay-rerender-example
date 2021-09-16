/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoAppQueryVariables = {
    userId: string;
};
export type TodoAppQueryResponse = {
    readonly user: {
        readonly id: string;
        readonly totalCount: number;
        readonly " $fragmentRefs": FragmentRefs<"TodoListFooter_user" | "TodoList_user">;
    } | null;
};
export type TodoAppQuery = {
    readonly response: TodoAppQueryResponse;
    readonly variables: TodoAppQueryVariables;
};



/*
query TodoAppQuery(
  $userId: String!
) {
  user(id: $userId) {
    id
    totalCount
    ...TodoListFooter_user
    ...TodoList_user
  }
}

fragment TodoListFooter_user on User {
  id
  userId
  completedCount
  todos(first: 2147483647) {
    edges {
      node {
        id
        complete
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  totalCount
}

fragment TodoList_user on User {
  todos(first: 2147483647) {
    edges {
      node {
        id
        complete
        ...Todo_todo
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  id
  userId
  totalCount
  completedCount
  ...Todo_user
}

fragment Todo_todo on Todo {
  complete
  id
  text
}

fragment Todo_user on User {
  id
  userId
  totalCount
  completedCount
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2147483647
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoAppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TodoListFooter_user"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TodoList_user"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TodoAppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "userId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "completedCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "TodoConnection",
            "kind": "LinkedField",
            "name": "todos",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "TodoEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Todo",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "complete",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "text",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "todos(first:2147483647)"
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "TodoList_todos",
            "kind": "LinkedHandle",
            "name": "todos"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cf60cccb542089f14140a4b11e1ce026",
    "id": null,
    "metadata": {},
    "name": "TodoAppQuery",
    "operationKind": "query",
    "text": "query TodoAppQuery(\n  $userId: String!\n) {\n  user(id: $userId) {\n    id\n    totalCount\n    ...TodoListFooter_user\n    ...TodoList_user\n  }\n}\n\nfragment TodoListFooter_user on User {\n  id\n  userId\n  completedCount\n  todos(first: 2147483647) {\n    edges {\n      node {\n        id\n        complete\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  totalCount\n}\n\nfragment TodoList_user on User {\n  todos(first: 2147483647) {\n    edges {\n      node {\n        id\n        complete\n        ...Todo_todo\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n  userId\n  totalCount\n  completedCount\n  ...Todo_user\n}\n\nfragment Todo_todo on Todo {\n  complete\n  id\n  text\n}\n\nfragment Todo_user on User {\n  id\n  userId\n  totalCount\n  completedCount\n}\n"
  }
};
})();
(node as any).hash = '4485a7b9397e8720f71fb6154d2fcefc';
export default node;
