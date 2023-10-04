import {AxiosResponse} from 'axios';
import useApi from '../../api';

const useGetMoviesGenres = (): {
  getMoviesGenres: () => Promise<AxiosResponse['data']>;
} => {
  const {getData} = useApi();

  const getMoviesGenres = async (): Promise<AxiosResponse['data']> => {
    try {
      const resp = await getData('3/genre/movie/list', {});
      return resp;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  return {getMoviesGenres};
};

export default useGetMoviesGenres;
