import { api } from "@/services/api"
import { types, flow } from "mobx-state-tree"

const AuthStore = types
  .model("AuthStore", {
    isAuthenticated: types.boolean,
    user: types.maybe(types.frozen()),
  })
  .actions((self) => ({
    createAccount: flow(function* (username: string, email: string, password: string) {
      try {
        const response = yield api.createAccount(username, email, password)
        console.log("response", response)
        const user = yield api.getProfile()
        console.log("user", user)
        self.user = user
        self.isAuthenticated = Boolean(response && user)
      } catch (error) {
        console.error("Failed to create account", error)
      }
    }),
    login: flow(function* (email: string, password: string) {
      try {
        const response = yield api.login(email, password)
        console.log("response", response)
        const user = yield api.getProfile()
        console.log("user", user)
        self.user = user
        self.isAuthenticated = Boolean(response && user)
      } catch (error) {
        console.error("Failed to login", error)
      }
    }),
    logout() {
      api.logout()
      self.user = null
      self.isAuthenticated = false
    },
  }))

export default AuthStore
