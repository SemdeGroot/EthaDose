import React from "react";
import { Platform, Pressable, Text, View, type ViewStyle } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { AppIcon } from "./AppIcon";
import { useTheme } from "@/state/theme";

export default function SecondaryButton({
  title,
  onPress,
  icon,
  style,
}: {
  title: string;
  onPress: () => void;
  icon?: LucideIcon;
  style?: ViewStyle;
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: 48,
          borderRadius: theme.radius.xl,
          paddingHorizontal: theme.space.lg,
          flexDirection: "row",
          gap: theme.space.sm,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: pressed ? theme.panelSoft : theme.panel,
          borderWidth: 1,
          borderColor: theme.border,
          ...(Platform.OS === "web" ? { cursor: "pointer" } : null),
        },
        style,
      ]}
    >
      {icon ? (
        <View style={{ marginTop: 1 }}>
          <AppIcon icon={icon} size={18} color={theme.primaryDark} />
        </View>
      ) : null}
      <Text style={{ color: theme.primaryDark, fontFamily: theme.fonts.bold, fontSize: 15 }}>
        {title}
      </Text>
    </Pressable>
  );
}
