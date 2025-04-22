import { FlatList, RefreshControl } from "react-native"
import React, { useEffect, useMemo } from "react"
import { useStores } from "@/models"
import { createStyles } from "./styles"
import InvoiceItem from "./InvoiceItem"

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

  useEffect(() => {
    loadInvoices()
  }, [])

  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadInvoices} />}
      contentContainerStyle={styles.invoicesContainer}
      style={styles.mainContainer}
      data={invoices}
      renderItem={InvoiceItem}
    />
  )
}

export default Dashboard
