import { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { LiquidGlassView } from 'react-native-liquid-glass';

export default function App() {
  const [selectedStyle, setSelectedStyle] = useState<
    | 'light'
    | 'dark'
    | 'systemUltraThinMaterial'
    | 'systemThinMaterial'
    | 'systemMaterial'
    | 'systemThickMaterial'
  >('systemUltraThinMaterial');
  const [intensity, setIntensity] = useState(0.5);

  const blurStyles = [
    { key: 'systemUltraThinMaterial', label: 'Ultra Thin Material' },
    { key: 'systemThinMaterial', label: 'Thin Material' },
    { key: 'systemMaterial', label: 'Material' },
    { key: 'systemThickMaterial', label: 'Thick Material' },
    { key: 'light', label: 'Light' },
    { key: 'dark', label: 'Dark' },
  ] as const;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1743273275142-c4fdbd1ccba4?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>React Native Liquid Glass</Text>
          <Text style={styles.subtitle}>
            Cross-platform glass effect component
          </Text>

          {/* Style Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Blur Style</Text>
            <View style={styles.styleGrid}>
              {blurStyles.map((style) => (
                <TouchableOpacity
                  key={style.key}
                  style={[
                    styles.styleButton,
                    selectedStyle === style.key && styles.selectedStyleButton,
                  ]}
                  onPress={() => setSelectedStyle(style.key)}
                >
                  <Text
                    style={[
                      styles.styleButtonText,
                      selectedStyle === style.key &&
                        styles.selectedStyleButtonText,
                    ]}
                  >
                    {style.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Intensity Slider */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Intensity: {intensity.toFixed(1)}
            </Text>
            <Text style={styles.sectionTitle}>
              Current Intensity: {intensity.toFixed(1)}
            </Text>
            <View style={styles.intensityContainer}>
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.intensityButton,
                    intensity === value && styles.selectedIntensityButton,
                  ]}
                  onPress={() => setIntensity(value)}
                >
                  <Text style={styles.intensityButtonText}>{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Visual Comparison */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Visual Comparison</Text>
            <Text style={styles.comparisonText}>
              Compare different blur styles side by side:
            </Text>
            <View style={styles.comparisonGrid}>
              {[
                'systemUltraThinMaterial',
                'systemThinMaterial',
                'systemMaterial',
                'systemThickMaterial',
              ].map((style) => (
                <View key={style} style={styles.comparisonItem}>
                  <LiquidGlassView
                    style={styles.comparisonGlass}
                    blurStyle={
                      style as
                        | 'systemUltraThinMaterial'
                        | 'systemThinMaterial'
                        | 'systemMaterial'
                        | 'systemThickMaterial'
                    }
                    intensity={intensity}
                    borderRadius={10}
                    borderWidth={1}
                    borderColor="#cccccc"
                  >
                    <Text style={styles.comparisonLabel}>
                      {style.replace('system', '').replace('Material', '')}
                    </Text>
                  </LiquidGlassView>
                </View>
              ))}
            </View>
          </View>

          {/* Examples */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Examples</Text>

            {/* Basic Glass Card */}
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleTitle}>Basic Glass Card</Text>
              <LiquidGlassView
                style={styles.glassCard}
                blurStyle={selectedStyle}
                intensity={intensity}
                borderRadius={16}
                borderWidth={1}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Glass Effect</Text>
                  <Text style={styles.cardText}>
                    This demonstrates the liquid glass effect with customizable
                    properties.
                  </Text>
                </View>
              </LiquidGlassView>
            </View>

            {/* Rounded Glass Button */}
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleTitle}>Rounded Glass Button</Text>
              <LiquidGlassView
                style={styles.glassButton}
                blurStyle={selectedStyle}
                intensity={intensity}
                borderRadius={25}
                borderWidth={1}
                borderColor="#cccccc"
              >
                <Text style={styles.buttonText}>Glass Button</Text>
              </LiquidGlassView>
            </View>

            {/* Glass Panel */}
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleTitle}>Glass Panel</Text>
              <LiquidGlassView
                style={styles.glassPanel}
                blurStyle={selectedStyle}
                intensity={intensity}
                borderRadius={12}
                borderWidth={1}
                borderColor="#cccccc"
              >
                <View style={styles.panelContent}>
                  <Text style={styles.panelTitle}>Settings Panel</Text>
                  <View style={styles.panelItem}>
                    <Text style={styles.panelItemText}>
                      Blur Style: {selectedStyle}
                    </Text>
                  </View>
                  <View style={styles.panelItem}>
                    <Text style={styles.panelItemText}>
                      Intensity: {intensity.toFixed(1)}
                    </Text>
                  </View>
                </View>
              </LiquidGlassView>
            </View>

            {/* Minimal Glass Element */}
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleTitle}>Minimal Glass Element</Text>
              <LiquidGlassView
                style={styles.minimalGlass}
                blurStyle={selectedStyle}
                intensity={intensity}
                borderRadius={8}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 100,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#020202',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#050505',
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#020202',
    marginBottom: 16,
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  styleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: '#555555',
  },
  selectedStyleButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  styleButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  selectedStyleButtonText: {
    color: '#020202',
    fontWeight: '600',
  },
  intensityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  intensityButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: '#555555',
  },
  selectedIntensityButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  intensityButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
  exampleContainer: {
    marginBottom: 24,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#020202',
    marginBottom: 12,
  },
  glassCard: {
    height: 120,
    padding: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#020202',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#020202',
    lineHeight: 20,
  },
  glassButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  glassPanel: {
    padding: 16,
  },
  panelContent: {
    gap: 12,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#020202',
    marginBottom: 8,
  },
  panelItem: {
    paddingVertical: 4,
  },
  panelItemText: {
    fontSize: 14,
    color: '#020202',
  },
  minimalGlass: {
    height: 60,
    width: '100%',
  },
  comparisonText: {
    fontSize: 14,
    color: '#020202',
    marginBottom: 16,
  },
  comparisonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  comparisonItem: {
    flex: 1,
    minWidth: 80,
  },
  comparisonGlass: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comparisonLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#020202',
    textAlign: 'center',
  },
});
