class FileDataBlob{
  constructor(dataUrl, mime = "image/png"){
    return {
            inlineData: {
              data: dataUrl.split(",")[1],
              mimeType: mime,
            },
        }
  }
}