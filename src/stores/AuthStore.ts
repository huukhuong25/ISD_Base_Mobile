import AsyncStorage from '@react-native-async-storage/async-storage';
import {action, makeObservable, observable} from 'mobx';
import {Alert} from 'react-native';
import {UserModel} from 'src/models/UserModel';
import {authService, axiosHelper} from 'src/services';
import {AsyncStorageKey, Constants, logger} from 'src/utils';
import appStore from './AppStore';

class AuthStore {
  @observable currentUser: UserModel | undefined = undefined;

  constructor() {
    makeObservable(this);
  }

  @action
  setCurrentUser(user: UserModel | undefined) {
    this.currentUser = user;
  }

  @action
  async checkIsUserLoggedIn(): Promise<boolean> {
    const userString = await AsyncStorage.getItem(AsyncStorageKey.KEY_USER);
    if (userString) {
      const user = JSON.parse(userString) as UserModel;
      axiosHelper.setBearerToken(user.token);
      this.setCurrentUser(user);
      const domain = await AsyncStorage.getItem(AsyncStorageKey.KEY_URL);
      if (domain) {
        axiosHelper.setBaseUrl(domain);
      } else {
        axiosHelper.setBaseUrl(Constants.PRODUCTION_URL);
      }
      return true;
    }
    logger.log('Check user logged in: ' + (userString !== null));
    return false;
  }

  @action
  async handleLogin(username: string, password: string): Promise<boolean> {
    const result = await authService.checkLogin(username, password);
    if (result) {
      if (result?.isSuccess) {
        this.setCurrentUser(result?.data);
        axiosHelper.setBearerToken(result?.data.token);
        AsyncStorage.setItem(AsyncStorageKey.KEY_URL, appStore.apiUrl);
        AsyncStorage.setItem(
          AsyncStorageKey.KEY_USER,
          JSON.stringify(result?.data),
        );
        AsyncStorage.setItem(AsyncStorageKey.KEY_REMEMBER_USERNAME, username);
        AsyncStorage.setItem(AsyncStorageKey.KEY_REMEMBER_PASSWORD, password);
      } else {
        Alert.alert('Thông báo', result?.message);
      }
    }
    return result?.isSuccess || false;
  }

  @action
  handleLogout() {
    logger.log('Loging out...');
    AsyncStorage.removeItem(AsyncStorageKey.KEY_URL);
    AsyncStorage.removeItem(AsyncStorageKey.KEY_USER);
    this.setCurrentUser(undefined);
  }
}

const authStore = new AuthStore();
export default authStore;
