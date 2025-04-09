import React from "react"
import { Redirect, Stack } from "expo-router"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"

export default observer(function Layout() {
  const {
    authStore: { isAuthenticated },
  } = useStores()

  if (isAuthenticated) {
    return <Redirect href="/" />
  }

  return <Stack screenOptions={{ headerShown: false }} />
})
