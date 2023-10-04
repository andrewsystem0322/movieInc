import {AxiosResponse} from 'axios';
import useApi from '../../api';

const useGetUpcomingMovies = (): {
  getUpcomingMovies: (page: string) => Promise<AxiosResponse['data']>;
} => {
  const {getData} = useApi();

  const getUpcomingMovies = async (
    page: string,
  ): Promise<AxiosResponse['data']> => {
    try {
      const resp = await getData(
        `3/movie/upcoming?language=es-ESP&page=${page}`,
        {},
      );
      return resp;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  return {getUpcomingMovies};
};

export default useGetUpcomingMovies;
