import React from 'react';
import './App.css';
import ItemComponent from './ItemComponent';

export function wordReducer(state: any, action: any) {
  switch (action.type) {
    case "SET_WORDS":
      return { data: action.payload.data, isError: false, isLoading: false };
    case "INIT_FETCH":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
}
function App() {

  const [randomWord, setRandomWord] = React.useState({
    definition: "",
    pronunciation: "",
    word: ""
  });
  const [initial, setInitail] = React.useState(true);
  const [searchWord, setSearchWord] = React.useState("");
  const [searchResults, setSearchResults] = React.useState();
  const [error, setError] = React.useState(false);

  const randomwordapi = "https://random-words-api.vercel.app/word";
  const apiWord = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  const searchText = apiWord + searchWord;
  React.useEffect(() => {
    fetch(randomwordapi)
      .then((res) => res.json())
      .then((json) => {
        setRandomWord(json[0])
      })
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleSubmit = () => {

    fetch(searchText)
      .then((res) => res.json())
      .then((json) => {
        setSearchResults(json[0])
      })
      .catch((err) => {
        setError(true);
      });
    setInitail(false);
    console.log(searchResults);
  }
  return (
    <div className="App">
      <form id="text-field" >
        <input type="text" onChange={handleChange}></input>
        <button type="button" onClick={handleSubmit}>Search</button>
      </form>

      {error && <p>Error occured</p>}

      {initial === true ?
        <div id="initailcontainer">
          <h3><b>Word of the day</b></h3>
          <p> Word: {randomWord.word}</p>
          <p>Defination : {randomWord.definition}</p>
          <p>Pronunication : {randomWord.pronunciation}</p>
        </div>
        :
        <ItemComponent data={searchResults} />
      }

    </div>

  );
}

export default App;
