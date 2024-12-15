export type Language = 'python' | 'javascript'

export interface ExecuteResult {
  status: 'success' | 'error'
  output?: string
  error?: string
}
