import { View, Text, Pressable } from "react-native"
import React from "react"
import { useRouter } from "expo-router"

const AddInvoiceButton = () => {
  const router = useRouter()

  const handlePress = () => {
    router.push("/camera")
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "lightblue",
        padding: 10,
        borderRadius: 50,
      }}
    >
      <Text>+</Text>
    </Pressable>
  )
}

export default AddInvoiceButton
