import { AxiosError } from "axios"

export default class AppError extends AxiosError {
  public readonly message: string
  public readonly httpCode: string
  public readonly path: string
  constructor(error: AppError) {
    super(error.path)
    this.message = error.message
    this.path = error.path
    this.httpCode = error.httpCode
  }
}
