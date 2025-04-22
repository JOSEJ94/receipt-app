import { View, Text, Pressable } from "react-native"
import React from "react"

const AddInvoiceButton = () => {
  return (
    <Pressable
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
