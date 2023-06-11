const routes = {
  "/": {
    renderPage: async () => {
      await import("@/components/pages/main");
      return "<main-page></main-page>";
    },
  },
  "/detail/:id": {
    renderPage: async () => {
      await import("@/components/pages/detail-page");
      return "<detail-page></detail-page>";
    },
  },
};

export default routes;
