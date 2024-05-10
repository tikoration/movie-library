const Explore = () => {
    const exploreComp = `
        <div>
            <h2>Explore</h2>
        </div>
    `;
    return exploreComp;
};
const renderExplore = () => {
    const mainPage = document.getElementById('main-page');
    if (mainPage) {
        const exploreContent = Explore();
        mainPage.innerHTML = exploreContent;
    }
};
export default renderExplore;
