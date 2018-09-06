import React, { Component } from 'react';
import styled from '@react-pdf/styled-components';
import {
  Page,
  Document,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';

import LogCremmeCircle from '../assets/logo_circle_cremme.png';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
});

// eslint-disable-react/prop-types
// top of table orçamento
function BigTab(props) {
  return (
    <ContentTab x={props.x} y={props.y} width={0} height={0}>
      <Tab x={0} y={0} width={162.5} height={props.height} text1={props.text[0]} text2="">
        <ImageOrcaCustom src={LogCremmeCircle} />
      </Tab>
      <Tab x={162.5} y={0} width={159.75} height={props.height} text1={props.text[1]} text2={props.text[2]} />
      <Tab x={322.25} y={0} width={160} height={props.height} text1={props.text[3]} text2="" />
      <Tab x={482.25} y={0} width={214} height={props.height} text1={props.text[4]} text2="" />
      <Tab x={696.25} y={0} width={105} height={props.height} text1={props.text[5]} text2="" />
      {/* <Tab x={0} y={0} width={props.width} height={props.height} />
      <Tab x={183} y={0} width={160} height={props.height} />
      <Tab x={507} y={0} width={214} height={props.height} /> */}
    </ContentTab>
  );
}

// top of table orçamento
function Tab(props) {
  return (
    <ContentTab x={props.x} y={props.y} width={props.width} height={props.height}>
      <TraitTableau width={1} height={props.height} top={0} left={0} />
      <TraitTableau width={1} height={props.height} top={0} left={props.width} />
      <TraitTableau width={props.width} height={1} top={0} left={0} />
      <TraitTableau width={props.width} height={1} top={props.height} left={0} />
      <TextTab width={props.width - 40} height={(props.height / 3)}>
        <Text>
          {props.text1}
        </Text>
        <Text>
          {props.text2}
        </Text>
      </TextTab>
    </ContentTab>
  );
}


export default class PDF extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  allPage = () => {
    let table = [];

