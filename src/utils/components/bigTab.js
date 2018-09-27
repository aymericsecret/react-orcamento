import React from 'react';
import PropTypes from 'prop-types';
import styled from '@react-pdf/styled-components';
import {
} from '@react-pdf/renderer';

import Tab from './tab';

// Line of tab with 7 columns
const BigTab = (props) => {
  const widthC1 = 125;
  const widthC2 = 125;
  const widthC3 = 125;
  const widthC4 = 177;
  const widthC5 = 83;
  const widthC6 = 83;
  const widthC7 = 83;
  return (
    <ContentTab x={props.x} y={props.y} width={0} height={0}>
      <TraitTableau show="block" width={1} height={props.height} top={0} left={0} backgroundColor="#979797" />
      {/* eslint-disable-next-line */}
      <Tab showUnderBorder={props.showUnderBorder} show={props.showImg} x={0} y={0} width={widthC1} height={props.height} text1={props.content[0].title_1} text2={props.content[0].title_2} />
      <Tab showUnderBorder="block" show="block" x={widthC1} y={0} width={widthC2} height={props.height} boldText="11px" text1={props.content[1].title_1} text2={props.content[1].title_2} />
      <Tab showUnderBorder="block" show="block" x={widthC1 + widthC2} y={0} width={widthC3} height={props.height} text1={props.content[2].title_1} text2={props.content[2].title_2} />
      <Tab showUnderBorder="block" show="block" x={widthC1 + widthC2 + widthC3} y={0} width={widthC4} height={props.height} text1={props.content[3].title_1} text2={props.content[3].title_2} />
      <Tab showUnderBorder="block" show="block" x={widthC1 + widthC2 + widthC3 + widthC4} y={0} width={widthC5} height={props.height} text1={props.content[4].title_1} text2={props.content[4].title_2} />
      <Tab showUnderBorder="block" show="block" x={widthC1 + widthC2 + widthC3 + widthC4 + widthC5} y={0} width={widthC6} height={props.height} text1={props.content[5].title_1} text2={props.content[5].title_2} />
      <Tab showUnderBorder="block" show="block" x={widthC1 + widthC2 + widthC3 + widthC4 + widthC5 + widthC6} y={0} width={widthC7} height={props.height} text1={props.content[6].title_1} text2={props.content[6].title_2} />
      {(props.src !== undefined)
        && <ImageOrcaCustom top={props.positionYimg} y={props.y} src={props.src} />
      }
    </ContentTab>
  );
};

export default BigTab;

BigTab.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  left: 12.5px;
  width: 100px;
  height: 67px;
  object-fit: cover;
  object-position: 50%, 50%;
`;
