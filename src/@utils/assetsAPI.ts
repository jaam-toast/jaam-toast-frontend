import { Amplify, Storage } from "aws-amplify";

import Config from "../@config";

import type { AssetInfoForEditing } from "src/@types/cms";

export class AssetAPIClient {
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

  async getAssetInfoList(projectName: string): Promise<AssetInfoForEditing[]> {
    try {
      const infoList = await Storage.list(projectName);

      return Promise.all(
        infoList.results.map(async asset => {
          const url = asset && asset.key && (await Storage.get(asset.key));

          return {
            url,
            name: asset.key,
            size: asset.size,
          };
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  async createAsset({ path, asset }: { path: string; asset: File }) {
    try {
      await Storage.put(path, asset);
    } catch (error) {
      throw error;
    }
  }

  async deleteAsset({ name }: { name: string }) {
    try {
      await Storage.remove(name);
    } catch (error) {
      throw error;
    }
  }
}
