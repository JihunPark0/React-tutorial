import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";
import DefinitionSearch from "./DefinitionsSearch";
import useFetch from "../hooks/UseFetch";
export default function Definition() {
  // const [word, setWord] = useState();
  // const [notFound, setNotFound] = useState(false);
  // const [error, setError] = useState(false);

  //custom hook

  let { search } = useParams();
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;
  const [word, errorStatus] = useFetch(url);

  if (errorStatus === 404) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }
  if (errorStatus) {
    return (
      <>
        <p>Something went wrong</p>
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }
  return (
    <>
      {word?.[0]?.meanings ? (
        <>
          <h1>Here is a definition:</h1>
          {word[0].meanings.map((meaning) => {
            return (
              <p key={uuidv4()}>
                {meaning.partOfSpeech + ": "}
                {meaning.definitions[0].definition}
              </p>
            );
          })}
          <p>Search again</p>
          <DefinitionSearch />
        </>
      ) : null}
    </>
  );
}
