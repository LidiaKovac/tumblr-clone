interface Post {
    id:              string;
    markDownContent: string;
    images:          string[] | null;
    tags:            null;
    user:            User;
}

interface User {
    id:        string;
    name:      string;
    email:     string;
    blogTitle: string;
    avatar:    string;
}
