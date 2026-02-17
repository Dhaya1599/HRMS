import { StyleSheet } from 'react-native';
import { THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  badge: {
    borderRadius: THEME.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});
