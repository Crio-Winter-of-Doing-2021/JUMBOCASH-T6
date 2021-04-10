import React from 'react';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

const UserDropdownMenu = ({onLogOut,redirectToUserPage}) => {
  return (
    <div>
      <Button label="My Profile" icon="pi pi-user" className="p-button-text" onClick={redirectToUserPage}/>
      <Divider />
      <Button label="Logout" icon="pi pi-power-off" className="p-button-text p-button-danger" onClick={onLogOut}/>
    </div>
  );
};

export default UserDropdownMenu;
