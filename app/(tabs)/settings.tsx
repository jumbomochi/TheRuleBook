import React from 'react';
import { StyleSheet, Pressable, ScrollView, Switch } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

interface SettingRowProps {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  colorScheme: 'light' | 'dark';
}

function SettingRow({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  colorScheme,
}: SettingRowProps) {
  const colors = Colors[colorScheme];

  return (
    <Pressable
      style={[styles.settingRow, { borderBottomColor: colors.text + '20' }]}
      onPress={onPress}
      disabled={!onPress && !rightElement}>
      <View style={[styles.settingIcon, { backgroundColor: colors.tint + '20' }]}>
        <FontAwesome name={icon} size={18} color={colors.tint} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || (
        onPress && <FontAwesome name="chevron-right" size={14} color={colors.text + '60'} />
      )}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [darkMode, setDarkMode] = React.useState(colorScheme === 'dark');
  const [haptics, setHaptics] = React.useState(true);
  const [sounds, setSounds] = React.useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Appearance</Text>
        <View
          style={[styles.sectionContent, { backgroundColor: colors.background }]}>
          <SettingRow
            icon="moon-o"
            title="Dark Mode"
            subtitle="Reduce eye strain in low light"
            colorScheme={colorScheme}
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: colors.text + '30', true: colors.tint }}
              />
            }
          />
          <SettingRow
            icon="text-width"
            title="Text Size"
            subtitle="Adjust text size for readability"
            onPress={() => {}}
            colorScheme={colorScheme}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Gameplay</Text>
        <View
          style={[styles.sectionContent, { backgroundColor: colors.background }]}>
          <SettingRow
            icon="hand-pointer-o"
            title="Haptic Feedback"
            subtitle="Vibrate on button presses"
            colorScheme={colorScheme}
            rightElement={
              <Switch
                value={haptics}
                onValueChange={setHaptics}
                trackColor={{ false: colors.text + '30', true: colors.tint }}
              />
            }
          />
          <SettingRow
            icon="volume-up"
            title="Sound Effects"
            subtitle="Play sounds for game events"
            colorScheme={colorScheme}
            rightElement={
              <Switch
                value={sounds}
                onValueChange={setSounds}
                trackColor={{ false: colors.text + '30', true: colors.tint }}
              />
            }
          />
          <SettingRow
            icon="clock-o"
            title="Default Timer"
            subtitle="Set default turn timer duration"
            onPress={() => {}}
            colorScheme={colorScheme}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Data</Text>
        <View
          style={[styles.sectionContent, { backgroundColor: colors.background }]}>
          <SettingRow
            icon="cloud-download"
            title="Manage Game Data"
            subtitle="Download or delete game content"
            onPress={() => {}}
            colorScheme={colorScheme}
          />
          <SettingRow
            icon="camera"
            title="My Photos"
            subtitle="Manage your game component photos"
            onPress={() => {}}
            colorScheme={colorScheme}
          />
          <SettingRow
            icon="users"
            title="Player Profiles"
            subtitle="Manage saved player profiles"
            onPress={() => {}}
            colorScheme={colorScheme}
          />
          <SettingRow
            icon="trash"
            title="Clear Play History"
            subtitle="Delete all saved game sessions"
            onPress={() => {}}
            colorScheme={colorScheme}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>About</Text>
        <View
          style={[styles.sectionContent, { backgroundColor: colors.background }]}>
          <SettingRow
            icon="info-circle"
            title="About TheRuleBook"
            subtitle="Version 1.0.0"
            onPress={() => {}}
            colorScheme={colorScheme}
          />
          <SettingRow
            icon="file-text-o"
            title="Licenses"
            subtitle="Open source licenses"
            onPress={() => {}}
            colorScheme={colorScheme}
          />
          <SettingRow
            icon="envelope-o"
            title="Send Feedback"
            onPress={() => {}}
            colorScheme={colorScheme}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with care for board game lovers</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    opacity: 0.6,
    marginLeft: 16,
    marginBottom: 8,
  },
  sectionContent: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 13,
    opacity: 0.5,
  },
});
