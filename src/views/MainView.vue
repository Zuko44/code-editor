<script setup lang="ts">
import { ref } from 'vue'
import AceEditor from '@/components/AceEditor.vue'
import type { Language, ExecuteResult } from '@/types/index'

const language = ref<Language>('python')
const code = ref<string>('')
const output = ref<string>('')

const runCode = async (): Promise<void> => {
  if (!code.value.trim()) {
    output.value = 'Error: Code is empty.'
    return
  }

  try {
    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: language.value, code: code.value }),
    })

    const result: ExecuteResult = await response.json()
    output.value = result.status === 'success' ? result.output : `Error: ${result.error}`
  } catch (err) {
    output.value = 'Error: Failed to execute code.'
  }
}
</script>

<template>
  <div>
    <main>
      <div class="task-description">
        <h2>Task Description</h2>
        <p>
          Write a program in the selected language that outputs "Hello, World!". You can use the
          "Run" button to test your solution.
        </p>
      </div>
      <div class="toolbar">
        <label for="language">Language:</label>
        <select id="language" v-model="language">
          <option value="golang">Go</option>
          <option value="python">Python</option>
        </select>
        <button :disabled="!code.trim()" @click="runCode">Run</button>
      </div>

      <AceEditor v-model="code" :language="language" />

      <div class="output">
        <h2>Output:</h2>
        <pre>{{ output || 'Enter code and press Run' }}</pre>
      </div>
    </main>
  </div>
</template>

<style scoped>
.task-description {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.task-description h2 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.task-description p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  height: 100px;
}

.output {
  margin-top: 20px;
  padding: 10px;
  background: #282c34;
  color: #ffffff;
  border-radius: 5px;
  white-space: pre-wrap;
}
</style>
