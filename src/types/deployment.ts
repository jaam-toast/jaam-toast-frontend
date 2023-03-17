import { RepoDeployOptions } from "./projectOption";

export interface UserDeploymentData extends RepoDeployOptions {
  instanceId: string;
  deployedUrl?: string;
  recordId?: string;
  buildingLog: string[];
}

export interface DeploymentDataResponse {
  result: string;
  data: UserDeploymentData;
}

export interface DeploymentListResponse {
  result: string;
  data: UserDeploymentData[];
}
