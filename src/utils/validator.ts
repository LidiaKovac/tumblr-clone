export class Validator {
  static validatePost(body: FormData) {
    console.log(body.entries())
    const markDownContent = body.get("markDownContent") as string
    const imageFiles = body.get("imageFiles") as File[] | null
    console.log(markDownContent) 
    console.log(imageFiles);
    if (markDownContent.length === 0 && imageFiles) {
      console.log("Image only post");
      return true;
    }
    if (!imageFiles && markDownContent.length > 0) {
      console.log("Text only post");
      return true;
    }
    if (markDownContent.length > 0 && imageFiles) {
      console.log("Text + Images post");
      return true;
    }
    if (markDownContent.length === 0 && !imageFiles) {
      return false;
    }
  }
}
