import React, { useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { logOutUser } from '../../store/actions/authActions';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';


import logo from '../../static/assets/images/logo.png';
import { getAvatarLabel } from '../../utils';
import UserDropdownMenu from './UserDropdownMenu';
import { downloadAnalyticsZip } from '../../store/actions/cashflowAnalyticsActions';

const Navbar = ({ auth, logOutUser, history,downloadAnalyticsZip }) => {
  const op = useRef(null);

  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(history);
  };
 
  const redirectToUserPage = () => {
    history.push('/user')
  }

  const items = [
    {
      label: 'Dashboard',
      template: (item, options) => {
        return (
          <NavLink exact={true} className="p-menuitem-link" activeClassName="active-link" to="/">
            <span className="p-menuitem-icon pi pi-fw pi-chart-line"></span>
            <span className="p-menuitem-text">Dashboard</span>
          </NavLink>
        );
      },
    },
    {
      label: 'Report',
      template: (item, options) => {
        return (
          <NavLink className="p-menuitem-link" activeClassName="active-link" to="/report">
            <span className="p-menuitem-icon pi pi-fw pi-file-pdf"></span>
            <span className="p-menuitem-text">Report</span>
          </NavLink>
        );
      },
    },
    {
      label: 'Download Reports Zip',
      template: (item, options) => {
        return (
          <Button
          icon="pi pi-folder"
          className="p-button-text p-button-secondary"
          label="Download Reports Zip"
          onClick={downloadAnalyticsZip}
        />
        );
      },
    },
  ];

  const start = (
    <img
      alt="logo"
      src={logo}
      onError={(e) =>
        (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
      }
      height="40"
      className="p-mr-2"
    ></img>
  );

  const end = (
    <Button
      label={getAvatarLabel(auth?.user?.name)}
      className="p-button-secondary p-button-raised p-p-2"
      onClick={(e) => op.current.toggle(e)}
      aria-haspopup
      aria-controls="overlay_panel"
    />
  );
  return (
    <div>
      <div className="card">
        <Menubar model={items} start={start} end={end} />
      </div>
      <OverlayPanel ref={op} dismissable>
        <UserDropdownMenu onLogOut={onLogOut} redirectToUserPage={redirectToUserPage}/>
      </OverlayPanel>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser,downloadAnalyticsZip }))(Navbar);
