import React, {useEffect} from 'react';
import {Spinner, StatusBar, View} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from 'src/routers';
import {observer} from 'mobx-react';
import {authStore} from 'src/stores';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from 'src/utils';

type props = NativeStackScreenProps<RootStackParams, 'SplashScreen'>;

const SplashScreen = ({navigation}: props) => {
  // SplashScreen.tsx

  useEffect(() => {
    checkIsUserLoggedIn();
  }, []);

  const checkIsUserLoggedIn = async () => {
    const result = await authStore.checkIsUserLoggedIn();
    if (result) {
      navigation.replace('HomeScreen');
    } else {
      const username =
        (await AsyncStorage.getItem(AsyncStorageKey.KEY_REMEMBER_USERNAME)) ||
        '';
      const password =
        (await AsyncStorage.getItem(AsyncStorageKey.KEY_REMEMBER_PASSWORD)) ||
        '';
      navigation.replace('LoginScreen', {
        username,
        password,
      });
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <StatusBar
        translucent
        backgroundColor={'#fff'}
        barStyle={'dark-content'}
      />
      <Spinner size={'lg'} />
    </View>
  );
};

export default observer(SplashScreen);
