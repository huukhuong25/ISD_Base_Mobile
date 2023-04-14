import {action, makeObservable, observable} from 'mobx';

class CounterStore {
  @observable count: number = 0;

  constructor() {
    makeObservable(this);
  }

  @action
  increment = () => {
    this.count++;
  };

  @action
  decrement = () => {
    this.count--;
  };
}

const counterStore = new CounterStore();
export default counterStore;
