import {Edge, Node} from "@xyflow/react";
import {TypeObjectEnum} from "../enums/type-object.ts";

export type CurrentObjectType = {
	object: Node | Edge,
	typeObject: TypeObjectEnum,
}