import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, Link } from "react-router-dom";
import NotFound from "./NotFound";
export default function Definition() {
  const [word, setWord] = useState();
  const [notFound, setNotFound] = useState(false);
  let { search } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        }
        return response.json();
      })
      .then((data) => {
        setWord(data[0].meanings);
      });
    //requesting from an api using fetch
    //normally, when using a paid api which requires you to use an api key
    //Requiring a key makes your front end application insecure. You don't want to give this key out
    //because you don't want people using your key as you ultimately costing you money
    //SOLUTION: Use the API key in the back end of your application and then connect to the backend
    //That way the key is secure

    //When using an api that doesn't require a key, its fine to use it in the front end as everyone else can use this api
  }, []);
  if (notFound == true) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }
  return (
    <>
      {word ? (
        <>
          <h1>Here is a definition:</h1>
          {word.map((meaning) => {
            return (
              <p key={uuidv4()}>
                {meaning.partOfSpeech + ": "}
                {meaning.definitions[0].definition}
              </p>
            );
          })}
        </>
      ) : null}
    </>
  );
}
