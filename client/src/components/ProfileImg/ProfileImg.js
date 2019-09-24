import React from 'react';

function DefaultImg() {
  return <i className="fas fa-user-circle" />;
}

export function ProfileImg({ profile_img }) {
  return (
    <div className="profile-img">{profile_img ? null : <DefaultImg />}</div>
  );
}
