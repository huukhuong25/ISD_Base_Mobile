import {appStore} from 'src/stores';
import {ResponseModel} from 'src/models';
import {UserModel} from 'src/models/UserModel';
import {logger} from 'src/utils';
import axiosHelper from './AxiosHelper';

class AuthService {
  checkLogin = async (username: string, password: string) => {
    const url = '/Permission/Auth/Authenticate';
    const result: ResponseModel<UserModel> | null = await axiosHelper.post(
      url,
      {
        username: username,
        password: password,
      },
    );

    logger.log([
      'handleLogin',
      appStore.apiUrl + url,
      'username: ' + username,
      'password: ' + password,
      JSON.stringify(result),
    ]);

    return result;
  };
}

const authService = new AuthService();
export default authService;
