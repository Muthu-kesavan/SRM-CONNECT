import React from 'react';

const ProfileModal = ({ userData, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="bg-transparent p-8 rounded-lg">
        <button onClick={onClose} className="absolute text-xl cursor-pointer">
          &times;
        </button>
        <div className="flex items-center justify-center">
          <img
            src={userData.profilePicture}
            alt="Profile Pic"
            className="w-64 h-64 rounded-full bg-transparent"
          />
        </div>
        
      </div>
    </div>
  );
};

export default ProfileModal;

