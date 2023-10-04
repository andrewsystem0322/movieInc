import {AxiosResponse} from 'axios';
import useApi from '../../api';

const useGetActorsSelectedMovie = (): {
  getActorsSelectedMovie: (idMovie: string) => Promise<AxiosResponse['data']>;
} => {
  const {getData} = useApi();

  const getActorsSelectedMovie = async (
    idMovie: string,
  ): Promise<AxiosResponse['data']> => {
    try {
      const resp = await getData(`3/movie/${idMovie}/credits`, {});
      return resp;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  return {getActorsSelectedMovie};
};

export default useGetActorsSelectedMovie;
