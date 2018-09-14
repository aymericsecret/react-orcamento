import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Toggle from '../../Toggle/Toggle';
import closeIcon from '../../../assets/SVG/light/Icones-02.svg';
// import Input from '../../Input';

class PopupWrapper extends Component {
  handleClickOutside = () => {
    this.props.toggle();
  }

  closePopup = () => {
    this.props.toggle();
  }

  render() {
    return (
      <StyledWrapper className="popup_wrapper">
        <h3>{this.props.title}</h3>
        <StyledToggle><Toggle toggle={this.closePopup}><img src={closeIcon} alt="" /></Toggle></StyledToggle>
        {this.props.children}
      </StyledWrapper>

    );
  }
}

export default onClickOutside(PopupWrapper);

PopupWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};


const StyledToggle = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    button {
      padding: 0;
      width: 20px;
      height: 20px;
      background-color: unset;
    }
`;
const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 700px;
  height: auto;
  max-height: 700px;
  background: #EDEDED;
  z-index: 650;
  padding: 20px;
  box-shadow: 0px 3px 20px -3px rgba(0,0,0,.6);

  @media only screen and (max-width: 567px) {
     width: calc(100% - 40px);
  }
  h3 {
    line-height: 27px;
    margin: 0 0 20px 0;
    font-family: 'Omnes';
  }
`;
