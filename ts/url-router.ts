document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if(!target.matches('nav a')){
        return;
    }

    e.preventDefault();
    urlRoute(e);
})

const urlRoutes = {
    404: {
        title: "Page Not Found",
        template: "/template/404.html",
        description: ""
    },
    "/": {
        title: "Page Not Found",
        template: "/template/index.html",
        description: ""
    },
    "/movie${id}": {
        title: "Page Not Found",
        template: "/template/index.html",
        description: ""
    }
}


const urlRoute = (event: any) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();

}

const urlLocationHandler = async () => {

}

const getMovies = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${process.env.API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};
getMovies()