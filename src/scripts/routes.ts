// load components, so that the browser can cache them
import("@/components/pages/main");
import("@/components/pages/favorite");
import("@/components/pages/detail-page");
import("@/components/shared/custom-loader");

const routes = {
  "/": {
    renderPage: async () => {
      return `<main-page></main-page>`;
    },
  },
  "/favorite": {
    renderPage: async () => {
      return "<favorite-page></favorite-page>";
    },
  },
  "/detail/:id": {
    renderPage: async () => {
      return "<detail-page></detail-page>";
    },
  },
};

export default routes;
