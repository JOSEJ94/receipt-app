import { ActivityIndicator, View } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Text } from "@/components"
import TextInput from "@/components/TextInput"
import { useStores } from "@/models"

const Register = () => {
  const { authStore } = useStores()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onCreateAccount = async () => {
    setIsSubmitting(true)
    try {
      await authStore.createAccount(username, email, password)
    } catch (error) {
      alert("Error creating account")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView>
      <Text style={{ paddingHorizontal: 16 }}>
        Please complete this information to get your account
      </Text>
      <View style={{ padding: 16 }}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={{ marginVertical: 4 }}
        />
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
      {isSubmitting && <ActivityIndicator size="large" />}
      <Button
        disabled={isSubmitting}
        style={{ marginHorizontal: 16, marginTop: 24 }}
        text="Create account"
        onPress={onCreateAccount}
      />
    </SafeAreaView>
  )
}

export default Register
