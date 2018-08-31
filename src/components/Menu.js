import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import logo from '../assets/logo_cremme_grey.svg';
import Toggle from './Toggle/Toggle';

class Menu extends Component {
  reload = () => {
    // console.log('click');
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
          {session.isLoggedIn && session.permission === 1 && (
          <UserMessage>
            Welcome {session.login}.
          </UserMessage>
          )}
          <Toggle toggle={toggleSide}>Change</Toggle>
          <button type="button" onClick={this.reload} className="menu_link">reload</button>
          {session.isLoggedIn && session.permission === 1 && (
            <Link to="/logout" className="menu_link">logout</Link>
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
  .menu_link {
    color: #3C3C3C;
    margin-right: 10px;
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

const UserMessage = styled.div`
  margin-right: 10px;
`;
const Space = styled.div`
  flex: 1;
`;
