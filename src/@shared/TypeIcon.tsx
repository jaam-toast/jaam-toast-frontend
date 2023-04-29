import {
  BsType,
  Bs123,
  BsFillFileTextFill,
  BsFillCalendarCheckFill,
  BsToggleOn,
  BsLink45Deg,
  BsFillEnvelopeAtFill,
} from "react-icons/bs";

import { ColorBox } from "./ColorBox";
import { ColorKeys } from "../@config/colors";

import { JaamSchemaPropertyType } from "@jaam-schema/src";

type Size = "small" | "medium" | "large";

type Options = {
  type: JaamSchemaPropertyType;
  color?: ColorKeys;
  size?: Size;
  onClick?: () => void;
};

export function TypeIcon({ type, color, size, onClick }: Options) {
  switch (type) {
    case "text": {
      return (
        <div onClick={onClick}>
          <ColorBox color={color || "LAVENDER"} size={size || "medium"}>
            <BsType size={24} />
          </ColorBox>
        </div>
      );
    }
    case "textarea": {
      return (
        <div onClick={onClick}>
          <ColorBox color={color || "LAVENDER"} size={size || "medium"}>
            <BsFillFileTextFill size={24} />
          </ColorBox>
        </div>
      );
    }
    case "number": {
      return (
        <div onClick={onClick}>
          <ColorBox color={color || "TAN"} size={size || "medium"}>
            <Bs123 size={24} />
          </ColorBox>
        </div>
      );
    }
    case "date": {
      return (
        <div onClick={onClick}>
          <ColorBox color={color || "LEMON"} size={size || "medium"}>
            <BsFillCalendarCheckFill size={24} />
          </ColorBox>
        </div>
      );
    }
    case "boolean": {
      return (
        <div onClick={onClick}>
          <ColorBox color={color || "MINT"} size={size || "medium"}>
            <BsToggleOn size={24} />
          </ColorBox>
        </div>
      );
    }
    case "link": {
      return (
        <div onClick={onClick}>
          <ColorBox color={color || "STRAWBERRY"} size={size || "medium"}>
            <BsLink45Deg size={24} />
          </ColorBox>
        </div>
      );
    }
    case "email": {
      return (
        <div onClick={onClick}>
          <ColorBox color={color || "TAN"} size={size || "medium"}>
            <BsFillEnvelopeAtFill size={24} />
          </ColorBox>
        </div>
      );
    }
    default: {
      return null;
    }
  }
}
