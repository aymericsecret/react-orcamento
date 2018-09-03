import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../../../../components/Input';

class QuoteRequestForm extends Component {
  state = {
    email: '',
    message: '',
    name: '',
  }

  componentWillMount = () => {
    const newState = this.props.quoteRequest;
    this.setState(this.props.quoteRequest);
    if (this.props.isAdmin === 1 && this.props.quoteRequest.message === '') {
      newState.message = this.props.quoteRequest.defaultMessage;
    }
    this.setState(newState);
  }

  updateInput = (e) => {
    switch (e.type) {
      case 'change': {
        const newValue = e.target.value;
        switch (e.target.dataset.type) {
          case 'email': {
            this.setState({
              email: newValue,
            });
            break;
          }
          case 'name': {
            this.setState({
              name: newValue,
            });
            break;
          }
          case 'message': {
            this.setState({
              message: newValue,
            });
            break;
          }
          default:
            break;
        }
        setTimeout(() => {
          this.props.storeQuoteRequest(this.state);
        });
        break;
      }
      default:
        break;
    }
  }

  submit = () => {
    // console.log('submit');
    this.props.processRequest();
  }

  render() {
    const displayValues = this.props.requestSent ? {
      visibility: 'hidden',
      opacity: 0,
      transition: 'visibility 0s linear 0.3s,opacity 0.3s linear',
    } : {
      visibility: 'visible',
      opacity: 1,
      transitionDelay: ' 0s',
    };
    return (
      <StyledForm style={displayValues}>
        <Input type="text" domain="popup_quotation" id="name" label="Nome" idType="name" value={this.state.name} updateValue={this.updateInput} />

        <Input type="email" domain="popup_quotation" id="email" label="Email" idType="email" value={this.state.email} updateValue={this.updateInput} />

        <Input
          type="textarea"
          domain="popup_quotation"
          id="message"
          label="Conteudo"
          idType="message"
          value={this.state.message}
          defaultValue={this.props.isAdmin === 1 ? this.props.quoteRequest.defaultMessage : ''}
          updateValue={this.updateInput}
        />

        <button type="submit" onClick={this.submit}>
          {this.props.isAdmin === 1 ? 'Mandar o orçamento' : 'Pedir o seu orçamento'}
        </button>
      </StyledForm>

    );
  }
}

export default QuoteRequestForm;

QuoteRequestForm.propTypes = {
  isAdmin: PropTypes.number.isRequired,
  storeQuoteRequest: PropTypes.func.isRequired,
  requestSent: PropTypes.bool.isRequired,
  processRequest: PropTypes.func.isRequired,
  quoteRequest: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
    defaultMessage: PropTypes.string,
  }).isRequired,
  // toggle: PropTypes.func.isRequired,
  // savePopupData: PropTypes.func.isRequired,
};

const StyledForm = styled.div`
  height: 285px;
  label {
    display: flex;
    margin-bottom: 20px;
    span {
      display: inline-block;
      width: 90px;
    }
    input {
      width: 200px;
    }
  }
  #popup_quotation_name_name {

  }
  #popup_quotation_message_message {
    width: calc(100% - 200px);
    max-width: calc(100% - 200px);
    min-width: calc(100% - 200px);
    height: 150px;
    min-height: 150px;
    max-height: 150px;
  }

`;
