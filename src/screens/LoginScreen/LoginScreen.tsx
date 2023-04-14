import React, {useState} from 'react';
import {Box, Button, Input, Select, Text, View} from 'native-base';
import {appStore, authStore} from 'src/stores';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from 'src/routers';
import {Constants} from 'src/utils';
import {axiosHelper} from 'src/services';
import {Icon} from 'src/components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type props = NativeStackScreenProps<RootStackParams, 'LoginScreen'>;

const LoginScreen = ({navigation, route}: props) => {
  // LoginScreen.tsx

  const [username, setUsername] = useState(route.params?.username || '');
  const [password, setPassword] = useState(route.params?.password || '');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const result = await authStore.handleLogin(username, password);
    if (result) {
      navigation.replace('HomeScreen');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={100}
        keyboardShouldPersistTaps={'handled'}
        className="flex-1">
        <View mx={4}>
          <Text
            fontSize={20}
            fontWeight={'bold'}
            mb={2}
            mt={4}
            textAlign={'center'}
            textTransform={'uppercase'}>
            Đăng nhập
          </Text>

          <Text fontWeight={'bold'} mb={1}>
            Chọn Server
          </Text>
          <Select
            h={45}
            selectedValue={appStore.apiUrl}
            onValueChange={domain => {
              axiosHelper.setBaseUrl(domain);
            }}
            mb={3}>
            <Select.Item
              value={Constants.PRODUCTION_URL}
              label={'Server thật'}
            />
            <Select.Item value={Constants.DEBUG_URL} label={'Server test'} />
          </Select>

          <Text fontWeight={'bold'} mb={1}>
            Tên đăng nhập
          </Text>
          <Input
            h={45}
            mb={3}
            autoCapitalize={'none'}
            value={username}
            onChangeText={setUsername}
          />

          <Text fontWeight={'bold'} mb={1}>
            Mật khẩu
          </Text>
          <Box flexDirection={'row'}>
            <Input
              flex={1}
              h={45}
              mb={3}
              pr={45}
              autoCapitalize={'none'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <Button
              h={45}
              w={45}
              className={'absolute right-0 top-0 bottom-0'}
              variant={'unstyled'}
              onPress={() => setShowPassword(!showPassword)}>
              <Icon
                type="Entypo"
                name={showPassword ? 'eye-with-line' : 'eye'}
                color={'#333'}
                size={18}
              />
            </Button>
          </Box>

          <Button onPress={handleLogin} mt={2} h={45}>
            Đăng nhập
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
