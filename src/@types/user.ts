export type User = {
  githubAccessToken: string;
  projects: string[];
  userGithubUri: string;
  userImage?: string;
  userName: string;
  _id: string;
};

export type Space = {
  installId: number;
  spaceName: string;
  spaceUrl: string;
  spaceImage: string;
};

export type Repo = {
  repoName: string;
  repoCloneUrl: string;
  repoUpdatedAt: string;
  space?: string;
};
