export type Language = 'python' | 'golang'

export interface ExecuteResult {
  status: 'success' | 'error'
  output?: string
  error?: string
}
