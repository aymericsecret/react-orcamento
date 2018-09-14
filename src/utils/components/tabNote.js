import React from 'react';
import PropTypes from 'prop-types';
import styled from '@react-pdf/styled-components';
import {
  Text,
} from '@react-pdf/renderer';
import idGenerator from 'react-id-generator';

// Create a tab with the note of Cremme
const ShowTabNote = (props) => {
  const tabAllNote = [];
  props.tabNote.forEach((note) => {
    tabAllNote.push(<Text key={`note_${idGenerator()}`}>{note}</Text>);
  });
  return (
    // <ContentTab x={props.x} y={props.y} width={props.width} height={props.height}>
    <ContentTab x={20} y={props.y} width={801} height={12.8 * props.tabNote.length + 20}>
      <TraitTableau show="block" width={1} height={12.8 * props.tabNote.length + 20} top={0} left={0} backgroundColor="#979797" />
      <TraitTableau show="block" width={1} height={12.8 * props.tabNote.length + 20} top={0} left={801} backgroundColor="#979797" />
      <TraitTableau show="block" width={801} height={1} top={0} left={0} backgroundColor="#979797" />
      <TraitTableau show="block" width={801} height={1} top={12.8 * props.tabNote.length + 20} left={0} backgroundColor="#979797" />
      <TextNote>
        {tabAllNote}
      </TextNote>
    </ContentTab>
  );
};

export default ShowTabNote;

ShowTabNote.propTypes = {
  tabNote: PropTypes.arrayOf(PropTypes.string).isRequired,
  y: PropTypes.number.isRequired,
};


const ContentTab = styled.View`
  position: absolute;
  top: ${props => props.y};
  left: ${props => props.x};
  width: ${props => props.width};
  height: ${props => props.height};
`;
const TextNote = styled.View`
  position: relative;
  font-size: 9px;
  line-height: 1.5px;
  margin-top: 10px
  margin-left: 10px;
  color: '#979797';
`;
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
