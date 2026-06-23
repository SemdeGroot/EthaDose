import React from "react";
import { Modal, Platform, Pressable, ScrollView, View, useWindowDimensions } from "react-native";
import { X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppIcon } from "@/components/ui/AppIcon";
import AppText from "@/components/ui/AppText";
import { useTheme } from "@/state/theme";

export function AppModal({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const horizontalPadding = Math.max(theme.space.lg, insets.left, insets.right);
  const verticalPadding = Math.max(theme.space.lg, insets.top, insets.bottom);
  const cardWidth = Math.min(width - horizontalPadding * 2, 680);
  const cardMaxHeight = Math.max(240, height - verticalPadding * 2);

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: horizontalPadding,
          paddingVertical: verticalPadding,
          backgroundColor: "rgba(14,23,38,0.34)",
        }}
      >
        <Pressable onPress={onClose} style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }} />
        <View
          style={{
            width: cardWidth,
            maxHeight: cardMaxHeight,
            borderRadius: theme.radius.xl,
            borderWidth: 1,
            borderColor: theme.border,
            backgroundColor: theme.panel,
            overflow: "hidden",
            ...(Platform.OS === "web" ? theme.elevation.lg : null),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              gap: theme.space.md,
              padding: theme.space.lg,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
            }}
          >
            <View style={{ flex: 1, gap: theme.space.xs }}>
              <AppText variant="titleMd" weight="semibold">
                {title}
              </AppText>
              {subtitle ? (
                <AppText variant="bodySm" color="textSub">
                  {subtitle}
                </AppText>
              ) : null}
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Sluiten"
              onPress={onClose}
              hitSlop={8}
              style={({ pressed }) => ({
                width: 40,
                height: 40,
                borderRadius: theme.radius.full,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: pressed ? theme.panelSoft : theme.hover,
                ...(Platform.OS === "web" ? { cursor: "pointer" } : null),
              })}
            >
              <AppIcon icon={X} size={18} color={theme.textSub} />
            </Pressable>
          </View>
          <ScrollView
            contentContainerStyle={{ padding: theme.space.lg, gap: theme.space.md }}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
