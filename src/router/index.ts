import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import PostPage from "../views/PostPage.vue";
//Utils
import DumpTester from "../views/util-pages/DumpTester.vue";
import JsonParser from "../views/util-pages/JsonParser.vue";
import ConvertImage from "../views/util-pages/ConvertImage.vue";
import CombinePdf from "../views/util-pages/CombinePdf.vue";
import OnlineJS from "../views/util-pages/OnlineJS.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    props: true,
  },
  {
    path: "/posting",
    name: "Posting",
    component: PostPage,
  },
  {
    path: "/dumpTester",
    name: "Dump Tester",
    component: DumpTester,
  },
  {
    path: "/jsonParser",
    name: "Json Parser",
    component: JsonParser,
  },
  {
    path: "/convertImage",
    name: "Convert Image",
    component: ConvertImage,
  },
  {
    path: "/combinePdf",
    name: "Combine PDF",
    component: CombinePdf,
  },
  {
    path: "/onlineJS",
    name: "Online JS",
    component: OnlineJS,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach(async (to: any, from: any) => {});
router.afterEach(async (to: any, from: any) => {
  // if(to.name === 'home' || to.name === 'posting'){
  //   console.log(to.name);
  // }else{
  //   console.log(to.name);
  // }
});
export default router;
