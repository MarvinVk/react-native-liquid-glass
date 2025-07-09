import type { ViewStyle } from 'react-native';
import LiquidGlassViewNativeComponent from './LiquidGlassViewNativeComponent';
import type { NativeProps } from './LiquidGlassViewNativeComponent';

export interface LiquidGlassViewProps {
  /**
   * Style for the container view
   */
  style?: ViewStyle;

  /**
   * Children components
   */
  children?: React.ReactNode;

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

const LiquidGlassView = (props: LiquidGlassViewProps) => {
  const {
    style,
    intensity,
    blurStyle,
    borderRadius,
    borderWidth,
    borderColor,
    ...restProps
  } = props;

  // Extract only the non-color style properties to avoid conflicts
  const safeStyle = style ? { ...style } : {};
  delete safeStyle.backgroundColor;
  delete safeStyle.borderColor;

  return (
    <LiquidGlassViewNativeComponent
      style={safeStyle}
      intensity={intensity}
      blurStyle={blurStyle || 'systemUltraThinMaterial'}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      borderColor={borderColor}
      {...restProps}
    />
  );
};

LiquidGlassView.displayName = 'LiquidGlassView';

export { LiquidGlassView };
export type { NativeProps };
export default LiquidGlassView;
