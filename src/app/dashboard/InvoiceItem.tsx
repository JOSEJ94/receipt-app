import { View, Text, Image, ListRenderItemInfo, StyleSheet } from "react-native"
import React, { useMemo } from "react"
import { InvoiceType } from "@/models/InvoiceModel"

const InvoiceItem = (info: ListRenderItemInfo<InvoiceType>) => {
  const styles = useMemo(() => createStyles(), [])
  const formattedDate = new Date(info.item.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: info.item.currencyCode,
  }).format(info.item.total!)
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: info.item.vendorLogo }}
        resizeMode="contain"
        style={styles.vendorImage}
      />
      <View style={styles.informationContainer}>
        <Text>{formattedDate}</Text>
        <Text>{info.item.vendorCategory}</Text>
      </View>
      <Text style={styles.price}>{formattedTotal}</Text>
    </View>
  )
}

export default InvoiceItem

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "lightgray",
      alignItems: "center",
    },
    informationContainer: { flex: 1, marginLeft: 12 },
    vendorImage: { width: 75, height: 75 },
    price: { marginHorizontal: 12 },
  })
