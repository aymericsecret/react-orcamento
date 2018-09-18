import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import VisiblePdf from '../../../../../utils/VisiblePdf';
import Input from '../../../../../components/Input';

class QuoteRequestForm extends Component {
  constructor(props) {
    super(props);
    this.occupationList = [
      'arquitecto/designer',
      'cliente',
      'comprador',
      'outros',
    ];
    this.typeList = [
      'residencial',
      'comercial',
      'restaurante',
      'hotel',
      'outros',
    ];
    this.deadlineList = [
      'pronta entrega',
      'menos de 1 mês',
      '1 - 2 meses',
      '2 - 4 meses',
      'mais de 4 meses',
    ];
  }

  state = {
    request: {
      name: '',
      email: '',
      list_emails: [],
      phone: '',
      occupation: 'residencial',
      occupation_outros: '',
      type: 'arquitecto/designer',
      type_outros: '',
      deadline: 'pronta entrega',
      architect: '',
      cep: '',
      message: '',
    },
    url: '',
    blob: '',
    disabledBtn: true,
  }


  componentWillMount = () => {
    const newState = this.props.quoteRequest;
    if (newState.deadline === '') newState.deadline = '1 - 2 meses';
    if (newState.type === '') newState.type = 'arquitecto/designer';
    this.setState({
      request: this.props.quoteRequest,
    });
    if (this.props.isAdmin === 1 && this.props.quoteRequest.message === '') {
      newState.message = this.props.quoteRequest.defaultMessage;
    }
    this.setState({
      request: newState,
      disabledBtn: true,
      url: '',
      blob: '',
    });
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

  addToListEmails = () => {
    const { request } = this.state;
    request.list_emails.push('');
    this.setState({
      request,
    });
  }

  removeToListEmails = (index) => {
    const { request } = this.state;
    request.list_emails.splice(index, 1);
    this.setState({
      request,
    });
    setTimeout(() => {
      this.props.storeQuoteRequest(this.state.request);
    });
  }

  updateInput = (e) => {
    console.log(this.state);

    const newValue = e.target.value;
    const { request } = this.state;
    switch (e.type) {
      case 'change': {
        switch (e.target.dataset.type) {
          case 'name': {
            request.name = newValue;
            break;
          }
          case 'email': {
            request.email = newValue;
            break;
          }
          case 'list_emails': {
            const id = e.target.id.split('_')[4];
            console.log(id);

            request.list_emails[id] = newValue;
            break;
          }
          case 'phone': {
            request.phone = newValue;
            break;
          }
          case 'architect': {
            request.architect = newValue;
            break;
          }
          case 'type_outros': {
            request.type_outros = newValue;
            break;
          }
          case 'occupation_outros': {
            request.occupation_outros = newValue;
            break;
          }
          case 'cep': {
            request.cep = newValue;
            break;
          }
          case 'message': {
            request.message = newValue;
            break;
          }
          default:
            break;
        }
        this.setState({
          request,
        });
        setTimeout(() => {
          this.props.storeQuoteRequest(this.state.request);
        });
        break;
      }
      default:
        break;
    }
  }

  updateSelect = (e) => {
    const { request } = this.state;
    switch (e.target.dataset.type) {
      case 'type': {
        request.type = e.target.value;
        break;
      }
      case 'occupation': {
        request.occupation = e.target.value;
        break;
      }
      case 'deadline': {
        request.deadline = e.target.value;
        break;
      }

      default:
        break;
    }
    this.setState({
      request,
    });


    setTimeout(() => {
      this.props.storeQuoteRequest(this.state.request);
    });
  }

  submit = () => {
    this.props.processRequest(this.state.blob);
  }

  saveData = () => {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    console.log('ok');
    a.href = this.state.url;
    console.log(this.state.url);
    const name = this.state.request.name.toLowerCase().replace(' ', '');
    a.download = `cremme_orcamento_${name}.pdf`;
    a.click();
    window.URL.revokeObjectURL(this.state.url);
  };

  isFormFilled = () => {
    // eslint-disable-next-line
    const re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;;
    return this.state.request.name !== ''
    && this.state.request.email !== ''
    && re.test(this.state.request.email)
    && this.state.request.phone !== ''
    && (this.state.request.occupation !== '' || (this.state.request.occupation === 'outros' && this.state.request.occupation_outros !== ''))
    && (this.state.request.type !== '' || (this.state.request.type === 'outros' && this.state.request.type_outros !== ''))
    && this.state.request.deadline !== ''
    && this.state.request.message !== '';
  }

  render() {
    const { request } = this.state;
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
          value={request.name}
          mandatory
          updateValue={this.updateInput}
          labelFirst
        />

        <EmailElem>
          <Input
            type="email"
            domain="popup_quotation"
            id="email"
            label="Email"
            idType="email"
            value={request.email}
            mandatory
            updateValue={this.updateInput}
            labelFirst
          />
          {this.props.isAdmin === 1 && request.list_emails.length === 0 && (
            <button type="submit" onClick={this.addToListEmails}>+</button>
          )}
        </EmailElem>
        {this.props.isAdmin === 1 && (
          <SortableList
            items={request.list_emails}
            updateInput={this.updateInput}
            addToListEmails={this.addToListEmails}
            removeToListEmails={this.removeToListEmails}
          />
        )}

        <Input
          type="number"
          domain="popup_quotation"
          id="phone"
          label="Celular/Telefone"
          idType="phone"
          value={request.phone}
          mandatory
          updateValue={this.updateInput}
          labelFirst
        />

        <Input
          type="select"
          domain="popup_quotation"
          id="occupation"
          label="Atuação"
          idType="occupation"
          value={request.occupation}
          mandatory
          updateValue={this.updateSelect}
          labelFirst
          selectList={this.occupationList}
        />
        {this.state.request.occupation === 'outros' && (
          <Input
            type="text"
            domain="popup_quotation"
            id="occupation_outros"
            label="Atuação (outros)"
            idType="occupation_outros"
            value={request.occupation_outros}
            mandatory
            updateValue={this.updateInput}
            labelFirst
          />
        )}

        <Input
          type="select"
          domain="popup_quotation"
          id="type"
          label="Tipo de projeto"
          idType="type"
          value={request.type}
          mandatory
          updateValue={this.updateSelect}
          labelFirst
          selectList={this.typeList}
        />
        {this.state.request.type === 'outros' && (
          <Input
            type="text"
            domain="popup_quotation"
            id="type_outros"
            label="Tipo de projeto (outros)"
            idType="type_outros"
            value={request.type_outros}
            mandatory
            updateValue={this.updateInput}
            labelFirst
          />
        )}

        <Input
          type="select"
          domain="popup_quotation"
          id="deadline"
          label="Prazo do projeto"
          idType="deadline"
          value={request.deadline}
          mandatory
          updateValue={this.updateSelect}
          labelFirst
          selectList={this.deadlineList}
        />

        <Input
          type="text"
          domain="popup_quotation"
          id="architect"
          label="Arquiteto do projeto"
          idType="architect"
          value={request.architect}
          updateValue={this.updateInput}
          labelFirst
        />

        <Input
          type="number"
          domain="popup_quotation"
          id="cep"
          label="CEP"
          idType="cep"
          value={request.cep}
          updateValue={this.updateInput}
          labelFirst
        />

        <Input
          type="textarea"
          domain="popup_quotation"
          id="message"
          label="Mensagem"
          idType="message"
          value={request.message}
          mandatory
          defaultValue={this.props.isAdmin === 1 ? this.props.quoteRequest.defaultMessage : ''}
          updateValue={this.updateInput}

          labelFirst
        />

        <button type="submit" onClick={this.submit} disabled={this.state.disabledBtn || !this.isFormFilled()}>
          {this.props.isAdmin === 1 ? 'Mandar o orçamento' : 'Pedir o seu orçamento'}
        </button>
        {this.props.isAdmin === 1 && (
          <button type="submit" disabled={this.state.disabledBtn} onClick={this.saveData}>
          Baixar
          </button>
        )}

      </StyledForm>

    );
  }
}
const SortableItem = SortableElement(({ value, nbr, updateInput }) => (
  <Input
    type="email"
    domain="popup_quotation"
    id={`list_emails_${nbr}`}
    label="Email"
    idType="list_emails"
    value={value}
    updateValue={updateInput}
    labelFirst
  />
));
const SortableList = SortableContainer(({
  items, updateInput, addToListEmails, removeToListEmails,
}) => (
  <Fragment>
    {items.length > 0 && items.map((value, index) => (
      // eslint-disable-next-line
      <EmailElem key={`item-${index}`}>
        <SortableItem index={index} nbr={index} value={value} updateInput={updateInput} />
        <button type="submit" onClick={() => removeToListEmails(index)}>-</button>
        {index === items.length - 1 && (
          <button type="submit" onClick={addToListEmails}>+</button>
        )}
      </EmailElem>
    ))}
  </Fragment>
));
SortableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateInput: PropTypes.func.isRequired,
};

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
    @media only screen and (max-width: 567px) {
      flex-direction: column;
    }
    span {
      display: inline-block;
      width: 150px;
      @media only screen and (max-width: 567px) {
        width: 100%;
      }
    }
    input {
      width: 200px;
      @media only screen and (max-width: 567px) {
        width: 100%;
      }
    }
  }
  a {
    display: inline-block;
    text-decoration: none;
    line-height: 24px;
    margin-left: 20px;
  }
  button {
    margin-right: 20px;
    @media only screen and (max-width: 567px) {
      width: 100%;
      margin-bottom: 10px;
      margin-right: 0;
    }
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
    width: 100%;
    @media only screen and (min-width: 567px) {
      width: calc(100% - 200px);
      max-width: calc(100% - 200px);
      min-width: calc(100% - 200px);
    }
  }

`;

const EmailElem = styled.div`
  display: flex;
  button {
    margin: 0 0 0 20px;
  }
`;
