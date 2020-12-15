import { Gist, GistFile } from '../../queries';
const mockFiles = new Map<string, GistFile>();
mockFiles.set('twitch-ad-block2.js', {
  filename: "twitch-ad-block2.js",
  language: "JavaScript",
  raw_url: "https://gist.githubusercontent.com/gjvoit/0838123e7ce6f12d0c16705b9cf1fed6/raw/6ee1ccf5d89be90d73293ba264ad4d44409a9e81/twitch-ad-block2.js",
  size: 636,
  type: "application/javascript",
});
export const MockGists: Gist[] = [
  {
    comments: 0,
    comments_url: "https://api.github.com/gists/0838123e7ce6f12d0c16705b9cf1fed6/comments",
    commits_url: "https://api.github.com/gists/0838123e7ce6f12d0c16705b9cf1fed6/commits",
    created_at: "2020-10-01T22:12:53Z",
    description: "",
    files: mockFiles,
    forks_url: "https://api.github.com/gists/0838123e7ce6f12d0c16705b9cf1fed6/forks",
    git_pull_url: "https://gist.github.com/0838123e7ce6f12d0c16705b9cf1fed6.git",
    git_push_url: "https://gist.github.com/0838123e7ce6f12d0c16705b9cf1fed6.git",
    html_url: "https://gist.github.com/0838123e7ce6f12d0c16705b9cf1fed6",
    id: "0838123e7ce6f12d0c16705b9cf1fed6",
    node_id: "MDQ6R2lzdDA4MzgxMjNlN2NlNmYxMmQwYzE2NzA1YjljZjFmZWQ2",
    owner: {
      login: "gjvoit",
      id: 6272524,
      node_id: "MDQ6VXNlcjYyNzI1MjQ=",
      avatar_url: "https://avatars1.githubusercontent.com/u/6272524?v=4",
      gravatar_id: ""
    },
    public: true,
    truncated: false,
    updated_at: "2020-10-01T22:12:54Z",
    url: "https://api.github.com/gists/0838123e7ce6f12d0c16705b9cf1fed6",
    user: null,
  }
];
