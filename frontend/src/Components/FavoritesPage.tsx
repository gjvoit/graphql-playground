import React, { FC, useState } from 'react';

import queries from '../queries';

const Favorites: FC = () => {
  const [favoriteGistIDs, setFavoriteGistIDs] = useState([]);
  React.useEffect(() => {
    queries.getFavorites()
      .then(resp => {
        return resp.json()
      })
      .then(resp => {
        setFavoriteGistIDs(resp.data.getFavorites);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div className="Favorites">
      {favoriteGistIDs.length > 0 && favoriteGistIDs.map(favoriteGistID => {
        return <div> GistID: {favoriteGistID} </div>
      })}
    </div>
  );
}

export default Favorites;
