import { ColorValue } from 'react-native';

export interface HeaderProps {
  onBackPress: () => void;
  tintColor?: ColorValue;
}
export interface ViewImageProps {
  imageUrl: string | undefined;
  visible: boolean;
  setVisible: (bool: boolean) => void;
}
