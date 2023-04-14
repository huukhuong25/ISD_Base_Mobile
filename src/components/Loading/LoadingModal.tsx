import React from 'react';
import {Modal, Spinner, View} from 'native-base';
import {appStore} from 'src/stores';
import {observer} from 'mobx-react';

const LoadingModal = () => {
  return (
    <Modal isOpen={appStore.loading}>
      <View flex={1} justifyContent={'center'} alignItems={'center'}>
        <Spinner size={'lg'} />
      </View>
    </Modal>
  );
};

export default observer(LoadingModal);
