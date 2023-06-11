import { Router } from "@vaadin/router";

const router = new Router(document.querySelector("#content"));

router.setRoutes([
  {
    path: "/",
    component: "main-page",
    action: async () => {
      await import("@/components/pages/main");
    },
  },
  {
    path: "/detail/:id",
    component: "detail-page",
    action: async () => {
      await import("@/components/pages/detail-page");
    },
  },
]);

export default router;
