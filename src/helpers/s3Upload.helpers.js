import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY
})

const myBucket = new AWS.S3({
  params: { Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET },
  region: process.env.NEXT_PUBLIC_AWS_REGION,
})

export const uploadFile = (file, setProgress) => {

  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
    Key: file.name
  };

  myBucket.putObject(params)
    .on('httpUploadProgress', (evt) => {
      setProgress(Math.round((evt.loaded / evt.total) * 100))
    })
    .send((err) => {
      if (err) {
        console.log(err);
        setProgress(100);
      }
    })
}
