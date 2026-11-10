const WorkHistoryConstants = Object.freeze({
  ANIMATION: {
    BACKDROP: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.2 } },
    },
    DROP_IN: {
      hidden: { y: "-100vh", opacity: 0 },
      visible: {
        y: "0",
        opacity: 1,
        transition: {
          duration: 0.1,
          type: "spring",
          damping: 25,
          stiffness: 500,
        },
      },
      exit: { y: "100vh", opacity: 0 },
    },
  },
});

export { WorkHistoryConstants };
