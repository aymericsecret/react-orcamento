import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@react-pdf/styled-components';
import {
  Page,
  Document,
  Text,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

import LogCremmeCircle from '../assets/logo_circle_cremme.png';

Font.register('http://cremme.com.br/wp-content/themes/rsw-cremme/assets/fonts/Omnes-Regular.ttf', { family: 'Omnes' });
Font.register('http://cremme.com.br/wp-content/themes/rsw-cremme/assets/fonts/Omnes-Medium.ttf', { family: 'OmnesMedium' });
Font.register('http://cremme.com.br/wp-content/themes/rsw-cremme/assets/fonts/Omnes-Bold.ttf', { family: 'OmnesBold' });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  h3: {
    fontFamily: 'OmnesBold',
    color: '#979797',
  },
  text: {
    fontFamily: 'Omnes',
    color: '#979797',
  },
});


// Line of tab with 5 columns
const BigTab = props => (
  <ContentTab x={props.x} y={props.y} width={0} height={0}>
    <Tab showUnderBorder={props.showUnderBorder} show={props.showImg} x={0} y={0} width={162.5} height={props.height} text1={props.text[0]} text2="" />
    <Tab showUnderBorder="block" show="block" x={162.5} y={0} width={159.25} height={props.height} text1={props.text[1]} text2={props.text[2]} />
    <Tab showUnderBorder="block" show="block" x={322.25} y={0} width={160} height={props.height} text1={props.text[3]} text2="" />
    <Tab showUnderBorder="block" show="block" x={482.25} y={0} width={214} height={props.height} text1={props.text[4]} text2="" />
    <Tab showUnderBorder="block" show="block" x={696.25} y={0} width={105} height={props.height} text1={props.text[5]} text2="" />
    {(props.src !== undefined)
      && <ImageOrcaCustom top={props.positionYimg} y={props.y} src={props.src} />
    }
  </ContentTab>
);
BigTab.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  src: PropTypes.string,
  showImg: PropTypes.string,
  showUnderBorder: PropTypes.string,
  positionYimg: PropTypes.string,
};
BigTab.defaultProps = {
  src: undefined,
  showImg: undefined,
  showUnderBorder: undefined,
  positionYimg: undefined,
};

// Tab with border and text
const Tab = props => (
  <ContentTab x={props.x} y={props.y} width={props.width} height={props.height}>
    <TraitTableau show="block" width={1} height={props.height} top={0} left={0} backgroundColor="#979797" />
    <TraitTableau show="block" width={1} height={props.height} top={0} left={props.width} backgroundColor="#979797" />
    <TraitTableau show={props.show} width={props.width} height={1} top={0} left={0} backgroundColor="#979797" />
    <TraitTableau show={props.showUnderBorder} width={props.width} height={1} top={props.height} left={0} backgroundColor="#979797" />
    <TextTab width={props.width - 40} height={props.height / 3}>
      <Text style={styles.h3}>{props.text1}</Text>
      <Text style={styles.text}>{props.text2}</Text>
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
  show: PropTypes.string,
  showUnderBorder: PropTypes.string,
};
Tab.defaultProps = {
  show: undefined,
  showUnderBorder: undefined,
};


class PDF extends Component {
  // constructor(props) {
  //   super(props);
  // }

