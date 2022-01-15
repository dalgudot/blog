import type { NextPage } from 'next';
import TextEditor from '../../components/text-editor/text-editor';

const Admin: NextPage = () => {
  return (
    <>
      <TextEditor />
    </>
  );
};

export default Admin;

// https://medium.com/swlh/how-to-build-a-text-editor-like-notion-c510aedfdfcc#:~:text=From%20a%20technical,or%20textarea%20element.

// From a technical perspective, a block is a so-called contenteditable element. Nearly every HTML element can be turned into an editable one. You just have to add the contenteditable="true" attribute to it.
// This indicates if the element should be editable by the user. If so, users can edit their content directly in the HTML document as if it would be an input or textarea element.
