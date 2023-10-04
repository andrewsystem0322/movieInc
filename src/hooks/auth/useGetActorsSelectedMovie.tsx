import {AxiosResponse} from 'axios';
import useApi from '../../api';

const useGetGuestSession = (): {
  getGuestSession: () => Promise<AxiosResponse['data']>;
} => {
  const {getData} = useApi();

  const getGuestSession = async (): Promise<AxiosResponse['data']> => {
    try {
      const resp = await getData('3/authentication/guest_session/new', {});
      return resp;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  return {getGuestSession};
};

export default useGetGuestSession;
