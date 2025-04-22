import React from "react"
import { Redirect, Stack } from "expo-router"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"
import { Text } from "@/components"

export const Layout = () => {
  const {
    authStore: { logout, isAuthenticated },
  } = useStores()

  if (!isAuthenticated) {
    return <Redirect href="/log-in" />
  }
  return (
    <Stack
      screenOptions={{
        title: "Dashboard",
        headerRight: () => <Text onPress={logout}>Logout</Text>,
      }}
    />
  )
}

export default observer(Layout)
