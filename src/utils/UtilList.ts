//Icons
import IconDumpTester from "@/assets/util-icons/dumpTester.svg";
import IconJsonParser from "@/assets/util-icons/jsonParser.svg";
import IconConvertImage from "@/assets/util-icons/convertImage.svg";
import IconCombinePdf from "@/assets/util-icons/combinePdf.svg";
import IconOnlineJs from "@/assets/util-icons/onlineJS.svg";

export const UtilList = [
  {
    name: "Dump Tester",
    desc: "시험문제 덤프를 만들고 풀어보세요.",
    route: "/dumpTester",
  },
  {
    name: "JSON Parser",
    desc: "String형식의 JSON을 파싱하세요.",
    route: "/jsonParser",
  },
  // {
  //   name: "Color Picker",
  //   desc: "색상을 선택하고 코드를 알아보세요.",
  //   route: "/colorPicker",
  // },
  {
    name: "Convert Image",
    desc: "이미지를 다른형식으로 변환하세요.",
    route: "/convertImage",
  },
  {
    name: "Combine PDF",
    desc: "여러 PDF파일을 합쳐보세요.",
    route: "/combinePdf",
  },
  // {
  //   name: "Online JS",
  //   desc: "JS를 온라인에서 실행해보세요.",
  //   route: "/onlineJS",
  // },
];

export const GetIcon = (name: string) => {
  switch (name) {
    case "Dump Tester":
      return IconDumpTester;
    case "JSON Parser":
      return IconJsonParser;
    case "Convert Image":
      return IconConvertImage;
    case "Combine PDF":
      return IconCombinePdf;
    case "Online JS":
      return IconOnlineJs;
    // case "Color Picker":
    //   return IconColorPicker;
    default:
      return "";
  }
};
