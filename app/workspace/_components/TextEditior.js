import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

function TextEditior() {
    const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
        attributes:{
            class:'focus:outline-none h-screen p-5'
        }
        
    }


  })
  return (
    <div>
        <div>
        <EditorContent editor={editor} />
        </div>
    </div>
  )
}

export default TextEditior
