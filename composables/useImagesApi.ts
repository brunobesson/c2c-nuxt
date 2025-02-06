export const useImagesApi = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.imagesApiBase;

  return {
    upload: async (
      file: File,
      onUploadProgress: (ev: ProgressEvent) => void,
      onSuccess: () => void,
      onFailure: () => void,
    ) => {
      new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open('post', `${baseUrl}/upload`, true);
        xhr.upload.onprogress = onUploadProgress;
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            const status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              resolve(xhr.responseText);
            } else {
              reject();
            }
          }
        };
        xhr.send(formData);
      }).then(onSuccess, onFailure);
    },
  };
};
