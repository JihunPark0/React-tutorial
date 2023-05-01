import { useState, useEffect } from "react";
export default function Dictionary() {
  const [word, setWord] = useState("");
  const [word2, setWord2] = useState("");
  //useEffect allows us to execute anytime our state changes. It runs once after a page is initially loaded and anytime a state changes
  useEffect(() => {
    console.log("state updated", word);
  }, [word]); //how to limit waht state useEffect cares about --> dependency array
  //dependency array is the second argument the useEffect takes after the callBack function
  //it allows us to restrict what states we care about for useEffect to gets triggered
  useEffect(() => {
    console.log("state updated", word2);
  }, [word2]);

  //no dependency array --> update for any state change
  //empty dependency array--> executes once when page loads
  //passing in data --> only execute when those state variables are changed
  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <h2>Lets get the definition for {word}</h2>
      <input
        type="text"
        onChange={(e) => {
          setWord2(e.target.value);
        }}
      />
      <h2>Lets get the definition for {word2}</h2>
    </>
  );
}
