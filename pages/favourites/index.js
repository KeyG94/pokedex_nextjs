import Layout from "../../components/layout/Layout";
import Head from "../../components/layout/Head";
import useLocalStorage from "../../hooks/useLocalStorage";
import Pokemon from "../../components/Pokemon";
import Link from "next/link";

export default function Favourites() {
  const [favorites] = useLocalStorage("favorites", []);

  if (favorites.length === 0) {
    return (
      <Layout>
        <Head title="Favorite Pokemon" />
        <h1>Favourite Pokemon List</h1>
        <div className="pokemon-list">
          <div className="pokemonCard">
            <div className="card-section-top">
              <h3>Oops</h3>
              {/* Pass in url to Pokemon as prop so that the component can correctly fetch specific data */}
              <p>Seems like you dont have any favorites yet!</p>
              <p>
                Navigate back{" "}
                <Link href={`/`} passHref>
                  <span
                    style={{
                      color: "#FFDE00",
                      backgroundColor: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    home
                  </span>
                </Link>{" "}
                and choose one or more of your favorite pokemon.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Head title="Favorite Pokemon" />
        <h1>Favourite Pokemon List</h1>
        <div className="pokemon-list">
          {favorites.map(({ url, name }, index) => {
            return (
              <div key={index} className="pokemonCard">
                <div className="card-section-top">
                  <h3>{name.toUpperCase()}</h3>
                  {/* Pass in url to Pokemon as prop so that the component can correctly fetch specific data */}
                  <Pokemon data={url} />
                </div>
                <div className="card-section-bottom">
                  <Link href={`/detail/${name}`} passHref>
                    <button>Pokedex</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
    );
  }
}
