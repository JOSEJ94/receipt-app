import { ActivityIndicator, View, ViewStyle } from "react-native"
import React, { useState } from "react"
import { useStores } from "@/models"
import { Button, Screen, Text } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { router } from "expo-router"
import TextInput from "@/components/TextInput"

const Login = () => {
  const { themed } = useAppTheme()
  const { authStore } = useStores()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onLogin = async () => {
    try {
      setIsSubmitting(true)
      await authStore.login(email, password)
      router.replace("/dashboard")
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSignUpPress = async () => router.replace("/register")

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <Text style={{ textAlign: "center", fontSize: 32, lineHeight: 32 }}>Receipt App</Text>
      <View style={{ margin: 16 }}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={{ marginVertical: 4 }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={{ marginVertical: 4 }}
        />
      </View>
      <Button text="Sign Up" onPress={onSignUpPress} />
      <Button style={{ marginHorizontal: 16, marginTop: 24 }} text="Login" onPress={onLogin} />
      {isSubmitting && <ActivityIndicator />}
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

export default Login
