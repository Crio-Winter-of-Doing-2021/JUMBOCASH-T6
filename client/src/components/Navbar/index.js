import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { logOutUser } from '../../store/actions/authActions';
import { Button } from 'primereact/button';
import  logo from '../../static/assets/images/logo.png';

const Navbar = ({ auth, logOutUser, history }) => {
  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(history);
  };

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
    // {
    //   label: 'Report',
    //   template: (item, options) => {
    //     return (
    //       <NavLink className="p-menuitem-link" activeClassName="active-link" to="/report">
    //         <span className="p-menuitem-icon pi pi-fw pi-file-o"></span>
    //         <span className="p-menuitem-text">Report</span>
    //       </NavLink>
    //     );
    //   },
    // },
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

  const end = <Button label="Logout" icon="pi pi-power-off" onClick={onLogOut} />;

  return (
    <div>
      <div className="card">
        <Menubar model={items} start={start} end={end} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Navbar);
