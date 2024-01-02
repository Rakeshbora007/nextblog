import { Editor } from '@tinymce/tinymce-react'
import 'tinymce/skins/ui/oxide/skin.min.css'

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce'
// DOM model
import 'tinymce/models/dom/model'
// Theme
import 'tinymce/themes/silver'
// Toolbar icons
import 'tinymce/icons/default'

// eslint-disable-next-line import/no-webpack-loader-syntax
import contentCss from '!!raw-loader!tinymce/skins/content/default/content.min.css'
// eslint-disable-next-line import/no-webpack-loader-syntax
import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css'
// Editor styles

if (typeof window !== 'undefined') {
  require('tinymce/plugins/advlist')
  require('tinymce/plugins/anchor')
  require('tinymce/plugins/autolink')
  require('tinymce/plugins/autoresize')
  require('tinymce/plugins/autosave')
  require('tinymce/plugins/charmap')
  require('tinymce/plugins/code')
  require('tinymce/plugins/codesample')
  require('tinymce/plugins/directionality')
  require('tinymce/plugins/emoticons')
  require('tinymce/plugins/fullscreen')
  require('tinymce/plugins/help')
  require('tinymce/plugins/image')
  require('tinymce/plugins/importcss')
  require('tinymce/plugins/insertdatetime')
  require('tinymce/plugins/link')
  require('tinymce/plugins/lists')
  require('tinymce/plugins/media')
  require('tinymce/plugins/nonbreaking')
  require('tinymce/plugins/pagebreak')
  require('tinymce/plugins/preview')
  require('tinymce/plugins/quickbars')
  require('tinymce/plugins/save')
  require('tinymce/plugins/searchreplace')
  require('tinymce/plugins/table')
  require('tinymce/plugins/template')
  require('tinymce/plugins/visualblocks')
  require('tinymce/plugins/visualchars')
  require('tinymce/plugins/wordcount')
  require('tinymce/plugins/emoticons/js/emojis')
}

export default function BundledEditor (props) {
  const { init, ...rest } = props

  return (
    <Editor
      init={{
        ...init,
        skin: false,
        content_css: false,
        content_style: [
          contentCss,
          contentUiCss,
          init.content_style || ''
        ].join('\n')
      }}
      {...rest}
    />
  )
}
