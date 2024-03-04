interface Post {
  id: string;
  markDownContent: string;
  images: string[] | null;
  tags: string[];
  user: User;
  notes: number;
  likedByUser: boolean;
  likes: Like[];
  createdAt: string;
  originalPost?: Post;
  reblog: boolean;
}

interface Notes {
    comments: IComment[],
    likes: Like[],
    reblogs: Post[]
    total: number
}

interface Note {
  createdAt: Date;
  id: string;
  user: User;
  type: NoteType;
}

enum NoteType {
  LIKE,
  COMMENT,
  REBLOG,
}

interface Like extends Note {}

interface IComment extends Note {
  content: string;
}

interface PostPayload
  extends Record<string, string, File[], null, FormDataEntryValue> {
  markDownContent: string;
  imageFiles: File[];
  tags: null;
}

interface User {
  id: string;
  name: string;
  email: string;
  blogTitle: string;
  avatar: string;
}

interface UserHook {
  doLogin: (fd: FormData) => Promise<void>;
  error: string | null;
}

interface ErrorActionPayload {
  message: string;
  thrownAt: string;
}
