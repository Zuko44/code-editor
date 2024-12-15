import { createServer } from 'miragejs'

export function makeServer() {
  createServer({
    routes() {
      this.namespace = '/api'

      this.post('/execute', (schema, request) => {
        const { language, code }: { language: 'golang' | 'python'; code: string } = JSON.parse(
          request.requestBody,
        )

        if (!code.trim()) {
          return { status: 'error', error: 'Code is empty' }
        }

        const outputs: Record<'golang' | 'python', { keyword: string; message: string }> = {
          golang: { keyword: 'fmt.Println', message: 'Hello from Golang!' },
          python: { keyword: 'print', message: 'Hello from Python!' },
        }

        const output = outputs[language]
        if (output && code.includes(output.keyword)) {
          return { status: 'success', output: output.message }
        }

        return { status: 'error', error: 'Syntax Error: Invalid Code' }
      })
    },
  })
}
