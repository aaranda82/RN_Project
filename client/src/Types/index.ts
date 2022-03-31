import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Overview: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type LoginFormProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;
export type RegisterFormProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;
export type OverviewProps = NativeStackScreenProps<
  RootStackParamList,
  'Overview'
>;
