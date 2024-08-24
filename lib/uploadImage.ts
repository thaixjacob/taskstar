import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    "6687f370002faa6c5a41",
    ID.unique(),
    file
  );

  return fileUploaded;
};

export default uploadImage;
