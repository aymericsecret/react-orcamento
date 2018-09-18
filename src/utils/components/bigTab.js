import React from 'react';
import PropTypes from 'prop-types';
import styled from '@react-pdf/styled-components';
import {
} from '@react-pdf/renderer';

import Tab from './tab';

// Line of tab with 5 columns
const BigTab = props => (
  <ContentTab x={props.x} y={props.y} width={0} height={0}>
    <TraitTableau show="block" width={1} height={props.height} top={0} left={0} backgroundColor="#979797" />
    <Tab showUnderBorder={props.showUnderBorder} show={props.showImg} x={0} y={0} width={162.5} height={props.height} text1={props.text[0]} text2="" />
    <Tab showUnderBorder="block" show="block" x={162.5} y={0} width={159.25} height={props.height} boldText="11px" text1={props.text[1]} text2={props.text[2]} />
    <Tab showUnderBorder="block" show="block" x={322.25} y={0} width={160} height={props.height} text1={props.text[3]} text2={props.text[4]} />
    <Tab showUnderBorder="block" show="block" x={482.25} y={0} width={214} height={props.height} text1={props.text[5]} text2={props.text[6]} />
    <Tab showUnderBorder="block" show="block" x={696.25} y={0} width={105} height={props.height} text1={props.text[7]} text2={props.text[8]} />
    {(props.src !== undefined)
      && <ImageOrcaCustom top={props.positionYimg} y={props.y} src={props.src} />
    }
  </ContentTab>
);

export default BigTab;

BigTab.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  src: PropTypes.string,
  showImg: PropTypes.string,
  showUnderBorder: PropTypes.string,
  positionYimg: PropTypes.string,
};
BigTab.defaultProps = {
  src: undefined,
  showImg: undefined,
  showUnderBorder: undefined,
  positionYimg: undefined,
};

const TraitTableau = styled.View`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  z-index: 15;
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
  display: ${props => props.show};
`;
const ContentTab = styled.View`
  position: absolute;
  top: ${props => props.y};
  left: ${props => props.x};
  width: ${props => props.width};
  height: ${props => props.height};
`;
const ImageOrcaCustom = styled.Image`
  position: absolute;
  z-index: 20;
  top: ${props => props.top};
  left: 30px;
  width: 100px;
  height: 67px;
  object-fit: cover;
  object-position: 50%, 50%;
`;
