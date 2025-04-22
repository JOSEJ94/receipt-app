import React from "react"
import { Stack } from "expo-router"
import { observer } from "mobx-react-lite"
import { Text } from "@/components"

export const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}

export default observer(Layout)
