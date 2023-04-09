import { globalFontFace } from "@vanilla-extract/css";

export const pretendard = "Pretendard";
export const gmarketSans = "GmarketSans";

globalFontFace(pretendard, {
  fontWeight: 300,
  fontStyle: "normal",
  fontDisplay: "swap",
  src: `local("Pretendard-Light"),
    url("/fonts/Pretendard-Light.subset.woff2") format("woff2"),
    url("/fonts/Pretendard-Light.subset.woff") format("woff")`,
});

globalFontFace(pretendard, {
  fontWeight: 500,
  fontStyle: "normal",
  fontDisplay: "swap",
  src: `local("Pretendard-Medium"),
    url("/fonts/Pretendard-Medium.subset.woff2") format("woff2"),
    url("/fonts/Pretendard-Medium.subset.woff") format("woff")`,
});

globalFontFace(pretendard, {
  fontWeight: 700,
  fontStyle: "normal",
  fontDisplay: "swap",
  src: `local("Pretendard-Bold"),
    url("/fonts/Pretendard-Bold.subset.woff2") format("woff2"),
    url("/fonts/Pretendard-Bold.subset.woff") format("woff")`,
});

globalFontFace(pretendard, {
  fontWeight: 900,
  fontStyle: "normal",
  fontDisplay: "swap",
  src: `local("Pretendard-Black"),
    url("/fonts/Pretendard-Black.subset.woff2") format("woff2"),
    url("/fonts/Pretendard-Black.subset.woff") format("woff")`,
});

globalFontFace(gmarketSans, {
  fontWeight: 700,
  fontStyle: "normal",
  fontDisplay: "swap",
  src: `local("GmarketSans-Bold"),
    url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff") format("woff")`,
});
