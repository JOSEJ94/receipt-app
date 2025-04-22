import { View, Text, StyleSheet } from "react-native"
import React, { useEffect } from "react"
import {
  useCameraDevice,
  useCameraPermission,
  Camera as VisionCamera,
} from "react-native-vision-camera"

const Camera = () => {
  const device = useCameraDevice("back")
  const { hasPermission, requestPermission } = useCameraPermission()

  const askForCameraPermission = async () => {
    await requestPermission()
  }

  useEffect(() => {
    if (!hasPermission) {
      askForCameraPermission()
    }
  }, [hasPermission])

  if (!hasPermission)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No access to camera</Text>
      </View>
    )
  if (device == null)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No camera device found</Text>
      </View>
    )
  return <VisionCamera style={StyleSheet.absoluteFill} device={device} isActive={true} />
}

export default Camera
