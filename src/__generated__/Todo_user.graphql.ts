/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Todo_user = {
    readonly id: string;
    readonly userId: string;
    readonly totalCount: number;
    readonly completedCount: number;
    readonly " $refType": "Todo_user";
};
export type Todo_user$data = Todo_user;
export type Todo_user$key = {
    readonly " $data"?: Todo_user$data;
    readonly " $fragmentRefs": FragmentRefs<"Todo_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Todo_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
      "name": "totalCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "completedCount",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '7d4a99e73771e30c8a0ba7cb397430e3';
export default node;
