import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import logo from '../assets/logo_cremme_grey.svg';
import Toggle from './Toggle/Toggle';
import VisibleProductSearch from '../scenes/Quotation/components/ProductSearch/VisibleProductSearch';
import logout from '../assets/logout.png';
import reload from '../assets/reload.png';

class Menu extends Component {
  onClickSearch = (e) => {
    const target = e.currentTarget;
    if (target.className.indexOf('active') >= 0) {
      // This won't happen ever
      target.classList.remove('active');
    } else {
      target.classList.add('active');
    }
  }

  reload = () => {
    this.props.initApp();
  }

  render() {
    const { session, children, toggleSide } = this.props;
    return (
      <StyledMenu>
        <MenuWrapper>

          <Link to="/" className="logo_link">
            <img src={logo} className="logo" alt="logo" />
          </Link>
          {children !== null && (
          <h3>{children}</h3>
          )}
          <Space />
          {/* {session.isLoggedIn && session.permission === 1 && (
          <UserMessage>
            Welcome {session.login}.
          </UserMessage>
          )} */}

          <VisibleProductSearch toggleSide={this.props.toggleSide} toggleSearch={this.toggleSearch} />

          <Toggle toggle={toggleSide}>Change</Toggle>
          <button type="button" onClick={this.reload} className="btn_reload menu_link"><img src={reload} alt="" /></button>
          {session.isLoggedIn && session.permission === 1 && (
            <Link to="/logout" className="menu_link"><img src={logout} alt="" /></Link>
          )}
        </MenuWrapper>
      </StyledMenu>
    );
  }
}

export default Menu;

Menu.propTypes = {
  session: PropTypes.shape({
    permission: PropTypes.number,
    isLoggedIn: PropTypes.bool,
    login: PropTypes.string,
  }),
  children: PropTypes.node,
  initApp: PropTypes.func.isRequired,
  toggleSide: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  session: {
    isLoggedIn: false,
    permission: 0,
  },
  children: null,
};

const StyledMenu = styled.div`
  position: fixed;
  width: 100vw;
  height: 66px;
  top: 0;
  left: 0;
  z-index: 500;
  background-color: white;
  border-bottom: 1px solid #3C3C3C;
  padding: 20px;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  max-width: 1200px;
  height: 100%;
  margin: auto;
  a.logo_link {
    display: block;
    margin-right: 10px;
    img {
      display: block;
      height: 25px;
    }
  }
  .btn_reload {
    border: none;
  }
  .menu_link {

    display: flex;
    align-self: center;
    color: #3C3C3C;
    margin-right: 5px;
    img {
      height: 15px;
    }
  }
  button.toggle {
    display: block;
    position: fixed;
    top: 10px;
    z-index: 100;
    right: 20px;
    @media only screen and (min-width: 576px) {
      display: none;
    }
  }
`;

const Space = styled.div`
  flex: 1;
`;
