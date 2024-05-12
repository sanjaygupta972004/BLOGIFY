import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { app } from "../firebase"


export const upLoadImageFile = async (imageFile, setProgress, setError, setImageUrl) => {
  try {
    if (!imageFile) {
      setError('Please select an image file');
      return;
    }

    const fileName = imageFile.name + new Date().getTime();
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress && setProgress(progress.toFixed(2));
    });
    await uploadTask;
    try {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      setImageUrl && setImageUrl(url);
    }catch(error){
      setError && setError("An error occurred during downloading image url ")
    }
  } catch (error) {
    setError && setError(`An error occurred: ${error.message}`);
  }
};
