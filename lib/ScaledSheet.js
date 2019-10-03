import { StyleSheet } from "react-native";
import {
  moderateScale,
  scale,
  verticalScale,
  getScaleUtils
} from "./scalingUtils";
import deepMap from "./deepMap";

const validScaleSheetRegex = /^(\-?\d+(\.\d{1,2})?)@(ms(\d+(\.\d{1,2})?)?|s|vs)$/;
const scaleRegex = /^(\-?\d+(\.\d{1,2})?)@s$/;
const verticalScaleRegex = /^(\-?\d+(\.\d{1,2})?)@vs$/;
const moderateScaleRegex = /^(\-?\d+(\.\d{1,2})?)@ms(\d+(\.\d{1,2})?)?$/;

const scaleByAnnotation = (value, { baseWidth, baseHeight }) => {
  const { scale, verticalScale, moderateScale } = getScaleUtils({
    baseHeight,
    baseWidth
  });
  if (!validScaleSheetRegex.test(value)) {
    return value;
  }
  const size = parseFloat(value.split("@")[0]);

  if (scaleRegex.test(value)) {
    return scale(size);
  }

  if (verticalScaleRegex.test(value)) {
    return verticalScale(size);
  }

  if (moderateScaleRegex.test(value)) {
    const scaleFactor = value.split("ms")[1];
    if (scaleFactor) {
      return moderateScale(size, parseFloat(scaleFactor));
    }
    return moderateScale(size);
  }
};

const ScaledSheet = {
  create: (styleSheet, baseDimens = { baseWidth: 350, baseHeight: 680 }) =>
    StyleSheet.create(
      deepMap(styleSheet, scaleByAnnotation, {
        baseWidth: baseDimens.baseWidth,
        baseHeight: baseDimens.baseHeight
      })
    )
};

export default ScaledSheet;
