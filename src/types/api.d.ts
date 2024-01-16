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

interface IRobloxSecurityData {
  IsAnyBuildersClubMember: boolean
  IsPremium: boolean
  RobuxBalance: number
  ThumbnailUrl: string
  UserID: number
  UserName: string
}

interface ILoginDataRequest {
  email: string
  password: string
}

interface IRegisterDataRequest extends ILoginDataRequest {
  confirm_password: string
}
