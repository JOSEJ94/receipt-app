import { Instance, SnapshotOut, types } from "mobx-state-tree"
import AuthStore from "./AuthStore"
import InvoiceStore from "./InvoiceStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authStore: types.optional(AuthStore, { isAuthenticated: false, user: null }),
  invoiceStore: types.optional(InvoiceStore, { invoices: [], isLoading: false }),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
