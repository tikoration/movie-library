let currentPage = 1;
const pixel_offset = 200;
let isFetching = false;

export const handleInfiniteScroll = (
  currentPageCallback: (arg: number) => void
) => {
  const endOfPage =
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - pixel_offset;
  if (endOfPage && !isFetching) {
    isFetching = true;
    setTimeout(() => {
      currentPage += 1;
      currentPageCallback(currentPage);
      isFetching = false;
    }, 500);
  }
};

export const setupInfiniteScroll = (
  currentPageCallback: (arg: number) => void
) => {
  window.addEventListener("scroll", () => {
    handleInfiniteScroll(currentPageCallback);
  });
};
