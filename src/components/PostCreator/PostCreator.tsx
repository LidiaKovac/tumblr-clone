import { FC, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addError } from "../../redux/slices/globalErrorsSlice";
import { fetchPosts } from "../../redux/slices/postSlices";
import "./PostCreator.scss";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { uploadFile, uploadPost } from "../../api";
import { setIsOpen } from "../../redux/slices/postCreatorSlice";
interface PostCreatorProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
export const PostCreator: FC<PostCreatorProps> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.me);
  const isOpen = useAppSelector((state) => state.postCreator.isOpen);
  const [postContent, setPostContent] = useState<string>("");

  const editor: BlockNoteEditor = useBlockNote({
    uploadFile: uploadFile,
    onEditorContentChange: async (editor) => {
      const markdownFromBlocks = await editor.blocksToMarkdownLossy(
        editor.topLevelBlocks
      );
      setPostContent(markdownFromBlocks);
    },
  });
  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (postContent.length <= 0) {
      dispatch(
        addError({
          message: "Your post cannot be empty!",
          thrownAt: new Date().toString(),
        })
      );
      return;
    }
    await uploadPost(ev.target as HTMLFormElement, postContent);
    await dispatch(fetchPosts());
    dispatch(setIsOpen(false));
    (ev.target as HTMLFormElement).reset()
  };

  return (
    <>
      {isOpen && (
        <div className="post-creator">
          <div className="post-creator__backdrop"></div>
          <div className="post-creator__wrap">
            <div className="post-creator__user">
              <img src={user?.avatar} alt={user?.name} />
              {user?.name}
            </div>
            <form onSubmit={handleSubmit}>
              <BlockNoteView editor={editor} />

              <div className="post-creator__footer">
                <input
                  placeholder="Add Tags, separated by comma"
                  type="text"
                  name="tags"
                />
                <div className="post-creator__actions">
                  <button
                    onClick={() => dispatch(setIsOpen(false))}
                    type="button"
                  >
                    Close
                  </button>
                  <button>Publish</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
