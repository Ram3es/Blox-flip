interface ILoginData {
  success: boolean
  data: string
  twoStepVerificationRequired?: boolean
  twoStepVerificationTicket?: string
  user?: IRobloxUser
}

interface IRobloxUser {
  id: number
  name: string
  displayName?: string
}
