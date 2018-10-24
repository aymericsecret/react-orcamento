import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const QuoteRequestRestart = (props) => {
  const displayValues = props.requestSent ? {
    visibility: 'visible',
    opacity: 1,
  } : {
    visibility: 'hidden',
    opacity: 0,
  };
  return (
    <StyledRestart style={displayValues}>
      <p>O seu orçamento foi enviado com sucesso.</p>
      <button type="button" onClick={props.resetQuotation}>Começar um novo orçamento</button>
      <button type="button" onClick={props.toggle}>Alterar o orçamento</button>
    </StyledRestart>
  );
};

export default QuoteRequestRestart;

QuoteRequestRestart.propTypes = {
  toggle: PropTypes.func.isRequired,
  resetQuotation: PropTypes.func.isRequired,
  requestSent: PropTypes.bool.isRequired,
};

const StyledRestart = styled.div`
  transition: opacity 0.3s ease-out 0.4s;
  position: absolute;
  top: 80px;
  left: 20px;
  width: calc(100% - 40px);
  height: auto;
  p {
    margin: 0 0 40px 0;
  }
  button {
    margin-right: 20px;
    @media only screen and (max-width: 567px) {
      width: 100%;
      margin-bottom: 20px;
    }
  }
`;
