import {action, makeObservable, observable, runInAction} from 'mobx';
import {Constants} from 'src/utils';

class AppStore {
  @observable apiUrl: string = Constants.PRODUCTION_URL;
  @observable loading: boolean = false;
  @observable downloadPercents: number = 0;
  @observable uploadPercents: number = 0;

  constructor() {
    makeObservable(this);
  }

  @action
  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  @action
  setDownloadPercents(downloadPercents: number) {
    this.downloadPercents = downloadPercents;
  }

  @action
  setUploadPercents(uploadPercents: number) {
    this.uploadPercents = uploadPercents;
  }

  @action
  setLoading(value: boolean) {
    if (value) {
      this.loading = value;
    } else {
      setTimeout(() => {
        runInAction(() => {
          this.loading = value;
        });
      }, 1000);
    }
  }
}

const appStore = new AppStore();
export default appStore;
