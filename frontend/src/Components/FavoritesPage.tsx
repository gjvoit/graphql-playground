import React, { FC, useState } from 'react';

import queries, { Gist, GistFile } from '../queries';
import GistList from './GistList';

const Favorites: FC = () => {
  const [favoriteIDs, setFavoriteIDs] = useState([]);
  React.useEffect(() => {
    queries.getFavorites()
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div className="Favorites">
      Your Favorites! (TODO)
    </div>
  );
}

export default Favorites;
