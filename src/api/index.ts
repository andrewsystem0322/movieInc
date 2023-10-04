import axios, {AxiosResponse} from 'axios';

const urlBaseLocal = 'https://api.themoviedb.org/';
const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmQ5NzFhM2NlNGVmZGI4ODY1MzgzNWI5NzIxZjBmZCIsInN1YiI6IjY1MWMyMGZkZWE4NGM3MDE0ZWZkNjQwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Dq3kMkwk-TZwGgm29NMS25akQPWVYiBG9YC5vkgo2k';

const useApi = (): {
  getData: (path: string, params: unknown) => Promise<AxiosResponse>;
  deleteData: (
    path: string,
    isLocalBase: boolean,
    params: unknown,
  ) => Promise<AxiosResponse>;
  postData: (path: string, params: unknown) => Promise<AxiosResponse>;
  putData: (
    path: string,
    isLocalBase: boolean,
    params: unknown,
  ) => Promise<AxiosResponse>;
} => {
  const getData = async (
    path: string,
    params?: unknown,
  ): Promise<AxiosResponse['data']> => {
    try {
      const res = await axios.get(`${urlBaseLocal}${path}`, {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  const putData = async (
    path: string,
    isLocalBase?: boolean,
    params?: unknown,
  ): Promise<AxiosResponse['data']> => {
    try {
      const res = await axios.put(`${urlBaseLocal}${path}`, params);
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  const postData = async (
    path: string,
    params?: unknown,
  ): Promise<AxiosResponse['data']> => {
    try {
      const res = await axios.post(`${urlBaseLocal}${path}`, params, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  const deleteData = async (
    path: string,
    isLocalBase?: boolean,
    params?: unknown,
  ): Promise<AxiosResponse['data']> => {
    try {
      const res = await axios.delete(`${urlBaseLocal}${path}`, {
        params,
      });
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  return {getData, putData, deleteData, postData};
};

export default useApi;
