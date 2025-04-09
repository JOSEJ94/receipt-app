/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import type { ApiConfig } from "./api.types"
import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
    this.apisauce.axiosInstance.interceptors.request.use(async (request) => {
      const token = await AsyncStorage.getItem("token")
      if (token) {
        request.headers.Authorization = `Bearer ${token}`
      }
      return request
    })
  }

  createAccount = async (username: string, email: string, password: string) => {
    try {
      const response: any = await this.apisauce.post("/register", { username, email, password })
      if (response) {
        this.apisauce.setHeader("Authorization", `Bearer ${response.data.token}`)
        AsyncStorage.setItem("token", response.data.token)
      }
      return response.data
    } catch (error: any) {
      console.error("Error creating account", error)
      throw error
    }
  }

  login = async (email: string, password: string) => {
    try {
      const response: any = await this.apisauce.post("/login", { email, password })
      if (response) {
        this.apisauce.setHeader("Authorization", `Bearer ${response.data.token}`)
        AsyncStorage.setItem("token", response.data.token)
      }
      return response.data.token
    } catch (error: any) {
      console.error("Error logging in", error)
      throw error
    }
  }

  logout = () => {
    this.apisauce.setHeader("Authorization", "")
  }

  getProfile = async () => {
    try {
      const response: any = await this.apisauce.get("/profile")
      return response.data
    } catch (error: any) {
      console.error("Error getting profile", error)
      throw error
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
