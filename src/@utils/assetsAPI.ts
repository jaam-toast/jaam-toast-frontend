import { Amplify, Storage } from "aws-amplify";
// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { nanoid } from "nanoid";

import Config from "../@config";

import type { Asset } from "../@types/cms";

// TODO
export class AssetAPIClient {
  // client;

  // constructor() {
  //   this.client = new S3Client({
  //     region: Config.REGION,
  //     credentials: fromCognitoIdentityPool({
  //       clientConfig: { region: Config.REGION }, // Configure the underlying CognitoIdentityClient.
  //       identityPoolId: Config.POOL_ID,
  //     }),
  //   });
  // }

  connect() {
    Amplify.configure({
      Auth: {
        identityPoolId: Config.POOL_ID,
        region: Config.REGION,
      },
      Storage: {
        AWSS3: {
          bucket: Config.BUCKET_NAME,
          region: Config.REGION,
        },
      },
    });
  }

  async isDuplicatedName({
    folderName,
    name,
  }: {
    folderName: string;
    name: string;
  }) {
    try {
      const assetsList = await this.getAssetInfoList(folderName);

      return assetsList.some(asset => asset.path === `${folderName}/${name}`);
    } catch (error) {
      throw error;
    }
  }

  // TODO
  async getAsset(folderName: string, key: string) {
    // try {
    // const command = new GetObjectCommand({
    //   Bucket: "jaam-toast-asset",
    //   Key: key,
    // });
    // const response = await this.client.send(command);

    // console.log({ response });
    return Storage.get(key);
    // } catch (error) {}
  }

  async getAssetInfoList(folderName: string): Promise<Asset[]> {
    try {
      const infoList = await Storage.list(folderName);

      return Promise.all(
        infoList.results.map(async asset => {
          const url =
            asset &&
            asset.key &&
            (await Storage.get(asset.key, {
              expires: 60 * 60 * 24 * 365,
            }));

          return {
            url,
            path: asset.key,
            size: asset.size,
          };
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  async createAsset({
    name,
    folderName,
    asset,
  }: {
    name: string;
    folderName: string;
    asset: File;
  }): Promise<Asset | null> {
    try {
      const isDuplicatedName = await this.isDuplicatedName({
        folderName,
        name,
      });

      const { key: path } = await Storage.put(
        `${folderName}/${isDuplicatedName ? name : nanoid() + name}`,
        asset,
      );

      const assetsList = await this.getAssetInfoList(path);
      const assetData = assetsList.filter(asset => asset.path === path)[0];

      return assetData;
    } catch (error) {
      return null;
    }
  }

  async deleteAsset({ path }: { path: string }) {
    try {
      const result = await Storage.remove(path);

      return result;
    } catch (error) {
      return null;
    }
  }
}
