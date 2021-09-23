type HandlerType = (element: UIEvent) => void;
export function watchResize(_element: HTMLElement, handler: HandlerType) {
  window.addEventListener("resize", handler);
  let currentHandler = handler;

  return {
    update(newHandler: HandlerType) {
      window.removeEventListener("resize", handler);
      window.addEventListener("resize", newHandler);
      currentHandler = newHandler;
    },

    destroy() {
      window.removeEventListener("resize", currentHandler);
    },
  };
}
