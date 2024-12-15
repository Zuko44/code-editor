<template>
  <div>
    <div ref="editor" class="editor-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-golang'
import 'ace-builds/src-noconflict/theme-monokai'

interface Props {
  modelValue: string
  language: 'python' | 'golang'
}

type Emit = (event: 'update:modelValue', value: string) => void

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const editor = ref<HTMLDivElement | null>(null)
let aceEditor: Ace.Editor | null = null

onMounted(() => {
  ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict/')
  aceEditor = ace.edit(editor.value, {
    mode: `ace/mode/${props.language}`,
    theme: 'ace/theme/monokai',
    value: props.modelValue,
  })

  aceEditor.session.on('change', () => {
    emit('update:modelValue', aceEditor!.getValue())
  })
})

onBeforeUnmount(() => {
  if (aceEditor) aceEditor.destroy()
})

watch(
  () => props.language,
  (newLanguage) => {
    aceEditor.session.setMode(`ace/mode/${newLanguage}`)
  },
)
</script>

<style>
.editor-container {
  height: 300px;
  border: 1px solid #ddd;
  font-size: 14px;
}
</style>
