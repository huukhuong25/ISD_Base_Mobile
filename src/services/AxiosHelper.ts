import {ResponseModel} from 'src/models/ResponseModel';

import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios';
import {appStore} from 'src/stores';
import {Alert} from 'react-native';
import {Constants, logger} from 'src/utils';

class AxiosHelper {
  private axiosInstance: AxiosInstance;
  private readonly timeout: number = 5000;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: Constants.PRODUCTION_URL,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      onDownloadProgress: progressEvent => {
        const precentage = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1),
        );
        appStore.setDownloadPercents(precentage);

        if (!appStore.loading) {
          appStore.setLoading(true);
        }
      },
      onUploadProgress: progressEvent => {
        const {loaded, total} = progressEvent;
        const precentage = Math.floor((loaded * 100) / (total || 1));
        appStore.setUploadPercents(precentage);

        if (!appStore.loading) {
          appStore.setLoading(true);
        }
      },
    });
  }

  public setBaseUrl(baseUrl: string) {
    this.axiosInstance.defaults.baseURL = baseUrl;
    appStore.setApiUrl(baseUrl);
  }

  public setBearerToken(token: string) {
    this.axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`;
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ResponseModel<T> | null> {
    logger.log('calling...', url);
    try {
      appStore.setLoading(true);
      const response = await this.axiosInstance.get(url, config);
      return response.data as ResponseModel<T>;
    } catch (error: any) {
      this.handleError(error);
      return null;
    } finally {
      appStore.setLoading(false);
    }
  }

  public async post<T, U>(
    url: string,
    params?: U,
    config?: AxiosRequestConfig,
  ): Promise<ResponseModel<T> | null> {
    try {
      logger.log('calling...', url, JSON.stringify(params, null, 2));
      appStore.setLoading(true);
      const response = await this.axiosInstance.post(url, params, config);
      return response.data as ResponseModel<T>;
    } catch (error: any) {
      this.handleError(error);
      return null;
    } finally {
      appStore.setLoading(false);
    }
  }

  public async put<T, U>(
    url: string,
    params?: U,
    config?: AxiosRequestConfig,
  ): Promise<ResponseModel<T> | null> {
    try {
      logger.log('calling...', url, JSON.stringify(params, null, 2));
      appStore.setLoading(true);
      const response = await this.axiosInstance.put(url, params, config);
      return response.data as ResponseModel<T>;
    } catch (error: any) {
      this.handleError(error);
      return null;
    } finally {
      appStore.setLoading(false);
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ResponseModel<T> | null> {
    try {
      logger.log('calling...', url);
      appStore.setLoading(true);
      const response = await this.axiosInstance.delete(url, config);
      return response.data as ResponseModel<T>;
    } catch (error: any) {
      this.handleError(error);
      return null;
    } finally {
      appStore.setLoading(false);
    }
  }

  private handleError(error: AxiosError) {
    logger.log(JSON.stringify(error));

    if (error.response) {
      const json: ResponseModel<any> = error.response
        .data as ResponseModel<any>;
      if (json) {
        logger.log(JSON.stringify(json));
        if (json.message) {
          Alert.alert('Thông báo', json.message);
        }
      } else {
        Alert.alert('Thông báo', `${error.name}: ${error.message}`);
      }
    } else {
      const message = `code: ${error.code}\nmessage: ${error.message}`;

      if (error.message.includes(`${this.timeout}ms`)) {
        Alert.alert(error.name, `Mạng yếu, vui lòng thử lại sau\n\n${message}`);
      } else {
        Alert.alert(error.name, message);
      }
    }

    appStore.setLoading(false);
  }
}

const axiosHelper = new AxiosHelper();
export default axiosHelper;
