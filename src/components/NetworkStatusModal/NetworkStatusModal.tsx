import React, {useEffect, useState} from 'react';
import {Modal, Text, View} from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import Lottie from 'lottie-react-native';

const NetworkStatusModal = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected || false);
    });
  }, []);

  return (
    <Modal isOpen={!isConnected} size={'lg'}>
      <Modal.Content>
        <Modal.Body>
          <View className="flex-1 justify-center items-center">
            <View className="w-full h-[200]">
              <Lottie
                source={require('src/assets/animations/no-internet-connection.json')}
                autoPlay
                loop
                style={{flex: 1}}
              />
            </View>
            <Text>Không có kết nối internet</Text>
          </View>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default NetworkStatusModal;
