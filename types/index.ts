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
