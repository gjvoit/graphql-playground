import './GistsPage.css';

import React, { FC, useState, useCallback } from 'react';

import queries, { Gist, GistFile } from '../queries';
import favorite from '../assets/favorite.png';
import notFavorite from '../assets/notFavorite.png';
import GistList from './GistList';

enum LoadingStatus {
  NotStarted = 'NotStarted',
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
};

const GistsPage: FC = () => {
  const [username, setUsername] = useState('');
  const onChangeUsername = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }, [])
  const [activeGist, setActiveGist] = useState<Gist | undefined>(undefined);
  const [gists, setGists] = useState<Gist[]>([]);
  const handleClickGistSummary = useCallback((id: string) => {
    gists.forEach(gist => {
      if (gist.id === id) {
        setActiveGist(gist);
      }
    })
  }, [gists, setActiveGist]);
  const [fetchGistsLoadingStatus, setFetchGistsLoadingStatus] = useState(LoadingStatus.NotStarted);
  const showGistDetail = !!activeGist;
  const handleFetchGistsByUsername = useCallback(() => {
    // TODO, tie this into my API with a fetch call
    setFetchGistsLoadingStatus(LoadingStatus.Loading);
    queries.fetchGistsByUsername({ username })
      .then(response => {
        return response.json()
      })
      .then(jsonResp => {
        console.log(jsonResp)
        // TODO: use setGists effectively here after parsing the response
        setGists(jsonResp as unknown as Gist[]);
        setFetchGistsLoadingStatus(LoadingStatus.Success);
      }).catch(err => {
        console.log(err);
        setFetchGistsLoadingStatus(LoadingStatus.Error);
      });
  }, [username]);
  
  return (
    <div className="GistsPage__root">
      {!showGistDetail && (
        <div className="GistsPage__GistsContent">
          <input type={'text'} value={username} onChange={onChangeUsername} />
          <button onClick={handleFetchGistsByUsername}>Click me!</button>
          {fetchGistsLoadingStatus === LoadingStatus.Success && <GistList gists={gists} handleClickGistSummary={handleClickGistSummary} />}
        </div>
      )}
      {!!activeGist && showGistDetail && <GistDetails files={activeGist.files} id={activeGist.id} />}
    </div>
  );
};

type GistDetailsProps = {
  files: Map<string, GistFile>;
  id: string;
};

const GistDetails: FC<GistDetailsProps> = (props: GistDetailsProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleClickFavorite = () => {
    if (!isFavorite) {
      queries.createFavorite(props.id)
        .then(resp => {
          console.log(resp);
          setIsFavorite(true);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      queries.deleteFavorite(props.id)
        .then(resp => {
          console.log(resp);
          setIsFavorite(false);
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
  return (
    <div className="GistsPage__GistDetails__root">
      <div className="GistsPage__GistDetails__favorite-container">
        <b>Favorite</b>
        <img className="GistsPage__GistSummary__icon" alt={!isFavorite ? 'Favorite Gist' : 'Unfavorite Gist'}src={isFavorite ? favorite : notFavorite} onClick={handleClickFavorite} />
      </div>
      <div className="GistsPage__GistDetails__files-container">
        <h3>Gist Files List</h3>
        {Object.keys(props.files).map(file => {
          return <div key={file}>{file}</div>
        })}
      </div>
    </div>
  );
}

export default GistsPage;
