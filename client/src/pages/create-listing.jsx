import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@firebase/storage';
import { useState } from 'react';
import { app } from '../firebase';

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadErr, setImageUploadErr] = useState(false);
  const [uploading, setUploading] = useState(false);

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress ${Math.round(progress)}`);
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            resolve(downloadUrl),
          );
        },
      );
    });
  };

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadErr(false);
      const promises = [];

      for (const file of files) {
        promises.push(storeImage(file));
      }

      Promise.all(promises)
        .then(
          (urls) =>
            setFormData({
              ...formData,
              imageUrls: formData.imageUrls.concat(urls),
            }),
          setImageUploadErr(false),
        )
        // eslint-disable-next-line no-unused-vars
        .catch((error) =>
          setImageUploadErr('Image upload failed (2 mb max per image'),
        )
        .finally(() => setUploading(false));
    } else {
      setImageUploadErr('You can only upload 6 images per listing');
    }
  };

  const handleDeleteImage = (i) =>
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, j) => j !== i),
    });

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            maxLength={62}
            minLength={10}
            required
            className="border p-3 rounded-lg bg-white"
          />
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            required
            className="border p-3 rounded-lg bg-white"
          />
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            required
            className="border p-3 rounded-lg bg-white"
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="sale" id="sale" className="w-5" />
              <label htmlFor="sale">Sell</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" id="rent" className="w-5" />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
              />
              <label htmlFor="parking">Parking spot</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" id="offer" className="w-5" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                max={10}
                min={1}
                required
                className="p-3 border border-gray-300 rounded-lg bg-white"
              />
              <label htmlFor="bedrooms">Beds</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="baths"
                id="baths"
                max={10}
                min={1}
                required
                className="p-3 border border-gray-300 rounded-lg bg-white"
              />
              <label htmlFor="baths">Baths</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="regularPrice"
                id="regularPrice"
                max={10}
                min={1}
                required
                className="p-3 border border-gray-300 rounded-lg bg-white"
              />
              <label
                htmlFor="regularPrice"
                className="flex flex-col items-center"
              >
                <span>Regular price</span>
                <span className="text-xs">($ / Month)</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="discountPrice"
                id="discountPrice"
                max={10}
                min={1}
                required
                className="p-3 border border-gray-300 rounded-lg bg-white"
              />
              <label
                htmlFor="regularPrice"
                className="flex flex-col items-center"
              >
                <span>Discount price</span>
                <span className="text-xs">($ / Month)</span>
              </label>
            </div>
          </div>
        </div>
        {/* Image upload section */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:{' '}
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              name="images"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded w-full"
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              disabled={uploading}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          {imageUploadErr && (
            <p className="text-red-700 text-sm">{imageUploadErr}</p>
          )}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, idx) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="size-20 object-contain rounded-lg"
                />
                <button
                  onClick={() => handleDeleteImage(idx)}
                  type="button"
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 bg-slate-700 text-white">
            create listing
          </button>
        </div>
      </form>
    </main>
  );
}
