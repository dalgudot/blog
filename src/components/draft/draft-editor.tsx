import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useEffect, useRef, useState } from 'react';

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editor = useRef<any>(null);
  const focusEditor = () => {
    editor.current?.focus();
  };

  useEffect(() => {
    focusEditor();
  }, []);

  return (
    <p
      style={{ border: '1px solid black', minHeight: '6em', cursor: 'text' }}
      onClick={focusEditor}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        placeholder='Write something!'
      />
    </p>
  );
};

export default DraftEditor;
