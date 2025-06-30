import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/Authcontext";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const { user, updateUserProfile } = useContext(AuthContext);

  useEffect(() => {
    setIsModalOpen(true);
    setName(user?.displayName || "");
    setPhoto(user?.photoURL || "");
  }, [user]);

  const closeMainModal = () => setIsModalOpen(false);
  const closeEditModal = () => setIsEditModalOpen(false);

  // modal বন্ধ হলে redirect করবে
  if (!isModalOpen) {
    navigate("/");
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({
          displayName: name,
          photoURL: photo,
        });
      toast.success("Profile Updated!");
      closeEditModal();
    } catch (error) {
      toast.error(error.message || "Update failed!");
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl relative overflow-hidden">
            {/* Cover Section */}
            <div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
              <img
                src="https://joynul2024.sirv.com/profile-cover.jpg"
                alt="Cover"
                className="w-full h-full object-cover"
              />

              {/* Profile Picture */}
              <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/YdT4hFx/user.png"}
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>
            </div>

            {/* Modal Content */}
            <div className="mt-20 p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {user?.displayName || "User Name"}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{user?.email}</p>

              <div className="flex justify-center gap-4 mt-4">
                <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                  Change Password
                </button>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Update Profile
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={closeMainModal}
                className="mt-6 text-sm text-gray-500 hover:border-blue-300 btn-ghost btn"
              >
                &larr; Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔧 Update Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              onClick={closeEditModal}
              className="absolute top-2 right-3 text-xl font-bold text-gray-700 hover:text-red-500"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4 text-center">Update Your Profile</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Photo URL</label>
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
