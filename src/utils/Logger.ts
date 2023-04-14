import {getUniqueId, getDeviceName} from 'react-native-device-info';

class Logger {
  private uniqueId: string = '';
  private deviceName: string = '';

  constructor() {
    getUniqueId().then(uniqueId => {
      this.uniqueId = uniqueId;
    });
    getDeviceName().then(deviceName => {
      this.deviceName = deviceName;
    });
  }

  public log(message: string | string[]) {
    console.log('================================================');
    console.log(`${this.deviceName} - ${this.uniqueId}`);
    console.log('-------');

    if (Array.isArray(message)) {
      message.forEach(msg => console.log(msg));
    } else {
      console.log(message);
    }
    console.log('================================================');
  }
}

const logger = new Logger();
export default logger;
