const scrollWithOffcet = (element: any) => {
  const currentPosition = element.getBoundingClientRect().top;
  if (currentPosition) {
    const offcet = 250;
    const finalPosition = currentPosition + window.pageYOffset - offcet;
    window.scrollTo({
      top: finalPosition,
      behavior: 'smooth',
    });
  }
};
export default scrollWithOffcet;
