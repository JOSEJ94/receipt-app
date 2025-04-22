import { FlatList, ListRenderItemInfo, RefreshControl, View } from "react-native"
import React, { useEffect, useMemo } from "react"
import { useStores } from "@/models"
import { createStyles } from "./styles"
import InvoiceItem from "./InvoiceItem"
import AddInvoiceButton from "./AddInvoiceButton"
import { InvoiceType } from "@/models/InvoiceModel"

const Dashboard = () => {
  const styles = useMemo(() => createStyles(), [])
  const { invoiceStore } = useStores()
  const { invoices, isLoading } = invoiceStore

  const loadInvoices = async () => {
    try {
      await invoiceStore.getInvoices()
    } catch (error) {
      console.error("Error fetching invoices:", error)
    }
  }

  const renderItem = (info: ListRenderItemInfo<InvoiceType>) => <InvoiceItem item={info.item} />

  useEffect(() => {
    loadInvoices()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadInvoices} />}
        contentContainerStyle={styles.invoicesContainer}
        style={styles.mainContainer}
        data={invoices}
        renderItem={renderItem}
      />
      <AddInvoiceButton />
    </View>
  )
}

export default Dashboard
