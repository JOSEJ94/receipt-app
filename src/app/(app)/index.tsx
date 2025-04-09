import { observer } from "mobx-react-lite"
import { ImageStyle, Text, TextStyle, ViewStyle } from "react-native"
import { Screen } from "@/components"
import { isRTL } from "@/i18n"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useStores } from "@/models"

export default observer(function WelcomeScreen() {
  const { authStore } = useStores()
  const { theme, themed } = useAppTheme()
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <Text>User: {String(authStore.isAuthenticated)}</Text>
      <Text>Info:</Text>
      <Text>{JSON.stringify(authStore.user)}</Text>
    </Screen>
  )
})

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
})

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
})

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})
