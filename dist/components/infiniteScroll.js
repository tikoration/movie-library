let currentPage = 0;
const pixel_offset = 200;
let isFetching = false;
export const handleInfiniteScroll = () => {
    const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight - pixel_offset;
    if (endOfPage && !isFetching) {
        isFetching = true;
        setTimeout(() => {
            currentPage += 1;
            isFetching = false;
        }, 500);
    }
    return currentPage;
};
export const setupInfiniteScroll = () => {
    window.addEventListener('scroll', () => {
        handleInfiniteScroll();
    });
};
