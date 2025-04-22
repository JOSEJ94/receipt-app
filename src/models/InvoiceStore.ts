import { api } from "@/services/api"
import { types, flow } from "mobx-state-tree"
import { Invoice } from "./InvoiceModel"

const InvoiceStore = types
  .model("InvoiceStore", {
    invoices: types.array(Invoice),
    isLoading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    createInvoice: flow(function* (invoiceBase64: string) {
      try {
        const response = yield api.uploadInvoice(invoiceBase64)
        console.log("response", response)
        // const user = yield api.getProfile()
        // console.log("user", user)
        // self.user = user
        // self.isAuthenticated = Boolean(response && user)
      } catch (error) {
        console.error("Failed to create account", error)
      }
    }),
    getInvoices: flow(function* () {
      self.isLoading = true
      try {
        const response = yield api.getInvoices()
        if (response) {
          self.invoices = response
        }
      } catch (error) {
        console.error("Failed to get invoices", error)
      } finally {
        self.isLoading = false
      }
    }),
  }))

export default InvoiceStore
