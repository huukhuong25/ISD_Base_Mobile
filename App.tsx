import React from 'react';
import {NativeBaseProvider, Text} from 'native-base';
import {RootStackNavigation} from 'src/routers';
import {appTheme, Constants} from 'src/utils';
import {appStore} from 'src/stores';
import {observer} from 'mobx-react';
import {LoadingModal, NetworkStatusModal} from 'src/components';

const App = () => {
  return (
    <NativeBaseProvider theme={appTheme}>
      <RootStackNavigation />
      <Text textAlign={'center'} py={1}>
        {`Version: ${Constants.APP_VERSION} - `}
        <Text color={'blue.500'}>{`${appStore.apiUrl}`}</Text>
      </Text>
      <LoadingModal />
      <NetworkStatusModal />
    </NativeBaseProvider>
  );
};

export default observer(App);
