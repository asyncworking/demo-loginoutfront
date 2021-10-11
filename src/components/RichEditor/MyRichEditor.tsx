import React from 'react';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import './Editor.scss';

const MyRichEditor = ({ mdBody, setMdBody, placeholder }:any) => {
  const modules = {
    toolbar:
      {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ script: 'sub' }, { script: 'super' }],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ direction: 'rtl' }],
          // ['formula'],
          // ['link', 'image', 'video'],
          ['clean'],
        ],
        handlers: {},
      },
  };

  return (
    <ReactQuill
      placeholder={placeholder}
      value={mdBody.html}
      onChange={(content, delta, source, editor) => {
        setMdBody({
          text: editor.getText(),
          delta: delta.ops,
          html: content,
        });
      }}
      modules={modules}
    />
  );
};

export default MyRichEditor;
