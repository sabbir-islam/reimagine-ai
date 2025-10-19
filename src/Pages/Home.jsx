import React, { useEffect, useState } from "react";
import { SiCodemagic } from "react-icons/si";

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(null);
  const [select, setSelected] = useState(null);
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("templates.json");
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handelSelect = (templateId) => {
    setSelected(templateId);
  };

  return (
    <div className="md:w-[70%] w-[90%] mx-auto">
      <div className="flex justify-center mt-7">
        <h1 className="text-3xl font-bold text-gray-800">
          Create your AI Image
        </h1>
      </div>

      <div className="md:w-[60%] mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 ">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upload your image
          </h2>

          {/* Upload Area */}
          {!previewUrl ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors duration-200">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <svg
                  className="w-12 h-12 text-gray-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-blue-600 font-medium mb-1">
                  Click to upload
                </span>
                <span className="text-gray-500 text-sm">
                  PNG, JPG, GIF up to 10MB
                </span>
              </label>
            </div>
          ) : (
            // Preview Area
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 truncate">
                  {selectedImage?.name}
                </p>
                <button
                  onClick={handleRemoveImage}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* select template  */}
      <div className="md:w-[60%] mx-auto mt-8">
        <h1 className="text-lg font-semibold mb-8">Select a design</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {templates.map((temp) => (
            <div
              key={temp.id}
              onClick={() => handelSelect(temp.id)}
              className={`w-full max-w-[200px] pb-2 rounded-2xl bg-[#27374D] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl mb-8 ${
                select === temp.id
                  ? "border-2 border-[#F38181] scale-105"
                  : "border-2 border-white border-transparent"
              }`}
            >
              <img
                className="rounded-t-2xl w-full h-[300px] object-cover"
                src={temp.image}
                alt={temp.name}
              />
              <h1 className="text-white text-center p-2">{temp.name}</h1>
            </div>
          ))}
        </div>
      </div>
      {/* handel button  */}
      <div className="flex justify-center mt-4 mb-20">
        <button className="flex justify-center items-center gap-2 px-8 text-base hover:text-white font-medium py-4 rounded-2xl cursor-pointer border-2 border-[#393E46] hover:bg-[#393E46] transition-colors duration-200">
          Generate <SiCodemagic />
        </button>
      </div>
    </div>
  );
};

export default Home;