    for (let i = 0; i < (this.props.products.length / 4); i += 1) {
      console.log('DANS LE FOR ALL PAAAAAAAGE');
      table.push(
        <Page size="A4" orientation="landscape" style={styles.page}>
          <FondGris />
          <BigTab x={20} y={20} width={802} height={13} text={['TEEEEST', 'tipologia', '', 'L x P x A (cm)', 'acabamento', 'preço unitario']} />
          {this.props.products.map((product, i) => {
            const foundProduct = this.props.allProducts.find(function (oneProduct) { return oneProduct.id === product.id_product });
            // Check if product.size is defined or not
            let sizeProduct = `${product.size} (cm)`;
            // console.log(foundProduct.acf.layout);
            if (product.size === null) {
              sizeProduct = '';
            }
            console.log(i + ' taille : ' + sizeProduct);
            // Check if product.material is defined or not
            let materialProduct = product.material;
            if (product.size === null) {
              materialProduct = '';
            }
            // Check if product.price is defined or not
            let priceProduct = `R$ ${product.price}`;
            if (product.price === null) {
              priceProduct = '';
              // priceProduct = foundProduct.acf.variations[0].price;
            }
            return <BigTab key={i} x={20} y={33 + i * 87} width={802} height={87} text={['', foundProduct.title.rendered, 'Encosto parcial direito', sizeProduct, materialProduct, priceProduct]} />;
          })
          }
          <LogoCircleCustom src={LogCremmeCircle} />
        </Page>,
      );
    }
    console.log("TABLE : ");
    console.log(table);
    return table;
  }

  // test = () => {
  //   let allPageVar = this.allPage();
  //   return (allPageVar.map(page) =>)
  // }

  // Create Document Component
  MyDocument = () => (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Titre>orçamento</Titre>
        <ImageCustom src="http://cremme.com.br/wp-content/uploads/2017/09/cremme-mesas-botane_2-e1532970266702.jpg" />
        <Rectangle />
        <Trait />
        <Adresse>
          <Text>Alameda Gabriel Monteiro da Silva,</Text>
          <Text>384</Text>
        </Adresse>
        <LogoCircleCustom src={LogCremmeCircle} />
        <Contact>
          <Text>www.cremme.com.br</Text>
          <Text>contat@cremme.com.br</Text>
          <Text>11 3064 2590</Text>
        </Contact>
      </Page>
      { this.allPage() }
      <Page size="A4" orientation="landscape" style={styles.page}>
        <FondGris />
        <BigTab x={20} y={20} width={802} height={13} text={['foto', 'tipologia', '', 'L x P x A (cm)', 'acabamento', 'preço unitario']} />
        {this.props.products.map((product, i) => {
          const foundProduct = this.props.allProducts.find(function (oneProduct) { return oneProduct.id === product.id_product});
          // Check if product.size is defined or not
          let sizeProduct = `${product.size} (cm)`;
          // console.log(foundProduct.acf.layout);
          if (product.size === null) {
            sizeProduct = '';
          }
          console.log(i + ' taille : ' +sizeProduct);
          // Check if product.material is defined or not
          let materialProduct = product.material;
          if (product.size === null) {
            materialProduct = '';
          }
          // Check if product.price is defined or not
          let priceProduct = `R$ ${product.price}`;
          if (product.price === null) {
            priceProduct = '';
            // priceProduct = foundProduct.acf.variations[0].price;
          }
          return <BigTab key={i} x={20} y={33 + i * 87} width={802} height={87} text={['', foundProduct.title.rendered, 'Encosto parcial direito', sizeProduct, materialProduct, priceProduct]} />;
        })
        }
        <LogoCircleCustom src={LogCremmeCircle} />
      </Page>
    </Document>
  );

  render() {
    return (
      <div>
        PDF :
        {this.MyDocument()}
      </div>
    );
  }
}

// Page 1
const Titre = styled.Text`
  margin-top: 50px;
  margin-left: 35px;
  margin-bottom: 20px;
  font-size: 23px;
  color: #979797;
`;

const ImageCustom = styled.Image`
  position: absolute;
  z-index: 5;
  top: 100px;
  left: 0;
  object-fit: cover;
  object-position: 50% 50%;
  width: 842px;
`;

const Rectangle = styled.View`
  position: absolute;
  z-index: 10;
  top: 477px;
  left: 0px
  width: 842px;
  height: 118px;
  background-color: #ffffff;
`;

const Trait = styled.View`
  position: absolute;
  z-index: 15;
  top: 507px;
  left: 35px;
  width: 772px;
  height: 1px;
  background-color: #979797;
`;

const Adresse = styled.View`
  position: absolute;
  z-index: 15px;
  bottom: 20px;
  left: 35px;
  font-size: 8px;
  line-height: 1.5px;
  color: #979797;
`;

const LogoCircleCustom = styled.Image`
  position: absolute;
  z-index: 15;
  bottom: 23px;
  left: 399px;
  width: 45px;
  height: 45px;
`;

const Contact = styled.View`
  position: absolute;
  z-index: 15px;
  bottom: 20px;
  right: 35px;
  font-size: 8px;
  line-height: 1.5px;
  color: #979797;
`;


// Page Tableau
const FondGris = styled.View`
  position: absolute;
  z-index: -1;
  top: 20px;
  left: 20px;
  width: 802px;
  height: 440px
  background-color: #D8D8D8;
`;
const TraitTableau = styled.View`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  z-index: 15px;
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: #979797;
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
  left: 20px;
  width: ${props => props.width};
  top: ${props => props.height};
  height: ${props => props.height};
  text-align: center;
  font-size: 9px;
  line-height: 1.5px;
`;

const ImageOrcaCustom = styled.Image`
  position: relative;
  z-index: 20;
`;
