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

import BigTab from './components/bigTab';
import ShowTabNote from './components/tabNote';

Font.register('http://cremme.com.br/wp-content/themes/rsw-cremme/assets/fonts/Omnes-Regular.ttf', { family: 'Omnes' });
Font.register('http://cremme.com.br/wp-content/themes/rsw-cremme/assets/fonts/Omnes-Medium.ttf', { family: 'OmnesMedium' });
Font.register('http://cremme.com.br/wp-content/themes/rsw-cremme/assets/fonts/Omnes-Bold.ttf', { family: 'OmnesBold' });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  bold: {
    fontFamily: 'OmnesBold',
  },
  medium: {
    fontFamily: 'OmnesMedium',
  },
});

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
      }
    });
    return ReturnProductClass;
  }

  // Component that create the tab of the orçamento
  AllPage = () => {
    // Choose the number of line
    const numberLigne = 5;
    // Declaration of the tab with all the Page of the orçamento that will return by the component
    const table = [];
    // Declaration of the tab with all the products class 4 by 4 (because 4 products by page)
    const productBy4 = [];
    // Use product class my ID :
    const allProductsClass = this.classMoveis();
    // Use product withou be class by ID : USE UNDER CONST \/\/\/
    // const allProductsClass = this.props.products;
    // For of the number of page in the orçamento put the products 4 by 4 in productBy4
    for (let i = 0; i < allProductsClass.length / numberLigne; i += 1) {
      productBy4.push([]);
      let limite = numberLigne;
      if (i >= (allProductsClass.length / numberLigne) - 1) {
        limite = allProductsClass.length - (numberLigne * i);
      }
      for (let j = 0; j < limite; j += 1) {
        productBy4[i].push(allProductsClass[i * numberLigne + j]);
      }
    }
    // Note at the end of the orçamento
    let showNote = false;
    let yShowNote = 0;
    const tabNotasReturn = this.props.notas;
    const returnShowNote = (y) => {
      showNote = true;
      yShowNote = y;
    };
    // Create all the page of the orçamento
    for (let i = 0; i < (allProductsClass.length / numberLigne); i += 1) {
      table.push(
        <Page key={i} size="A4" orientation="landscape" style={styles.page}>
          <FondGris />
          <BigTab x={20} y={20} width={802} height={13} text={['foto', 'tipologia', '', 'L x P x A (cm)', 'acabamento', 'preço unitario', '']} />
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
            // Case of canapé composé
            if (foundProduct.acf.msquare === true) {
              sizeProduct = `${product.size_x} X ${product.size_y} (cm)`;
            }
            // Check if product.material is defined or not
            let materialProduct = product.material;
            if (product.material === null) {
              materialProduct = '';
            }
            // Check if product.price is defined or not
            let priceProduct = `R$                 ${product.price}`;
            if (product.price === null) {
              priceProduct = '';
              // priceProduct = foundProduct.acf.variations[0].price;
            }
            // Total price & quantity
            const precoTotal = product.quantity * product.price;
            let showPrecoPrice = `Quantity : ${product.quantity}\nPreço total : ${precoTotal}`;
            if (product.quantity === null || product.quantity <= 1) {
              showPrecoPrice = '';
            }
            // Value of src image of product
            let srcImageProduct = foundProduct.acf.header.cover.url;
            // console.log(typeof foundProduct.acf.packshot === 'object');
            if (typeof foundProduct.acf.packshot === 'object') {
              srcImageProduct = foundProduct.acf.packshot.url;
              // console.log(foundProduct.acf.packshot);
            }
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
            if (key === (numberLigne - 1) && (i + 1) < (allProductsClass.length / numberLigne)) {
              keyToUsePlus = 0;
              iToUsePlus = i + 1;
            }
            // Check if the last product is not the same
            let keyToUseLess = key - 1;
            let iToUseLess = i;
            // if product is at the beginning of a page go to the end of the last page
            if (key === 0 && i > 0) {
              keyToUseLess = (numberLigne - 1);
              iToUseLess = i - 1;
            }
            // Test if is last element
            let isLastElement = false;
            if ((i <= (allProductsClass.length / numberLigne)) && (productBy4[i].length === key + 1)) {
              isLastElement = true;
            }
            // When Image of product with same ID (after) is show
            // and border under is hide
            // console.log(productBy4[i][key]);
            // console.log(`i : ${iToUsePlus} & key : ${keyToUsePlus}`);
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
            // test
            // console.log(`${87 * numberLigne - keyToUsePlus * 87} > ${20 + 12.8 * tabNotasReturn.length}`);
            // console.log((87 * numberLigne - keyToUsePlus * 87) > (20 + 12.8 * tabNotasReturn.length));
            // Is on the last page
            if (((i + 1) >= (allProductsClass.length / numberLigne)) && (productBy4[i].length === key + 1)) {
              // console.log('is on the last page');
              // Have enouth place to show the note
              if ((87 * numberLigne - keyToUsePlus * 87) > (20 + 12.8 * tabNotasReturn.length)) {
                // console.log('SHOW NOOOOOOOOOOOOOOOOOOOOOOOTE');
                returnShowNote(keyToUsePlus * 87 + 20 + 13);
              }
            }
            // The line of one product in the orçamento
            return <BigTab key={product.id} x={20} y={33 + key * 87} width={802} height={87} positionYimg={positionYimg} showUnderBorder={showUnderBorder} showImg={valueShowImg} src={srcImageProduct} text={['', foundProduct.title.rendered, 'Encosto parcial direito', sizeProduct, materialProduct, priceProduct, showPrecoPrice]} />;
          })
          }
          {/* Adding note at the end of the orçamento (if have enouth place) */
          showNote
            && <ShowTabNote y={yShowNote} tabNote={tabNotasReturn} />
          }
          <LogoCircleCustom src={LogCremmeCircle} />
        </Page>,
      );
    }
    // If the note doesn't have enouth place to be show on the page with last product : Create a new page with the note
    if (!showNote) {
      table.push(
        <Page key={-1} size="A4" orientation="landscape" style={styles.page}>
          <ShowTabNote y={20} tabNote={tabNotasReturn} />
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
        <Titre style={styles.bold}>orçamento</Titre>
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
      {this.AllPage()}
      {/* Last Page Contato PDF */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <TitreSup style={styles.medium}> > </TitreSup>
        <TitreContato style={styles.medium}>contato</TitreContato>
        <TraitHaut />
        <TitreMerci style={styles.medium}>- merci -</TitreMerci>
        <ContentContato style={styles.medium}>
          <Text>hadrien.lelong@cremme.com.br</Text>
          <Text2>pierre.colnet@cremme.com.br</Text2>
          <Text>Alameda Gabriel Monteiro da Silva, 384</Text>
          <Text2>Jardim Paulistano - São Paulo</Text2>
          <Text>+55 11 2539-3034</Text>
          <Text2>+55 11 2538-3776</Text2>
          <Text>www.cremme.com.br</Text>
        </ContentContato>
        <Trait />
        <Adresse style={styles.text}>
          <Text>Alameda Gabriel Monteiro da Silva,</Text>
          <Text>384</Text>
        </Adresse>
        <LogoCircleCustom src={LogCremmeCircle} />
        <Contact style={styles.text}>
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
  notas: PropTypes.arrayOf(PropTypes.string).isRequired,
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
  fontSize: 8px;
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
  fontSize: 8px;
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
// ----------------- Last page : Contato -----------------
const TitreContato = styled.Text`
  margin-top: 65px;
  margin-left: 160px;
  margin-bottom: 20px;
  font-size: 23px;
  color: #979797;
`;
const TitreSup = styled.Text`
  position: absolute;
  top: 35px;
  left: 232px;
  font-size: 35px;
  color: #2cb3df;
`;

const TraitHaut = styled.View`
  position: absolute;
  z-index: 15;
  top: 130px;
  left: 35px;
  width: 772px;
  height: 1px;
  background-color: #979797;
`;

const TitreMerci = styled.Text`
  position: absolute;
  z-index: 15px;
  top: 190px;
  text-align: center;
  font-size: 60px;
  color: #636463;
`;
const ContentContato = styled.View`
  position: absolute;
  z-index: 15px;
  top: 280px;
  text-align: center;
  font-size: 14px;
  line-height: 1.1px;
  color: #979797;
`;
const Text2 = styled.Text`
  margin-bottom: 15px;
`;
