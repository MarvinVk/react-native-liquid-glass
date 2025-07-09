import { requireNativeComponent } from 'react-native';
import type { ViewStyle } from 'react-native';

export interface NativeProps {
  /**
   * Style for the view
   */
  style?: ViewStyle;
  /**
   * Blur intensity (0.0 to 1.0)
   * @platform ios android
   */
  intensity?: number;

  /**
   * Blur style for iOS
   * @platform ios
   */
  blurStyle?:
    | 'light'
    | 'dark'
    | 'systemUltraThinMaterial'
    | 'systemThinMaterial'
    | 'systemMaterial'
    | 'systemThickMaterial'
    | 'systemChromeMaterial';

  /**
   * Border radius for the glass effect
   * @platform ios android
   */
  borderRadius?: number;

  /**
   * Border width for the glass effect
   * @platform ios android
   */
  borderWidth?: number;

  /**
   * Border color for the glass effect
   * @platform ios android
   */
  borderColor?: string;
}

export default requireNativeComponent<NativeProps>('LiquidGlassView');
