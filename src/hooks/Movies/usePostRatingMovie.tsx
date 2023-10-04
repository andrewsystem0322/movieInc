import {AxiosResponse} from 'axios';
import useApi from '../../api';

const usePostRatingMovie = (): {
  postRatingMovie: (
    idMovie: string,
    guestSessionId: string,
    rate: number,
  ) => Promise<AxiosResponse['data']>;
} => {
  const {postData} = useApi();

  const postRatingMovie = async (
    idMovie: string,
    guestSessionId: string,
    rate: number,
  ): Promise<AxiosResponse['data']> => {
    try {
      const resp = await postData(
        `3/movie/${idMovie}/rating?guest_session_id=${guestSessionId}`,
        {value: rate},
      );
      return resp;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  return {postRatingMovie};
};

export default usePostRatingMovie;
