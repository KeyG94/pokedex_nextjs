import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Pokemon from "../components/Pokemon.js";
import axios from "axios";
import { BASE_URL } from "../constants/base-url";
import Link from "next/link";

export default function Home({ pokemon }) {
  // pokemon object recieved is:: index: {name, url}
  // 0: {name: bulbasaur, url: "https://pokeapi.co/api/v2/pokemon/1/"} etc...
  return (
    <Layout>
      <Head title="Home" />
      <div className="container" style={{ display: "block" }}>
        <h1>Home Page</h1>
        <div className="pokemon-list">
          {pokemon.map(({ name, url }, index) => {
            return (
              <div key={index} className="pokemonCard">
                <div className="card-section-top">
                  <h3>{name.toUpperCase()}</h3>

                  {/* Pass in url to Pokemon as prop so that the component can correctly fetch specific data */}
                  <Pokemon data={url} />
                </div>
                <div className="card-section-bottom">
                  <Link href={`/detail/${name}`} key={index} passHref>
                    <button>Pokedex</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // in case there is an error in the API call
  // we'll send an empty array in as the prop
  let pokemon = [];
  try {
    const response = await axios.get(BASE_URL);
    // the log here will happen on the server, you can check the console in your editor
    console.log(response);
    // the array is on the response.data.data property
    pokemon = response.data.results;
  } catch (error) {
    console.log(error);
  }

  // the props object we return here will become the props in the component
  return {
    props: {
      pokemon,
    },
  };
}
