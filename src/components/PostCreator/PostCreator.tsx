import { FormEvent, useState } from "react";
import httpClient from "../../api/axiosConfig";
import { useAppDispatch } from "../../redux/store";
import { addError } from "../../redux/slices/globalErrorsSlice";
import { fetchPosts } from "../../redux/slices/postSlices";
import "./PostCreator.scss"
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { uploadFile } from "../../api";

export const PostCreator = () => {
  const [postContent, setPostContent] = useState<string>("");
  const dispatch = useAppDispatch();
  const editor: BlockNoteEditor = useBlockNote({
    uploadFile: uploadFile,
    onEditorContentChange: async(editor) => {
      console.log(editor)
      const markdownFromBlocks = await editor.blocksToMarkdownLossy(editor.topLevelBlocks);
      setPostContent(markdownFromBlocks)
    }

  });
  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (postContent.length <= 0) {
      dispatch(
        addError({
          message: "Validation failed",
          thrownAt: new Date().toString(),
        })
      );
      return;
    }
    const fd = new FormData(ev.target as HTMLFormElement)
    fd.append("markDownContent", postContent)
    await httpClient.post("/post", fd);
    await dispatch(fetchPosts());
  };
  

  return (
    <div className="post-creator__wrap">
      <form onSubmit={handleSubmit}>
        <BlockNoteView editor={editor}
        />
      {/* <MDXEditor
      contentEditableClassName="post-creator__inner"
      suppressHtmlProcessing={true}
        markdown={postContent}
        onChange={setPostContent}
        plugins={[
          headingsPlugin(),
          quotePlugin(),
          listsPlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
          
                <UndoRedo/>
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <CodeToggle />
                <CreateLink />
                <InsertCodeBlock />
                <InsertImage />
                <InsertTable />
                <ListsToggle />
              </>
            ),
          }),
          imagePlugin({
            imageUploadHandler: (image: File) => {
              const fd = new FormData();
              fd.append("image", image);
              return httpClient
                .post("/post/upload", fd)
                .then((res) => res.data.url);
            },
          }),
        ]}
      /> */}
      
      <input type="text" name="tags" />
      <button>Submit</button>
    </form> 
    </div>
  );
};
