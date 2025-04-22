import { types } from "mobx-state-tree"

export const Invoice = types.model({
  id: types.identifier,
  // status: nvoiceStatus @default(IN_QUEUE)
  userId: types.string,
  // user: User @relation(fields: [userId], references: [id])
  veryfiId: types.number,
  fileName: types.string,
  imageThumbnail: types.string,
  image: types.string,
  vendor: types.maybeNull(types.string),
  currencyCode: types.maybe(types.string),
  currency: types.maybe(types.string),
  invoiceNumber: types.maybe(types.string),
  date: types.string,
  createdAt: types.string,
  tax: types.maybe(types.number),
  subtotal: types.maybe(types.number),
  total: types.maybe(types.number),
  vendorName: types.maybe(types.string),
  vendorCategory: types.maybe(types.string),
  vendorLogo: types.maybe(types.string),
  vendorType: types.maybe(types.string),
})

export type InvoiceType = typeof Invoice.Type
