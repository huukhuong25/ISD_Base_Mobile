import React from 'react';
import {Button, HStack, Text, View} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStore, authStore, counterStore} from 'src/stores';
import {observer} from 'mobx-react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Constants} from 'src/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from 'src/routers';

type props = NativeStackScreenProps<RootStackParams, 'HomeScreen'>;

const HomeScreen = ({navigation}: props) => {
  // HomeScreen.tsx

  const handleLogout = () => {
    authStore.handleLogout();
    navigation.replace('LoginScreen');
  };

  return (
    <SafeAreaView className={'flex-1'}>
      <HStack className="bg-white justify-between p-2">
        <Text>Xin chào, {authStore.currentUser?.userName}</Text>
        <Button onPress={handleLogout}>Đăng xuất</Button>
      </HStack>
      <View className={'flex-1 justify-center items-center bg-white'}>
        <Button w={50} my={2} onPress={counterStore.decrement}>
          <AntDesign name="minus" color={'#fff'} size={20} />
        </Button>

        <Text className={'font-bold text-4xl'}>{counterStore.count}</Text>

        <Button w={50} my={2} onPress={counterStore.increment}>
          <AntDesign name="plus" color={'#fff'} size={20} />
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default observer(HomeScreen);
