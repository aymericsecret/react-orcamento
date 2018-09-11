import React, { Component } from 'react';
import PropTypes from 'prop-types';
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


// top of table orçamento
const BigTab = props => (
  <ContentTab x={props.x} y={props.y} width={0} height={0}>
    <Tab x={0} y={0} width={162.5} height={props.height} text1={props.text[0]} text2="" />
    <Tab x={162.5} y={0} width={159.25} height={props.height} text1={props.text[1]} text2={props.text[2]} />
    <Tab x={322.25} y={0} width={160} height={props.height} text1={props.text[3]} text2="" />
    <Tab x={482.25} y={0} width={214} height={props.height} text1={props.text[4]} text2="" />
    <Tab x={696.25} y={0} width={105} height={props.height} text1={props.text[5]} text2="" />
    {props.src !== undefined
      && <ImageOrcaCustom y={props.y} src={props.src} />
    }
  </ContentTab>
);
BigTab.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  src: PropTypes.string,
};
BigTab.defaultProps = {
  src: undefined,
};

// top of table orçamento
const Tab = props => (
  <ContentTab x={props.x} y={props.y} width={props.width} height={props.height}>
    <TraitTableau width={1} height={props.height} top={0} left={0} />
    <TraitTableau width={1} height={props.height} top={0} left={props.width} />
    <TraitTableau width={props.width} height={1} top={0} left={0} />
    <TraitTableau width={props.width} height={1} top={props.height} left={0} />
    <TextTab width={props.width - 40} height={props.height / 3}>
      <Text>{props.text1}</Text>
      <Text>{props.text2}</Text>
    </TextTab>
  </ContentTab>
);
Tab.propTypes = {
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

class PDF extends Component {
  // Function to class the product with the same ID (need because they have the same picture)
  classMoveis = () => {
    // Tab will be return with good class of the product of quotation
    const ReturnProductClass = [];
    // Tab with a save of the ID already class
    const IDAlreadyClass = [];
    // All the product of quotation get by the Redux
    const { products } = this.props;
    // Tab with all the product with same ID
    let productsWithSameID = [];

    // For all products
    products.forEach((product) => {
      // Tcheck if this ID is not already class
      if (IDAlreadyClass.find(
        ID => ID === product.id_product,
      ) === undefined) {
        // Add the ID to the list of ID already class
        console.log('');
        console.log('element with ID product not class:');
        console.log(productsWithSameID);
        console.log(product.id_product);
        IDAlreadyClass.push(product.id_product);
        console.log(IDAlreadyClass);
        // Create tab with all the products with the same ID
        productsWithSameID = products.filter(
          productFilter => product.id_product === productFilter.id_product,
        );
        // Tcheck if the element
        if (productsWithSameID !== []) {
          // Add each product with same ID at the end of the ReturnProductClass
          productsWithSameID.forEach((productWithSameID) => {
            ReturnProductClass.push(productWithSameID);
          });
        } else {
          ReturnProductClass.push(product);
        }
      } else {
        // If element doesn't have another product with the same ID add to the return tab
        console.log('');
        console.log('');
        console.log(`element already with ID product already class : ${product.id_product}`);
      }
      console.log('');
      console.log('at the end for each');
      console.log(ReturnProductClass);
    });
    console.log('');
    console.log('');
    console.log('RETURN VALUE');
    console.log(ReturnProductClass);
    console.log(productsWithSameID);
    return ReturnProductClass;
  }


  AllPage = () => {
    const table = [];
    const productBy4 = [];
    const allProductsClass = this.classMoveis();
    for (let i = 0; i < allProductsClass.length / 4; i += 1) {
      productBy4.push([]);
      let limite = 4;
      if (i >= (allProductsClass.length / 4) - 1) {
        limite = allProductsClass.length - (4 * i);
      }
      for (let j = 0; j < limite; j += 1) {
        productBy4[i].push(allProductsClass[i * 4 + j]);
      }
    }
    for (let i = 0; i < (allProductsClass.length / 4); i += 1) {
      table.push(
        <Page key={i} size="A4" orientation="landscape" style={styles.page}>
          <FondGris />
          <BigTab x={20} y={20} width={802} height={13} text={['foto', 'tipologia', '', 'L x P x A (cm)', 'acabamento', 'preço unitario']} />
          {productBy4[i].map((product, key) => {
            const foundProduct = this.props.allProducts.find(
              oneProduct => oneProduct.id === product.id_product,
            );
            // Check if product.size is defined or not
            let sizeProduct = `${product.size} (cm)`;
            // console.log(foundProduct.acf.layout);
            if (product.size === null) {
              sizeProduct = '';
            }
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
            return <BigTab key={product.id} x={20} y={33 + key * 87} width={802} height={87} src={foundProduct.acf.header.cover.url} text={['', foundProduct.title.rendered, 'Encosto parcial direito', sizeProduct, materialProduct, priceProduct]} />;
          })
          }
          <LogoCircleCustom src={LogCremmeCircle} />
        </Page>,
      );
    }
    return table;
  }

  pagePDF = () => {
    const table = [];
    const TableurlImagePDF = [];
    table.push(
      this.props.products.map((product) => {
        const foundProduct = this.props.allProducts.find(
          // function toFind(oneProduct) { return oneProduct.id === product.id_product; },
          oneProduct => oneProduct.id === product.id_product,
        );
        let URLimagePDF;
        if (foundProduct.acf.pdf !== undefined && foundProduct.acf.pdf !== false) {
          // console.log(foundProduct.acf.pdf);
          foundProduct.acf.pdf.forEach((element) => {
            URLimagePDF = element.image.url;
          });
          if (TableurlImagePDF.indexOf(URLimagePDF) === -1) {
            TableurlImagePDF.push(URLimagePDF);
            if ((URLimagePDF !== undefined)) {
              return (
                <Page key={product.id} size="A4" orientation="landscape" style={styles.page}>
                  <ImageAllPage key={product.id} src={URLimagePDF} />
                </Page>
              );
            }
          }
        }
        return false;
      }),
    );
    return table;
  }

  // Create Document Component
  MyDocument = () => (
    <Document>
      {/* First Page PDF */}
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
      {/* PDF part */}
      {this.pagePDF()}
      {/* Orçamento PDF */}
      { this.AllPage() }
      {/* Last Page PDF */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <TitreContato>contato</TitreContato>
        <TraitHaut />
        <TitreMerci>- Merci -</TitreMerci>
        <ContentContato>
          <Text>hadrien.lelong@cremme.com.br</Text>
          <Text2>pierre.colnet@cremme.com.br</Text2>
          <Text>Rua Mateus Grou, 629</Text>
          <Text2>Pinheiros - São Paulo</Text2>
          <Text>+55 11 2539-3034</Text>
          <Text2>+55 11 2538-3776</Text2>
          <Text>www.cremme.com.br</Text>
        </ContentContato>
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

export default PDF;

PDF.propTypes = {
  allProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// Page 1
const Titre = styled.Text`
  margin-top: 50px;
  margin-left: 35px;
  margin-bottom: 20px;
  font-size: 23px;
  @font-face {
    font-family: Omnes;
  }
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

// Page PDF
const ImageAllPage = styled.Image`
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`;

// Page Tableau
const FondGris = styled.View`
  position: absolute;
  z-index: -1;
  top: 20px;
  left: 20px;
  width: 802px;
  height: 440px
  background-color: #ffffff;
  opacity:
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
  position: absolute;
  z-index: 20;
  top: 10px;
  left: 30px;
  width: 100px;
  height: 67px;
  object-fit: cover;
  object-position: 50%, 50%;
`;

// Last page : Contato
const TitreContato = styled.Text`
  margin-top: 50px;
  margin-left: 135px;
  margin-bottom: 20px;
  font-size: 23px;
  color: #979797;
`;

const TraitHaut = styled.View`
  position: absolute;
  z-index: 15;
  top: 92px;
  left: 35px;
  width: 772px;
  height: 1px;
  background-color: #979797;
`;

const TitreMerci = styled.Text`
  position: absolute;
  z-index: 15px;
  top: 142px;
  text-align: center;
  font-size: 50px;
  color: #979797;
`;
const ContentContato = styled.View`
  position: absolute;
  z-index: 15px;
  top: 222px;
  text-align: center;
  font-size: 15px;
  line-height: 1.5px;
  color: #979797;
`;
const Text2 = styled.Text`
  margin-bottom: 15px;
`;
