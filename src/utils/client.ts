import axios from "axios";
import Config from "src/config";

export const getRedisValue = async (ip: string) => {
  try {
    const { data } = await axios.get<{ data: string }>(
      `${Config.HOST_API_URL}/store?key=${ip}-store`,
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const setRedisValue = async (ip: string, value: string) => {
  try {
    const { data } = await axios.post(
      `${Config.HOST_API_URL}/store?key=${ip}-store`,
      {
        value,
      },
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
