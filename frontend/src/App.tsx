import React, { ChangeEvent, FC, useState, useCallback } from 'react';
import './App.css';
import queries from './queries';

const App: FC = () => {
  const [gistID, setGistID] = useState('');
  const onChangeGistID = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setGistID(event.target.value);
  }, [setGistID])
  const handleClickGistID = useCallback((gistID: string) => {
    // TODO, tie this into my API with a fetch call
    queries.hello();
    console.log(gistID);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        SkySpecs Gist Viewer
      </header>
      <input type={'text'} className="" value={gistID} onChange={onChangeGistID} />
      <button onClick={() => handleClickGistID(gistID)}>Click me!</button>
    </div>
  );
}

export default App;
