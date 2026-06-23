import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { Screen } from "@/components/Screen";
import AppText from "@/components/ui/AppText";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useTheme } from "@/state/theme";

export default function PrivacyScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          padding: theme.space.xl,
          paddingBottom: theme.space["3xl"],
          gap: theme.space.xl,
        }}
      >
        <View style={{ gap: theme.space.sm }}>
          <AppText variant="titleXl" weight="bold">
            Privacy
          </AppText>
          <AppText color="textSub">cAlcohol rekent lokaal op het apparaat of in de browser.</AppText>
        </View>

        <View style={{ gap: theme.space.md }}>
          <AppText>
            Patiëntinvoer wordt standaard niet naar een server verzonden. De app heeft geen accountssysteem, analytics of
            remote logging.
          </AppText>
          <AppText>
            De webversie kan via GitHub Pages worden gehost. GitHub Pages kan reguliere toegangslogs verwerken buiten de
            app om.
          </AppText>
          <AppText>
            Als de app later functionaliteit krijgt die gegevens verstuurt, moet dit privacybeleid eerst worden aangepast.
          </AppText>
        </View>

        <PrimaryButton title="Terug naar calculator" onPress={() => router.push("/")} />
      </ScrollView>
    </Screen>
  );
}
