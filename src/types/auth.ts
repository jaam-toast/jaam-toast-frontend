export type UserLoginData = {
  _id: string;
  username: string;
  userGithubUri: string;
  userImage?: string;
};

export type LoginData = {
  data: UserLoginData;
  githubAccessToken: string;
  accessToken: string;
};

export type LoginResponse = {
  result: string;
  data: UserLoginData;
  githubAccessToken: string;
  accessToken: string;
};
