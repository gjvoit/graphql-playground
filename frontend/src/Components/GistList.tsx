import './GistsPage.css';

import React, { FC, useCallback } from 'react';
import { Gist } from '../queries';

type GistListProps = {
  gists: Gist[];
  handleClickGistSummary: (id: string) => void;
}

const GistList: FC<GistListProps> = (props: GistListProps) => {
  return (
    <div className="GistsPage__GistList__root">
      {props.gists ? props.gists.map(gist => {
        return <GistSummary key={gist.id} id={gist.id} description={gist.description} created_at={gist.created_at} handleClickGistSummary={props.handleClickGistSummary} />
      }) : <div>No gists found for user (or user doesn't exist)!</div>}
    </div>
  )
};

type GistSummaryProps = {
  handleClickGistSummary: (id: string) => void;
} & Pick<Gist, 'id' | 'description' | 'created_at'>;

const GistSummary: FC<GistSummaryProps> = (props: GistSummaryProps) => {
  const { description, created_at, handleClickGistSummary, id } = props;
  const onClickGistSummary = useCallback(() => {
    handleClickGistSummary(id);
  }, [handleClickGistSummary, id]);
  return (
    <div className="GistsPage__GistSummary__root" id={id} onClick={onClickGistSummary}>
      <div>Description: {description}</div>
      <div>Date Created: {created_at}</div>
    </div>
  );
};

export default GistList;
