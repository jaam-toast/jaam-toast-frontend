export type UserLoginData = {
  _id: string;
  username: string;
  userGithubUri: string;
  userImage?: string;
};

export type LoginResponse = {
  result: string;
  data: UserLoginData;
  accessToken: string;
};

export type Repo = {};

export type GetReposResponse = {
  data: Repo[];
};

export type GetRepoReponse = {
  data: Repo;
};

export type Org = {};

export type GetOrgsResponse = {
  data: Org[];
};

export type GetOrgReposResponse = {
  data: Repo[];
};
