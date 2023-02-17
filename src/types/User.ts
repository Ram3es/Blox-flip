export interface IUser {
  name: string
  avatar: string
  level: number
  progress: {
    current: number
    required: number
  }
}
