import Head from "../../components/layout/Head";
import Layout from "../../components/layout/Layout";
import { BASE_URL } from "../../constants/base-url";
import Image from "next/image";
import Router from "next/router";

export const getStaticPaths = async () => {
  try {
    const res = await fetch(BASE_URL);

    //destructure results from data
    const { results } = await res.json();

    const paths = results.map(({ name }) => {
      return {
        params: {
          slug: name,
        },
      };
    });
    return {
      paths,
      fallback: false,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getStaticProps = async ({ params }) => {
  //destructured context into params for shorter syntax

  try {
    const name = params.slug;
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
    const data = await res.json();
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

export const Name = ({ data }) => {
  //destructured the different data properties used
  const { name, sprites, species, abilities, types, stats, height, weight } =
    data;

  //destructured further technical properties
  //species and images
  const SPECIES = species.name;
  const SPRITES_FRONT = sprites.front_shiny;
  const SPRITES_BACK = sprites.back_shiny;
  const SPRITES_DREAM = sprites.other.dream_world.front_default;
  const SPRITES_ART = sprites.other["official-artwork"].front_default;

  return (
    <Layout>
      <Head title={name.toUpperCase()} />
      <div style={{ flex: "none", textAlign: "left" }}>
        <button
          onClick={() => {
            Router.push("/");
          }}
          style={{ padding: 4, marginTop: 5, letterSpacing: 1 }}
        >
          Back
        </button>
        <div className="pokemon-detail-card">
          <h1>{name.toUpperCase()}</h1>
          <Image src={SPRITES_FRONT} alt={SPECIES} width={100} height={150} />
          <Image src={SPRITES_BACK} alt={SPECIES} width={100} height={150} />
          <Image src={SPRITES_DREAM} alt={SPECIES} width={100} height={150} />
          <Image src={SPRITES_ART} alt={SPECIES} width={100} height={150} />
          <div>
            <h2>Info</h2>
            <p>
              <span>Height: </span>
              {height}
            </p>
            <p>
              <span>Weight: </span>
              {weight}
            </p>
          </div>
          <div className="abilities">
            <h3>Abilities</h3>
            {abilities.map(({ ability, slot }) => {
              return <p key={slot}>{ability.name}</p>;
            })}
          </div>
          <div className="types">
            <h3>Types</h3>
            {types.map(({ type, slot }) => {
              return <p key={slot}>{type.name}</p>;
            })}
          </div>
          <div className="stats">
            <h3>stats</h3>
            {stats.map(({ stat, base_stat }) => {
              return (
                <div key={stat.name} className="pokemon-stat">
                  <span>{stat.name}: </span>
                  <p>{base_stat}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Name;
