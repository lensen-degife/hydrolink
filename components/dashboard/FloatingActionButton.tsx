import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDashboardTheme } from './ThemeContext';

type FABItem = {
  id: string;
  label: string;
  icon: string;
  color?: string;
};

type FABProps = {
  onSelectAction?: (actionId: string) => void;
};

export function FloatingActionButton({ onSelectAction }: FABProps) {
  const { colors } = useDashboardTheme();
  const [isOpen, setIsOpen] = useState(false);
  const rotation = useSharedValue(0);

  const fabItems: FABItem[] = [
    { id: 'report_leak', label: 'Report Leak', icon: 'water-outline' },
    { id: 'contact_office', label: 'Contact Office', icon: 'business-outline' },
    { id: 'emergency_call', label: 'Emergency Call', icon: 'call-outline', color: '#EF4444' },
    { id: 'new_request', label: 'New Request', icon: 'add-circle-outline' },
  ];

  const toggleFAB = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    rotation.value = withSpring(nextState ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handleAction = (id: string) => {
    toggleFAB();
    onSelectAction?.(id);
  };

  const fabIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 45}deg` }],
  }));

  return (
    <>
      {/* Expanded Modal Backdrop */}
      {isOpen && (
        <Modal transparent animationType="fade" visible={isOpen} onRequestClose={toggleFAB}>
          <Pressable style={styles.backdrop} onPress={toggleFAB}>
            <View style={styles.speedDialContainer}>
              {fabItems.map((item, index) => (
                <Pressable
                  key={item.id}
                  onPress={() => handleAction(item.id)}
                  style={({ pressed }) => [
                    styles.speedDialRow,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={[styles.labelChip, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.labelText, { color: colors.textPrimary }]}>
                      {item.label}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.miniFabIcon,
                      { backgroundColor: item.color || '#1976D2' },
                    ]}
                  >
                    <Ionicons name={item.icon as any} size={20} color="#FFFFFF" />
                  </View>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Modal>
      )}

      {/* Main Trigger Button */}
      <View style={styles.fabWrapper}>
        <Pressable
          onPress={toggleFAB}
          style={({ pressed }) => [
            styles.fabButton,
            pressed && styles.fabPressed,
          ]}
          accessibilityLabel="Quick Actions Menu"
        >
          <Animated.View style={fabIconStyle}>
            <Ionicons name="add" size={30} color="#FFFFFF" />
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fabWrapper: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    zIndex: 99,
  },
  fabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  fabPressed: {
    transform: [{ scale: 0.92 }],
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 160,
    paddingRight: 24,
  },
  speedDialContainer: {
    gap: 14,
    alignItems: 'flex-end',
  },
  speedDialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  labelChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  labelText: {
    fontSize: 13,
    fontWeight: '700',
  },
  miniFabIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.95 }],
  },
});
