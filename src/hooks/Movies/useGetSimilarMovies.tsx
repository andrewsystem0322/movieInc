import {AxiosResponse} from 'axios';
import useApi from '../../api';

const useGetSimilarMovies = (): {
  getSimilarMovies: (idMovie: string) => Promise<AxiosResponse['data']>;
} => {
  const {getData} = useApi();

  const getSimilarMovies = async (
    idMovie: string,
  ): Promise<AxiosResponse['data']> => {
    try {
      const resp = await getData(
        `3/movie/${idMovie}/similar?language=es-ESP&page=1`,
        {},
      );
      return resp;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  return {getSimilarMovies};
};

export default useGetSimilarMovies;
