import React, { useContext, useEffect, useRef } from 'react'
import { ReceivedResponse } from '../App'
import { basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { keymap, EditorView } from '@codemirror/view'
import { json } from '@codemirror/lang-json'
import { indentWithTab } from "@codemirror/commands"
import './ResponseBody.css'

function ResponseBody() {
  const receivedResponse = useContext(ReceivedResponse)
  const editor = useRef()

  function EmptyResView() {
    useEffect(() => {
      const responseView = new EditorView({
        state: EditorState.create({
          doc: '{\n\t\n}',
          extensions: [
            basicSetup,
            keymap.of([indentWithTab]),
            json(),
            EditorState.tabSize.of(2),
            EditorView.editable.of(false)
          ]
        }),
        parent: editor.current
      })

      return () => {
        responseView.destroy()
      }
    }, [])

    return <div ref={editor}></div>
  }

  function ResView() {
    useEffect(() => {
      const responseView = new EditorView({
        state: EditorState.create({
          doc: JSON.stringify(receivedResponse.response.data, null, 2),
          extensions: [
            basicSetup,
            keymap.of([indentWithTab]),
            json(),
            EditorState.tabSize.of(2),
            EditorView.editable.of(false)
          ]
        }),
        parent: editor.current
      })

      return () => {
        responseView.destroy()
      }
    }, [])

    return <div ref={editor}></div>
  }

  function EditorResView() {
    /* console.log(receivedResponse.response.data) */
    return receivedResponse.response.data === undefined ? <EmptyResView /> : <ResView />
  }

  return (
    <div className='p-3'>
      <div id='data-json-res-body' data-json-res-body className=''>
        <EditorResView />
      </div>
    </div>

  )
}

export default ResponseBody