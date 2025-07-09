# react-native-liquid-glass

A cross-platform React Native wrapper for Apple's new iOS 16+ Liquid Glass UI. Provides a beautiful glass morphism effect that falls back gracefully on older iOS versions and Android.

## Features

- 🌟 **Native iOS Liquid Glass**: Uses `systemUltraThinMaterial` on iOS 16+ for authentic Apple design
- 📱 **Cross-platform**: Works on both iOS and Android with appropriate fallbacks
- 🎨 **Customizable**: Multiple blur styles, intensity control, and border options
- ⚡ **Performance**: Hardware-accelerated rendering for smooth animations
- 🔧 **TypeScript**: Full TypeScript support with comprehensive type definitions

## Installation

```sh
npm install react-native-liquid-glass
# or
yarn add react-native-liquid-glass
```

### iOS

For iOS, the library uses Swift and requires no additional setup. The podspec will automatically handle the Swift configuration.

### Android

For Android, the library provides a custom glass effect implementation using gradients and transparency. No additional dependencies required.

## Usage

### Basic Example

```jsx
import { LiquidGlassView } from 'react-native-liquid-glass';

function MyComponent() {
  return (
    <LiquidGlassView
      style={{ width: 200, height: 100 }}
      intensity={0.8}
      borderRadius={16}
    />
  );
}
```

### Advanced Example

```jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LiquidGlassView } from 'react-native-liquid-glass';

function GlassCard() {
  return (
    <LiquidGlassView
      style={styles.card}
      blurStyle="systemUltraThinMaterial"
      intensity={0.9}
      borderRadius={20}
      borderWidth={1}
      borderColor="#ffffff30"
    >
      <View style={styles.content}>
        <Text style={styles.title}>Glass Card</Text>
        <Text style={styles.subtitle}>Beautiful glass morphism effect</Text>
      </View>
    </LiquidGlassView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 16,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
  },
});
```

## Props

| Prop | Type | Default | Platform | Description |
|------|------|---------|----------|-------------|
| `intensity` | `number` | `1.0` | iOS, Android | Blur intensity from 0.0 to 1.0 |
| `blurStyle` | `string` | `'systemUltraThinMaterial'` | iOS | Blur style for iOS |
| `borderRadius` | `number` | `0` | iOS, Android | Border radius for the glass effect |
| `borderWidth` | `number` | `0` | iOS, Android | Border width |
| `borderColor` | `string` | `'transparent'` | iOS, Android | Border color (hex, rgb, or named) |
| `color` | `string` | `'transparent'` | iOS, Android | Background color |

### Blur Styles (iOS)

- `'systemUltraThinMaterial'` - Ultra thin material (iOS 16+)
- `'systemThinMaterial'` - Thin material (iOS 16+)
- `'systemMaterial'` - Standard material (iOS 16+)
- `'systemThickMaterial'` - Thick material (iOS 16+)
- `'systemChromeMaterial'` - Chrome material (iOS 16+)
- `'light'` - Light blur (all iOS versions)
- `'dark'` - Dark blur (all iOS versions)

**Note**: Material styles require iOS 16+. On older versions, they fall back to `'light'` blur.

### Platform Behavior

#### iOS
- Uses native `UIVisualEffectView` with `UIBlurEffect`
- Hardware-accelerated rendering
- Authentic Apple design language
- Automatic fallback for older iOS versions

#### Android
- Custom implementation using gradients and transparency
- Mimics glass effect with layered drawables
- Hardware-accelerated with `LAYER_TYPE_HARDWARE`
- Subtle shadows for depth

## Examples

### Glass Button

```jsx
<LiquidGlassView
  style={styles.button}
  blurStyle="systemMaterial"
  intensity={0.8}
  borderRadius={25}
  borderWidth={2}
  borderColor="#ffffff40"
>
  <Text style={styles.buttonText}>Glass Button</Text>
</LiquidGlassView>
```

### Glass Panel

```jsx
<LiquidGlassView
  style={styles.panel}
  blurStyle="systemUltraThinMaterial"
  intensity={0.7}
  borderRadius={12}
  borderWidth={0.5}
  borderColor="#ffffff20"
>
  <View style={styles.panelContent}>
    <Text style={styles.panelTitle}>Settings</Text>
    {/* Panel content */}
  </View>
</LiquidGlassView>
```

### Minimal Glass Element

```jsx
<LiquidGlassView
  style={styles.minimal}
  intensity={0.5}
  borderRadius={8}
/>
```

## Best Practices

1. **Background**: Place glass elements over colorful or textured backgrounds for best effect
2. **Intensity**: Use 0.6-0.9 for most use cases, 0.3-0.5 for subtle effects
3. **Borders**: Add subtle borders (`#ffffff20` to `#ffffff40`) for definition
4. **Performance**: Avoid animating intensity frequently on Android
5. **Accessibility**: Ensure sufficient contrast with text content

## Platform Compatibility

| Platform | Minimum Version | Features |
|----------|----------------|----------|
| iOS | 12.0+ | Full support with native blur effects |
| Android | 5.0+ | Custom glass effect implementation |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
