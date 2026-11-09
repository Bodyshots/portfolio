const getProjectCarouselSettings = (projectCount: number) => ({
  infinite: true,
  centerPadding: "5px",
  slidesToShow: Math.min(2, projectCount),
  speed: 500,
  responsive: [
    {
      breakpoint: 1384,
      settings: {
        slidesToShow: Math.min(1, projectCount),
      },
    },
  ],
});

export { getProjectCarouselSettings };
