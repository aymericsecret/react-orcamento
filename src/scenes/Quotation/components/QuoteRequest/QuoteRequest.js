import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ReactLoading from 'react-loading';
import Popup from '../../../../components/Popup/Popup';
import QuoteRequestForm from './components/QuoteRequestForm';
import QuoteRequestRestart from './components/QuoteRequestRestart';

export default class QuoteRequest extends Component {
  state = {
    isSending: false,
    sendingMessage: 'Enviando solicitação...',
    isSent: false,
    hasError: false,
  }

  componentDidMount = () => {
    const {
      initQuoteRequest, isCreated, quoteRequest, orcaOptions, setQuoteRequestDefaultMessage,
    } = this.props;

    console.log(orcaOptions.default_message);
    setQuoteRequestDefaultMessage(orcaOptions.default_message);
    if (!isCreated) {
      // console.log('ON INIT');
      initQuoteRequest();
    }
    this.quoteRequest = quoteRequest;
  }


  storeQuoteRequest = (request = this.props.quoteRequest) => {
    this.props.saveQuoteRequest(request);
  }

  processRequest = (urlPDF) => {
    const productsNotes = [];
    this.props.quotation.products.forEach((p, key) => {
      if (p.note !== '') {
        productsNotes.push({
          key: key + 1,
          title: this.props.products.find(el => el.id === p.id_product).title.rendered,
          note: p.note,
        });
      }
    });

    const emailParams = {
      request_name: this.props.quoteRequest.name,
      request_email: this.props.quoteRequest.email,
      request_message: this.props.quoteRequest.message,
      request_list_emails: this.props.quoteRequest.list_emails,
      request_infos: {
        phone: this.props.quoteRequest.phone,
        occupation: this.props.quoteRequest.occupation,
        occupation_outros: this.props.quoteRequest.occupation_outros,
        type: this.props.quoteRequest.type,
        type_outros: this.props.quoteRequest.type_outros,
        deadline: this.props.quoteRequest.deadline,
        architect: this.props.quoteRequest.architect,
        cep: this.props.quoteRequest.cep,
      },
      request_permission: this.props.isAdmin,
      request_file: urlPDF,
      request_products_notes: productsNotes,
    };


    this.setState({
      isSending: true,
    });

    fetch('http://cremme.com.br/wp-json/orcamento/v1/request', {
    // fetch('http://localhost/cremme/wp-json/orcamento/v1/request', {
      method: 'post',
      body: JSON.stringify(emailParams),
    }).then(response => response.json())
      .then((data) => {
        const PopUpWwrapper = document.getElementById('popup_wrapper_needLittle_PopUp');
        if (PopUpWwrapper.classList.contains('littlePopUp')) {
          PopUpWwrapper.classList.remove('littlePopUp');
        } else {
          PopUpWwrapper.classList.add('littlePopUp');
        }
        console.log('response', data);
        switch (data.status) {
          case 200:
            // Success
            this.setState({
              isSending: false,
              isSent: true,
            });
            break;
          case 304:
            this.setState({
              sendingMessage: 'Ocorreu um erro, por favor tenta novamente mais tarde',
              hasError: true,
            });
            break;
          default:
            break;
        }
      });
  }

  resetQuotation = () => {
    this.setState({
      isSending: false,
      isSent: false,
    });
    this.props.resetQuotation();
    this.props.togglePopup();
  }

  toggleRestart = () => {
    this.setState({
      isSending: false,
      isSent: false,
    });
    this.props.togglePopup();
  }

  render() {
    console.log(this.props.orcaOptions);

    return (
      <Popup isOpen={this.props.isOpen} toggle={this.toggleRestart} title="Pedido do orçamento">
        <QuoteRequestForm
          isAdmin={this.props.isAdmin}
          processRequest={this.processRequest}
          storeQuoteRequest={this.storeQuoteRequest}
          quoteRequest={this.props.quoteRequest}
          requestSent={this.state.isSent}
        />
        <QuoteRequestRestart
          resetQuotation={this.resetQuotation}
          requestSent={this.state.isSent}
          toggle={this.toggleRestart}
        />
        {this.state.isSending && (
          <StyledLoader>
            <h3>{this.state.sendingMessage}</h3>
            {!this.state.hasError ? <ReactLoading type="bubbles" color="#3C3C3C" height={40} width={40} /> : <button type="button" onClick={this.toggleRestart}>Fechar</button>}
          </StyledLoader>
        )}
      </Popup>
    );
  }
}

QuoteRequest.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isCreated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.number.isRequired,
  quoteRequest: PropTypes.shape().isRequired,
  togglePopup: PropTypes.func.isRequired,
  saveQuoteRequest: PropTypes.func.isRequired,
  initQuoteRequest: PropTypes.func.isRequired,
  resetQuotation: PropTypes.func.isRequired,
  setQuoteRequestDefaultMessage: PropTypes.func.isRequired,
  orcaOptions: PropTypes.shape({
    default_message: PropTypes.string,
  }).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  quotation: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const StyledLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,.8);
  border-radius: 3px;
  display: flex;

  flex-direction: column;

  justify-content: center;
  align-items: center;
`;
