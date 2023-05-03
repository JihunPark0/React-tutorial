import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function DefinitionSearch() {
  const [word, setWord] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <form
        onSubmit={() => navigate("/dictionary/" + word)}
        className="flex space-between space-x-2 max-w-[300px]"
      >
        <input
          className="min-w-0 shrink px-2 rounded py-1"
          placeholder="word"
          type="text"
          onChange={(e) => {
            setWord(e.target.value);
          }}
        />
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded">
          search
        </button>
      </form>
    </>
  );
}
