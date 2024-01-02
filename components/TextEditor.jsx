'use client'
import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
const DynamicBundledEditor = dynamic(
  () => import('@components/BundledEditor'),
  {
    ssr: false
  }
)

export default function TextEditor (props) {
  const editorRef = useRef(null)
  const handleSubmit = () => {
    if (editorRef.current) {
      editorRef.current.getContent()
    }
  }
  return (
    <>
      <DynamicBundledEditor
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          menubar: false,
          image_advtab: true,
          automatic_uploads: false,
          selector: 'textarea', // change this value according to your HTML
          images_upload_url: 'postAcceptor.php',
          plugins: [
            'advlist',
            'anchor',
            'autolink',
            'help',
            'image',
            'link',
            'lists',
            'searchreplace',
            'table',
            'wordcount'
          ],
          toolbar:
            'undo redo | accordion accordionremove | blocks | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button
        onClick={handleSubmit}
        className=" bg-fuchsia-300 h-8 px-4 rounded-lg shadow-xl"
      >
        publish
      </button>
    </>
  )
}