  // componentWillMount() {
  // }

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
        // console.log('');
        // console.log('element with ID product not class:');
        // console.log(productsWithSameID);
        // console.log(product.id_product);
        // Add the ID to the list of ID already class
        IDAlreadyClass.push(product.id_product);
        // console.log(IDAlreadyClass);
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
        // console.log('');
        // console.log('');
        // console.log(`element already with ID product already class : ${product.id_product}`);
      }
      // console.log('');
      // console.log('at the end for each');
      // console.log(ReturnProductClass);
    });
    // console.log('');
    // console.log('');
    // console.log('RETURN VALUE');
    // console.log(ReturnProductClass);
    // console.log(productsWithSameID);
    return ReturnProductClass;
  }

  // Component that create the tab of the orçamento
  AllPage = () => {
    // Declaration of the tab with all the Page of the orçamento that will return by the component
    const table = [];
    // Declaration of the tab with all the products class 4 by 4 (because 4 products by page)
    const productBy4 = [];
    // Use product class my ID :
    const allProductsClass = this.classMoveis();
    // Use product withou be class by ID : USE UNDER CONST \/\/\/
    // const allProductsClass = this.props.products;
    // For of the number of page in the orçamento put the products 4 by 4 in productBy4
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
    // Create all the page of the orçamento
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
            // Value of src image of product
            let srcImageProduct = foundProduct.acf.header.cover.url;
            // Var if the img of product need to me show
            let valueShowImg = 'block';
            // Var if the under border need to me show (exemple not between same product)
            let showUnderBorder = 'block';
            // Position TOP of the Img in the tab (border <10px> IMG(height:67px) <10px> border) total height:87px
            const positionYimg = '10px';
            // Check if the next product is not the same
            let keyToUsePlus = key + 1;
            let iToUsePlus = i;
            // if product is at the end of a page go to the begenning of the next page
            if (key === 3 && allProductsClass.length > i) {
              keyToUsePlus = 0;
              iToUsePlus = i + 1;
            }
            // Check if the last product is not the same
            let keyToUseLess = key - 1;
            let iToUseLess = i;
            // if product is at the beginning of a page go to the end of the last page
            if (key === 0 && i > 0) {
              keyToUseLess = 3;
              iToUseLess = i - 1;
            }
            // Test if is last element
            let isLastElement = false;
            if ((i <= (allProductsClass.length / 4)) && (productBy4[i].length === key + 1)) {
              isLastElement = true;
            }
            // When Image of product with same ID (after) is show
            // and border under is hide
            if (productBy4[iToUsePlus][keyToUsePlus] !== undefined) {
              if (product.id_product === productBy4[iToUsePlus][keyToUsePlus].id_product) {
                // console.log(`same ID on next product : ${product.id_product}`);
                valueShowImg = 'none';
                showUnderBorder = 'none';
              }
            }
            // When Image the tab of product with same ID (before) is hide
            if (productBy4[iToUseLess][keyToUseLess] !== undefined) {
              if (product.id_product === productBy4[iToUseLess][keyToUseLess].id_product) {
                // console.log(`same ID on next product : ${product.id_product}`);
                valueShowImg = 'none';
                srcImageProduct = undefined;
                // TODO: Trying to put img at the middle of the bloc of products with same ID
                // let iToCountNumberOfProductWithSameID = iToUseLess;
                // let keyToCountNumberOfProductWithSameID = keyToUseLess;
                // let numberOfProductWithSameID = 0;
                // // while (productBy4[iToCountNumberOfProductWithSameID][keyToCountNumberOfProductWithSameID] !== undefined) {
                // while (keyToCountNumberOfProductWithSameID > 1) {
                //   console.log(`id : ${iToCountNumberOfProductWithSameID} & key : ${keyToCountNumberOfProductWithSameID}`);
                //   numberOfProductWithSameID += 1;
                //   keyToCountNumberOfProductWithSameID -= 1;
                //   if (keyToCountNumberOfProductWithSameID === 0 && iToCountNumberOfProductWithSameID > 0) {
                //     keyToCountNumberOfProductWithSameID = 3;
                //     iToCountNumberOfProductWithSameID -= 1;
                //   }
                // }
                // positionYimg = -((87 * numberOfProductWithSameID) / 2 + 10);
              }
            }
            // show the border under the last product
            if (isLastElement) {
              showUnderBorder = 'block';
            }
            // The line of one product in the orçamento
            return <BigTab key={product.id} x={20} y={33 + key * 87} width={802} height={87} positionYimg={positionYimg} showUnderBorder={showUnderBorder} showImg={valueShowImg} src={srcImageProduct} text={['', foundProduct.title.rendered, 'Encosto parcial direito', sizeProduct, materialProduct, priceProduct]} />;
          })
          }
          <LogoCircleCustom src={LogCremmeCircle} />
        </Page>,
      );
    }
    return table;
  }

  // Add the PDF page that are defined in the back-office
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

  // Create Document Component (the PDF)
  MyDocument = () => (
    <Document shallow onRender={this.props.render}>
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
    // console.log(Font.getFont('OmnesMedium'));
    // console.log(Font.load('OmnesMedium'));
    return (
      <div style={{ display: 'none' }}>
        {this.MyDocument()}

      </div>
    );
  }
}

export default PDF;

PDF.propTypes = {
  allProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  render: PropTypes.func.isRequired,
};

// ----------------- Page 1 of the PDF -----------------
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

// ----------------- Page PDF of the back office  -----------------
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

// ----------------- Page Tableau of the orçamento -----------------
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
  z-index: 15;
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
  display: ${props => props.show}
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
  top: ${props => props.top};
  left: 30px;
  width: 100px;
  height: 67px;
  object-fit: cover;
  object-position: 50%, 50%;
`;

// ----------------- Last page : Contato -----------------
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
