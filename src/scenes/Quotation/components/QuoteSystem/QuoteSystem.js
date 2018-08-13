import React, { Component } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Header from '../../../../components/Header';
// import Product from './Product';

class QuoteSystem extends Component {
    state = {

    }

    render() {
      return (
        <QuoteBlock>
          <Header />
          Hello
        </QuoteBlock>
      );
    }
}

export default QuoteSystem;

// QuoteSystem.propTypes = {
//   update: PropTypes.func.isRequired,
// };

const QuoteBlock = styled.div`
  width: 50%;
  height: 100%;
  background: #EDEDED;
`;
