import { Textarea } from '@mantine/core';

interface QuestionRichTextEditorProps {
  onSetValue: (value: { content: string, contentHTML: string }) => void;
}
const QuestionRichTextEditor = ({ onSetValue }: QuestionRichTextEditorProps) => {
  // const content = '';
  // const editor = useEditor({
  //   extensions: [
  //     StarterKit,
  //     Underline,
  //     Link,
  //     Superscript,
  //     SubScript,
  //     Highlight,
  //     TextAlign.configure({ types: ['heading', 'paragraph'] }),
  //   ],
  //   content,
  // });


  const setValue = (value: string) => {
    const data = { content: value, contentHTML: value }
    onSetValue(data);
  }

  return (
    <>
      <Textarea autosize
        minRows={2} onChange={(e) => setValue(e.target.value)}></Textarea>
      {/* <RichTextEditor editor={editor}>
    //   <RichTextEditor.Toolbar sticky stickyOffset={60}>
    //     <RichTextEditor.ControlsGroup>
    //       <RichTextEditor.Bold />
    //       <RichTextEditor.Italic />
    //       <RichTextEditor.Underline />
    //       <RichTextEditor.Strikethrough />
    //       <RichTextEditor.ClearFormatting />
    //       <RichTextEditor.Highlight />
    //     </RichTextEditor.ControlsGroup>

    //     <RichTextEditor.ControlsGroup>
    //       <RichTextEditor.H1 />
    //       <RichTextEditor.H2 />
    //       <RichTextEditor.H3 />
    //       <RichTextEditor.H4 />
    //     </RichTextEditor.ControlsGroup>

    //     <RichTextEditor.ControlsGroup>
    //       <RichTextEditor.BulletList />
    //       <RichTextEditor.OrderedList />
    //       <RichTextEditor.Subscript />
    //       <RichTextEditor.Superscript />
    //     </RichTextEditor.ControlsGroup>

    //     <RichTextEditor.ControlsGroup>
    //       <RichTextEditor.AlignLeft />
    //       <RichTextEditor.AlignCenter />
    //       <RichTextEditor.AlignJustify />
    //       <RichTextEditor.AlignRight />
    //     </RichTextEditor.ControlsGroup>
    //   </RichTextEditor.Toolbar>

    //   <RichTextEditor.Content />
    </RichTextEditor> */}
    </>
  );
}

export default QuestionRichTextEditor;