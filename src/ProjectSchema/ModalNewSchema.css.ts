import { style } from "@vanilla-extract/css";
import { pretendard } from "../@styles/font.css";
import { s } from "../@styles";
import { COLORS } from "../@config/colors";

export const container = style([
  s.flexColumn,
  s.border,
  s.scroll,
  {
    margin: "1rem",
    padding: "0 2rem",
    width: "30rem",
    minHeight: "40rem",
    maxHeight: "40rem",
    backgroundColor: COLORS.WHITE,
  },
]);

export const header = style([
  s.flexColumn,
  s.fullWidth,
  {
    position: "sticky",
    zIndex: 10,
    top: 0,
    left: 0,
    padding: "2rem 0",
    backgroundColor: COLORS.WHITE,
    fontWeight: 400,
  },
]);

export const nav = style([s.flex, { gap: "1rem", paddingTop: "2rem " }]);

export const footer = style([
  s.flex,
  s.flexSpaceBetween,
  {
    flexDirection: "row-reverse",
    // position: "sticky",
    bottom: 0,
    padding: "1rem 0",
    backgroundColor: "inherit",
  },
]);

export const wrapper = style([
  s.scroll,
  { height: "30rem", paddingBottom: "3rem", fontSize: "0.95rem" },
]);

export const menu = style([
  s.pointer,
  {
    ":hover": {
      borderBottom: `1px solid ${COLORS.BLACK}`,
    },
  },
]);

export const highlightMenu = style({
  borderBottom: `1px solid ${COLORS.BLACK}`,
});

export const headerFirstLine = style([s.flex, s.flexSpaceBetween, {}]);

export const schemaNameSection = style([s.flexColumn, { gap: "1rem" }]);

export const unavailableOption = style([
  s.border,
  {
    padding: "1rem",
    borderColor: "white",
    backgroundColor: COLORS.STRAWBERRY_LIGHT,
  },
]);

export const warningMessage = style({
  padding: "0 1rem 1rem 1rem",
  fontSize: "0.8rem",
  color: COLORS.RED,
});

export const schemaName = style({ color: COLORS.LAVENDAR_DARK });

export const schemaNameInput = style([
  {
    position: "relative",
    borderRadius: "1rem",
    border: `1px solid ${COLORS.BLACK}`,
    width: "100%",
    height: "3rem",
    padding: "0 2rem",
    marginBottom: "1rem",
    fontSize: "1rem",
  },
]);

export const fieldNameSection = style([s.flexColumn]);

export const fieldNameWrapper = style([
  s.flex,
  s.alignItemsCenter,
  {
    justifyContent: "flex-end",
    height: "3rem",
    marginBottom: "1rem",
  },
]);

export const fieldNameInput = style([
  {
    position: "relative",
    borderRadius: "1.5rem",
    border: `1px solid ${COLORS.BLACK}`,
    width: "100%",
    height: "3rem",
    padding: "0 2rem",
    fontSize: "1rem",
  },
]);

/**
 * buttons
 */
export const addButton = style([
  s.buttonColor.dark,
  s.pointer,
  {
    position: "absolute",
    padding: "0 1rem",
    borderRadius: "0 1.5rem 1.5rem 0",
    border: `1px solid ${COLORS.BLACK}`,
    height: "inherit",
    zIndex: 1,
  },
]);

export const saveButton = style([
  s.button,
  s.buttonSize.small,
  s.buttonColor.light,
]);

export const disable = style({
  backgroundColor: COLORS.GREY_CLEAR,
  color: COLORS.GREY,
  border: "none",
  cursor: "not-allowed",
});

export const typeButton = style([
  s.inlineFlex,
  s.pointer,
  {
    position: "absolute",
    paddingRight: "4.5rem",
  },
]);

/**
 * field title
 */
export const fieldTitleBox = style([
  {
    padding: "1rem 0 0.5rem 0",
    marginBottom: "1rem",
    borderBottom: `2px solid ${COLORS.GREY_CLEAR}`,
  },
]);

export const fieldTitle = style([
  {
    padding: "1rem 0 0.48rem 0",
    marginBottom: "50px",
    borderBottom: `3px solid ${COLORS.RED_LIGHT}`,
    width: "fit-content",
    fontWeight: 450,
  },
]);

export const fieldSubText = style([
  {
    paddingTop: "1rem",
    fontSize: "0.9rem",
    color: COLORS.GREY,
  },
]);

/**
 * schema field type section
 */
export const typeList = style([
  s.justifyContentCenter,
  {
    display: "grid",
    gridGap: "1rem",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
]);
export const typeWrapper = style([
  s.flexColumn,
  s.alignItemsCenter,
  s.border,
  s.pointer,
  {
    borderColor: COLORS.WHITE,
    minWidth: "7rem",
    maxWidth: "7rem",
    padding: "1rem 0",
    gap: "1rem",
    fontSize: "0.8rem",
    ":hover": {
      backgroundColor: COLORS.GREY_LIGHT,
    },
  },
]);
export const type = style({ backgroundColor: COLORS.GREY_LIGHT });

/**
 * schema field option section
 */
export const optionFieldList = style([
  s.flexColumn,
  {
    gap: "0.8rem",
    padding: "0 1rem",
    listStyle: "none",
  },
]);
export const optionFieldLabel = style([
  {
    paddingLeft: "1rem",
  },
]);

/**
 * schema field list
 */
export const fieldList = style([s.flexColumn, { gap: "1rem" }]);
export const field = style([
  s.flex,
  s.alignItemsCenter,
  s.flexSpaceBetween,
  s.fullWidth,
  s.border,
  { gap: "1rem", padding: "1rem", borderColor: COLORS.GREY_CLEAR },
]);
export const fieldTypeIcon = style({ maxWidth: "3rem" });
export const fieldInfoWrapper = style([
  s.flexColumn,
  { gap: "0.3rem", width: "100%" },
]);
export const fieldInfo = style([s.flex, { gap: "1rem", color: COLORS.GREY }]);
export const fieldEditButtons = style([s.flex, { gap: "1rem" }]);
export const fieldEditButton = style([s.pointer]);

export const fieldHeader = style([
  s.flex,
  s.flexSpaceBetween,
  s.alignItemsCenter,
]);

export const fieldTypeWrapper = style([s.flex, { gap: "1rem" }]);

export const fieldType = style({
  padding: "0.2rem 0.3rem",
  borderRadius: "0.5rem",
  backgroundColor: COLORS.GREY_CLEAR,
  color: COLORS.WHITE,
});

export const textarea = style([
  s.fullWidth,
  s.border,
  {
    padding: "1.5rem",
    resize: "vertical",
    font: `300 16px ${pretendard}`,
    fontSize: "0.9rem",
    minHeight: "5rem",
  },
]);
