import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Settings screen - App preferences and information
 */
export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <SettingRow
          icon="moon"
          title="Dark Mode"
          subtitle="Coming soon"
          onPress={() => {}}
        />
        <SettingRow
          icon="notifications"
          title="Notifications"
          subtitle="Turn timer alerts"
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>
        <SettingRow
          icon="cloud-upload"
          title="Backup & Sync"
          subtitle="Save games to cloud"
          onPress={() => {}}
        />
        <SettingRow
          icon="trash"
          title="Clear Data"
          subtitle="Delete all saved games"
          onPress={() => {}}
          destructive
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <SettingRow
          icon="information-circle"
          title="Version"
          subtitle="1.0.0"
          onPress={() => {}}
        />
        <SettingRow
          icon="help-circle"
          title="Help & Support"
          subtitle="Get help using the app"
          onPress={() => {}}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>TheRuleBook</Text>
        <Text style={styles.footerSubtext}>
          Your companion for board game nights
        </Text>
      </View>
    </ScrollView>
  );
}

/**
 * Individual setting row component
 */
function SettingRow({
  icon,
  title,
  subtitle,
  onPress,
  destructive = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  destructive?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        <Ionicons
          name={icon}
          size={24}
          color={destructive ? '#FF3B30' : '#007AFF'}
        />
        <View style={styles.rowText}>
          <Text style={[styles.rowTitle, destructive && styles.destructiveText]}>
            {title}
          </Text>
          {subtitle && <Text style={styles.rowSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  rowSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  destructiveText: {
    color: '#FF3B30',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  footerSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
});
