import React from "react"
import { Redirect, Stack } from "expo-router"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"
import { Text } from "@/components"

export default observer(function Layout() {
  return <Stack screenOptions={{ title: "Dashboard", headerRight: () => <Text>Logout</Text> }} />
})
