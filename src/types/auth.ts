export interface LoginCredentials {
  username: string
  password: string
  expiresInMins?: number
}

export interface AuthResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  accessToken: string
  refreshToken: string
}