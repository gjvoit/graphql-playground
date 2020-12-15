const createFavoriteQuery = `mutation CreateFavorite($gist_id: String) {
  createFavorite(gist_id: $gist_id)
}`

const getFavoritesQuery = `query {
  getFavorites
}`
const getFavorites = () => fetch('http://localhost:3001/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({ query: getFavoritesQuery })
});

const createFavorite = (gist_id: string) => fetch('http://localhost:3001/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: createFavoriteQuery,
    variables: {
      gist_id
    }
  })
});

const deleteFavoriteQuery = `mutation DeleteFavorite($gist_id: String) {
  deleteFavorite(gist_id: $gist_id)
}`

const deleteFavorite = (gist_id: string) => fetch('http://localhost:3001/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: deleteFavoriteQuery,
    variables: {
      gist_id
    }
  })
});

const GitHubRootURL = 'https://api.github.com';

enum HTTPVerb {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  UPDATE = 'UPDATE',
};

export type Gist = {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  description: string;
  comments: number;
  comments_url: string;
  files: Map<string, GistFile>;
  owner: GistOwner;
  public: boolean;
  truncated: boolean;
  user: string | null;
}

export type GistFile = {
  filename: string;
  language: string;
  raw_url: string;
  size: number;
  type: string;
}

export type GistOwner = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
}

export type fetchGistByIdRequest = {
  id: string
};
export type fetchGistByIdResponse = {} & Gist;
const fetchGistById = (req: fetchGistByIdRequest) => fetch(`${GitHubRootURL}/gists/${req.id}`, {
  method: HTTPVerb.GET,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json',
  },
});

export type fetchGistsByUsernameRequest = {
  username: string
};
export type fetchGistsByUsernameResponse = {
  gists: Gist[];
};
const fetchGistsByUsername = (req: fetchGistsByUsernameRequest) => fetch(`${GitHubRootURL}/users/${req.username}/gists`, {
  method: HTTPVerb.GET,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json',
  },
});

const queries = {
  getFavorites,
  createFavorite,
  deleteFavorite,
  fetchGistById,
  fetchGistsByUsername,
};

export default queries;
