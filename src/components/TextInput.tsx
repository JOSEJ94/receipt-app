import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  Pressable,
  LayoutChangeEvent,
} from "react-native"
import React, { useMemo, useRef, useState } from "react"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { useAppTheme } from "@/utils/useAppTheme"
import { Theme } from "@/theme"

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    inputContainer: {
      backgroundColor: theme.colors.backgroundInput,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 4,
    },
  })

interface TextInputProps
  extends Omit<RNTextInputProps, "placeholder" | "placeholderTextColor" | "style"> {
  label: string
  inputStyle?: StyleProp<TextStyle>
  labelStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
}

const TextInput = ({ value, label, labelStyle, style, inputStyle, ...rest }: TextInputProps) => {
  const { theme } = useAppTheme()
  const [maxHeight, setMaxHeight] = useState(0)
  const [labelMaxHeight, setLabelMaxHeight] = useState(0)
  const styles = useMemo(() => createStyles(theme), [theme])
  const inputRef = useRef<RNTextInput>(null)
  const progress = useSharedValue(0)
  const animatedLabelStyle = useAnimatedStyle(() => {
    const scaleFactor = 0.8
    const halfMaxHeight = maxHeight / 2
    const halfLabelMaxHeight = labelMaxHeight * scaleFactor
    const translateY = interpolate(progress.value, [0, 1], [halfMaxHeight - halfLabelMaxHeight, 0])
    const scale = interpolate(progress.value, [0, 1], [1, scaleFactor])
    const translateX = interpolate(progress.value, [0, 1], [0, -45])
    return {
      transform: [{ translateY }, { scale }, { translateX }],
    }
  })

  const focus = () => inputRef.current?.focus()

  const calculateMaxHeight = (e: LayoutChangeEvent) => setMaxHeight(e.nativeEvent.layout.height)

  const calculateLabelMaxHeight = (e: LayoutChangeEvent) =>
    setLabelMaxHeight(e.nativeEvent.layout.height)

  const animateToTop = () => (progress.value = withSpring(1, { duration: 200 }))

  const animateToBottom = () => !value && (progress.value = withSpring(0, { duration: 200 }))

  return (
    <Pressable onLayout={calculateMaxHeight} onPress={focus} style={[styles.inputContainer, style]}>
      <Animated.Text onLayout={calculateLabelMaxHeight} style={[animatedLabelStyle, labelStyle]}>
        {label}
      </Animated.Text>
      <RNTextInput
        {...rest}
        value={value}
        ref={inputRef}
        onFocus={animateToTop}
        onBlur={animateToBottom}
        style={[inputStyle]}
      />
    </Pressable>
  )
}

export default TextInput
