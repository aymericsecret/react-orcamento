import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VisiblePdf from '../../../../../utils/VisiblePdf';
import Input from '../../../../../components/Input';

class QuoteRequestForm extends Component {
  constructor(props) {
    super(props);
    this.typeList = [
      'arquitecto/designer',
      'cliente',
      'comprador',
      'outros',
    ];
  }

  state = {
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
    url: '',
    disabledBtn: true,
  }

  componentWillMount = () => {
    const newState = this.props.quoteRequest;
    this.setState(this.props.quoteRequest);
    if (this.props.isAdmin === 1 && this.props.quoteRequest.message === '') {
      newState.message = this.props.quoteRequest.defaultMessage;
    }
    this.setState(newState);
  }


  // On PDF render creation of Blob string to be end to PHPMailer
  onRender = ({ blob }) => {
    // Doc FileReader : https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    // Doc Blob : http://qnimate.com/an-introduction-to-javascript-blobs-and-file-interface/
    this.setState({
      disabledBtn: false,
    });
    // Creating a Blob object from the react-pdf render return
    const bloby = new Blob([blob]);
    // Initializing FileReader to process the Blob and transform it into a String,
    // Readable by our PHP endpoint
    const myReader = new FileReader();
    // Once the Blob has been read, we update the state with the String ready to be sent
    // We keep the URL ready for the download button
    myReader.addEventListener('loadend', (e) => {
      this.setState({
        url: URL.createObjectURL(bloby),
        blob: e.srcElement.result,
      });
    });
    // We start the reading process
    myReader.readAsDataURL(bloby);
  };

  updateInput = (e) => {
    switch (e.type) {
      case 'change': {
        const newValue = e.target.value;
        switch (e.target.dataset.type) {
          case 'name': {
            this.setState({
              name: newValue,
            });
            break;
          }
          case 'email': {
            this.setState({
              email: newValue,
            });
            break;
          }
          case 'phone': {
            this.setState({
              phone: newValue,
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

  updateSelect = (e) => {
    console.log(e);
    console.log(e.target.dataset.type);

    switch (e.target.dataset.type) {
      case 'type': {
        this.setState({
          type: e.target.value,
        });

        break;
      }

      default:
        break;
    }
    setTimeout(() => {
      this.props.storeQuoteRequest(this.state);
    });
  }

  submit = () => {
    this.props.processRequest(this.state.blob);
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
        <VisiblePdf render={this.onRender} />
        <Input
          type="text"
          domain="popup_quotation"
          id="name"
          label="Nome"
          idType="name"
          value={this.state.name}
          updateValue={this.updateInput}
          labelFirst
        />

        <Input
          type="email"
          domain="popup_quotation"
          id="email"
          label="Email"
          idType="email"
          value={this.state.email}
          updateValue={this.updateInput}
          labelFirst
        />

        <Input
          type="number"
          domain="popup_quotation"
          id="phone"
          label="Celular/Telefone"
          idType="phone"
          value={this.state.phone}
          updateValue={this.updateInput}
          labelFirst
        />

        <Input
          type="select"
          domain="popup_quotation"
          id="type"
          label="Tipo de projeto"
          idType="type"
          value={this.state.type}
          updateValue={this.updateSelect}
          labelFirst
          selectList={this.typeList}
        />

        <Input
          type="textarea"
          domain="popup_quotation"
          id="message"
          label="Conteudo"
          idType="message"
          value={this.state.message}
          defaultValue={this.props.isAdmin === 1 ? this.props.quoteRequest.defaultMessage : ''}
          updateValue={this.updateInput}

          labelFirst
        />

        <button type="submit" onClick={this.submit} disabled={this.state.disabledBtn}>
          {this.props.isAdmin === 1 ? 'Mandar o orçamento' : 'Pedir o seu orçamento'}
        </button>
        {this.props.isAdmin === 1 && (
          <a className={`button ${this.state.disabledBtn === true ? 'disabled' : ''}`} href={this.state.url} download="orcamento.pdf">Baixar</a>
        )}

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
};

const StyledForm = styled.div`
  height: auto;
  label {
    display: flex;
    margin-bottom: 20px;
    span {
      display: inline-block;
      width: 90px;
    }
    input {
      width: 200px;
      @media only screen and (max-width: 567px) {
        width: calc(100% - 90px);
      }
    }
  }
  a {
    display: inline-block;
    text-decoration: none;
    line-height: 24px;
    margin-left: 20px;
  }
  button:disabled, a.disabled {
    cursor: default;
    opacity: 0.6;
  }
  #popup_quotation_name_name {

  }
  #popup_quotation_message_message {
    height: 150px;
    min-height: 150px;
    max-height: 150px;
    width: calc(100% - 90px);
    @media only screen and (min-width: 567px) {
      width: calc(100% - 200px);
      max-width: calc(100% - 200px);
      min-width: calc(100% - 200px);
    }
  }

`;
