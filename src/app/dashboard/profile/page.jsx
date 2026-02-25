// "use client";

// import { useSession } from "next-auth/react";
// import { useState } from "react";
// import Image from "next/image";

// export default function ProfilePage() {
//   const { data: session, status } = useSession();

//   const [isEditingName, setIsEditingName] = useState(false);
//   const [isEditingPassword, setIsEditingPassword] = useState(false);
//   const [newName, setNewName] = useState("");

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   if (status === "loading") {
//     return (
//       <div className="p-6 mt-20">
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   if (!session) return null;

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setSelectedImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   // const handleSaveImage = async () => {
//   //   if (!selectedImage) return;

//   //   // Later you will connect this with your API
//   //   console.log("Uploading image:", selectedImage);

//   //   alert("Image selected successfully (connect API to save)");
//   // };

//   const handleSaveImage = async () => {
//     if (!selectedImage) return;

//     const formData = new FormData();
//     formData.append("file", selectedImage);

//     try {
//       const res = await fetch("/api/upload-profile", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       console.log("Image URL:", data.url);

//       alert("Profile image uploaded successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("Upload failed");
//     }
//   };

//   return (
//     <div className="p-6 mt-20">
//       <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>

//           {/* Profile Image */}
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Image
//                 src={preview || session.user.image || "/default-avatar.png"}
//                 alt="Profile"
//                 width={55}
//                 height={55}
//                 className="rounded-full border-2 border-green-500 object-cover"
//               />

//               <label className="absolute -bottom-1 -right-1 bg-green-600 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-green-700">
//                 Edit
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Save image button appears only when new image selected */}
//           {selectedImage && (
//             <button
//               onClick={handleSaveImage}
//               className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//             >
//               Save Profile Picture
//             </button>
//           )}

//           {/* Name */}
//           <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
//             <div>
//               <p className="text-sm text-gray-500">Name</p>
//               <p className="text-lg font-semibold text-gray-800">
//                 {session.user.name}
//               </p>
//             </div>

//             <button
//               onClick={() => {
//                 setIsEditingName(!isEditingName);
//                 setNewName(session.user.name || "");
//               }}
//               className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
//             >
//               Edit
//             </button>
//           </div>

//           {isEditingName && (
//             <div className="border rounded-lg p-4 space-y-3">
//               <input
//                 type="text"
//                 value={newName}
//                 onChange={(e) => setNewName(e.target.value)}
//                 className="w-full border px-3 py-2 rounded-lg"
//               />
//               <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
//                 Save Name
//               </button>
//             </div>
//           )}

//           {/* Email */}
//           <div className="bg-gray-50 rounded-lg p-4">
//             <p className="text-sm text-gray-500">Email</p>
//             <p className="text-lg font-semibold text-gray-800">
//               {session.user.email}
//             </p>
//           </div>

//           {/* Role */}
//           <div className="bg-gray-50 rounded-lg p-4">
//             <p className="text-sm text-gray-500">Role</p>
//             <p className="text-lg font-semibold text-gray-800">
//               {session.user.role}
//             </p>
//           </div>

//           {/* Password */}
//           <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
//             <div>
//               <p className="text-sm text-gray-500">Password</p>
//               <p>Change your password</p>
//             </div>

//             <button
//               onClick={() => setIsEditingPassword(!isEditingPassword)}
//               className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg"
//             >
//               Change
//             </button>
//           </div>

//           {isEditingPassword && (
//             <div className="border rounded-lg p-4 space-y-3">
//               <input
//                 type="password"
//                 placeholder="Current password"
//                 className="w-full border px-3 py-2 rounded-lg"
//               />
//               <input
//                 type="password"
//                 placeholder="New password"
//                 className="w-full border px-3 py-2 rounded-lg"
//               />
//               <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
//                 Update Password
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//--------------------------------------------------//
"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  // --- Editing states ---
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newName, setNewName] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // --- Profile image states ---
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  if (status === "loading") {
    return (
      <div className="p-6 mt-20">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!session) return null;

  // --- Image handlers ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSaveImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      // Upload to Cloudinary
      const uploadRes = await fetch("/api/upload-profile", {
        method: "POST",
        body: formData,
      });
      const data = await uploadRes.json();
      if (!data.url) return alert("Cloudinary upload failed");

      // Save image URL to MongoDB
      const updateRes = await fetch("/api/update-user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: data.url }),
      });
      const updateData = await updateRes.json();
      if (updateData.error) return alert(updateData.error);

      // Update session locally
      session.user.image = data.url;
      setPreview(null);
      setSelectedImage(null);

      alert("Profile image updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  // --- Name handlers ---
  const handleSaveName = async () => {
    if (!newName) return alert("Name cannot be empty");

    try {
      const res = await fetch("/api/update-user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      if (data.error) return alert(data.error);

      // Update session locally
      session.user.name = newName;
      setIsEditingName(false);

      alert("Name updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating name");
    }
  };

  // --- Password handler ---
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) return alert("Fill both fields");

    try {
      const res = await fetch("/api/update-user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (data.error) return alert(data.error);

      setIsEditingPassword(false);
      setCurrentPassword("");
      setNewPassword("");

      alert("Password updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating password");
    }
  };

  return (
    <div className="p-6 mt-20">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>

          {/* Profile Image */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src={preview || session.user.image || "/default-avatar.png"}
                alt="Profile"
                width={55}
                height={55}
                className="rounded-full border-2 border-green-500 object-cover"
              />

              <label className="absolute -bottom-1 -right-1 bg-green-600 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-green-700">
                Edit
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Save image button */}
          {selectedImage && (
            <button
              onClick={handleSaveImage}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Profile Picture
            </button>
          )}

          {/* Name */}
          <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-semibold text-gray-800">
                {session.user.name}
              </p>
            </div>

            <button
              onClick={() => {
                setIsEditingName(!isEditingName);
                setNewName(session.user.name || "");
              }}
              className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Edit
            </button>
          </div>

          {isEditingName && (
            <div className="border rounded-lg p-4 space-y-3">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              />
              <button
                onClick={handleSaveName}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Save Name
              </button>
            </div>
          )}

          {/* Email */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold text-gray-800">
              {session.user.email}
            </p>
          </div>

          {/* Role */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-semibold text-gray-800">
              {session.user.role}
            </p>
          </div>

          {/* Password */}
          <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Password</p>
              <p>Change your password</p>
            </div>

            <button
              onClick={() => setIsEditingPassword(!isEditingPassword)}
              className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg"
            >
              Change
            </button>
          </div>

          {isEditingPassword && (
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 px-2 py-1 text-sm bg-gray-200 rounded-lg"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex justify-between items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 px-2 py-1 text-sm bg-gray-200 rounded-lg"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
