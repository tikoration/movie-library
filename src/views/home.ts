import Explore from "../components/explore.js";
import PopularMovies from "../components/popularMovies.js";

export default async function HomeContainer() {
  const exploreData = Explore();
  const popData = await PopularMovies();
  Explore();
  return `
    ${exploreData}
    ${popData}

    `;
}
