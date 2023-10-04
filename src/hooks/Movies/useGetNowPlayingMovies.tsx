import {AxiosResponse} from 'axios';
import useApi from '../../api';

const useGetNowPlayingMovies = (): {
  getNowPlayingMovies: (page: string) => Promise<AxiosResponse['data']>;
} => {
  const {getData} = useApi();

  const getNowPlayingMovies = async (
    page: string,
  ): Promise<AxiosResponse['data']> => {
    try {
      const resp = await getData(
        `3/movie/now_playing?language=es-ESP&page=${page}`,
        {},
      );
      return resp;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  return {getNowPlayingMovies};
};

export default useGetNowPlayingMovies;
