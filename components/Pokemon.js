import { useState, useEffect } from "react";
import Image from "next/image";
import { checkStorage } from "../utills/storage";
import useLocalStorage from "../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Pokemon({ data }) {
  //prop.data is the specific url for that single pokemon being passed as a url in the prop
  const [url] = useState(data);
  const [pokemon, setPokemon] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [color, setColor] = useState(false);

  // Default loading text
  const loadingText = "Loading...";

  // Because this is a component inside a module, useEffect has to be used instead of getStaticProps
  useEffect(() => {
    const getPokemon = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        const data = await res.json();

        setPokemon(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    getPokemon();

    //only re-run if the url changes
  }, [url]);

  // handlePress is a function to help Toggle in and out of local storage
  const handlePress = ({ target }) => {
    //create a new pokemon object for local storage
    const pokemonObj = {
      name: target.dataset.name,
      url: target.dataset.url,
    };

    //retrieve local storage list, if no list: [] is returned
    const currentList = checkStorage();

    //check if pokemon Obj matches any object in the local storage
    const isInStorage = currentList.find(
      (aPokemon) => aPokemon.url === pokemonObj.url
    );

    //If isInStorage is NOT true, push pokemon obj to currentList
    if (!isInStorage) {
      currentList.push(pokemonObj);
      //setFavorites with the "new" currentList
      setFavorites(currentList);
      setColor(true);
    } else {
      //else create a newList that filters the currentlist and returns every pokemon thats not equal to the pokemonObj.
      const newList = currentList.filter(
        (aPokemon) => aPokemon.url !== pokemonObj.url
      );
      //set the new list to local storage
      setFavorites(newList);
      setColor(false);
    }
  };

  //render the like button based on if the pokemon is in local storage
  const renderLikeButton = () => {
    const currentList = checkStorage();
    const isInStorage = currentList.find(
      (aPokemon) => aPokemon.name === pokemon.name
    );

    if (!isInStorage) {
      return (
        <div className="unliked-button">
          <button
            data-url={url}
            data-name={pokemon.name}
            onClick={(e) => {
              handlePress(e);
            }}
          />
          <FontAwesomeIcon
            icon={faStar}
            style={{
              color: "lightgrey",
              fontSize: 24,
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="liked-button">
          <button
            style={{
              color: "black",
              fontSize: 24,
            }}
            data-url={url}
            data-name={pokemon.name}
            onClick={(e) => {
              handlePress(e);
            }}
          />
          <FontAwesomeIcon
            icon={faStar}
            style={{ color: "#FFDE00", fontSize: 24 }}
          />
        </div>
      );
    }
  };

  return loading ? (
    // Return this if loading is true, state of loading is true by default
    <div>
      <p>
        <span># </span>
        {loadingText}
      </p>
      <Image
        src="https://i.gifer.com/QhVL.gif"
        alt="loader placeholder, pokemon ball"
        width={200}
        height={150}
      />
      <p>
        <span>Type: </span>
        {loadingText}
      </p>
      <p>
        <span>xp: </span>
        {loadingText}
      </p>
    </div>
  ) : (
    //return this if/when loading is false/complete
    <div>
      <p>
        <span># </span>
        {pokemon.id}
      </p>
      <Image
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
        width={250}
        height={150}
      />
      <p>
        <span>Type: </span>
        {pokemon.types.map((type) => type.type.name)}
      </p>
      <p>
        <span>xp: </span>
        {pokemon.base_experience}
      </p>
      {renderLikeButton()}
    </div>
  );
}
