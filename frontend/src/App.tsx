import './App.css';
import React, { FC, useState } from 'react';
import classNames from 'classnames';

import GistsPage from './Components/GistsPage';
import FavoritesPage from './Components/FavoritesPage';

enum ActiveComponent {
  GistsByUser = 'Lookup Gists By User',
  FavoriteGists = 'View Favorite Gists',
}

const selectActiveComponent = (activeComponent: ActiveComponent) => {
  switch(activeComponent) {
    case ActiveComponent.GistsByUser:
      return <GistsPage />
    case ActiveComponent.FavoriteGists:
      return <FavoritesPage />
  }
}

const App: FC = () => {
  const [activeComponent, setActiveComponent] = useState(ActiveComponent.GistsByUser);
  return (
    <div className="App">
      <header className="App__header">
        SkySpecs Gist Viewer
      </header>
      <div className="App__nav-container">
        <div className={classNames('App__nav-item', {'active': activeComponent === ActiveComponent.GistsByUser})} onClick={() => setActiveComponent(ActiveComponent.GistsByUser)}>
          Lookup Gists by Username
        </div>
        <div className={classNames('App__nav-item', {'active': activeComponent === ActiveComponent.FavoriteGists})} onClick={() => setActiveComponent(ActiveComponent.FavoriteGists)}>
          View Your Favorite Gists
        </div>
      </div>
      {selectActiveComponent(activeComponent)}
    </div>
  );
}

export default App;
