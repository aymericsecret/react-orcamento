import React from 'react';
import PropTypes from 'prop-types';
import styled from '@react-pdf/styled-components';
import {
  Text,
  StyleSheet,
} from '@react-pdf/renderer';
import config from '../config';


// Tab with border and text
const Tab = (props) => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
    },
    h3: {
      fontFamily: 'fontRegular',
      color: config.fontColorDark,
      // color: '#828282',
    },
    text: {
      fontFamily: 'fontLight',
      color: config.fontColorDark,
    },
    medium: {
      fontFamily: 'fontRegular',
    },
  });
  return (
    <ContentTab x={props.x} y={props.y} width={props.width} height={props.height}>
      <TraitTableau show="block" width={1} height={props.height} top={0} left={props.width} backgroundColor={config.fontColorDark} />
      <TraitTableau show={props.showUnderBorder} width={props.width} height={1} top={props.height} left={0} backgroundColor={config.fontColorDark} />
      <TextTab width={props.width - 20} height={props.height / 3 + 1.2}>
        <TextMiniTab>
          <Text style={styles.h3}>{props.text1}</Text>
          <Text style={styles.text}>{props.text2}</Text>
        </TextMiniTab>
      </TextTab>
    </ContentTab>
  );
};

export default Tab;

Tab.propTypes = {
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  showUnderBorder: PropTypes.string,
};
Tab.defaultProps = {
  showUnderBorder: undefined,
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
const TextTab = styled.View`
  position: relative;
  z-index: 20;
  left: 10px;
  width: ${props => props.width};
  top: ${props => props.height};
  height: ${props => props.height};
  text-align: center;
  font-size: 9px;
  line-height: 1.5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0;
`;
const TextMiniTab = styled.View`
  display: flex;
  flex-direction: column;
`;
