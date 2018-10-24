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

import config from './config';
import LogCremmeCircle from '../assets/logo_circle_cremme.png';

import BigTab from './components/bigTab';
import ShowTabNote from './components/tabNote';

Font.register(`${config.dataUrl}/wp-content/themes/rsw-cremme/assets/fonts/Omnes-Regular.ttf`, { family: 'Omnes' });
Font.register(`${config.dataUrl}/wp-content/themes/rsw-cremme/assets/fonts/Omnes-Medium.ttf`, { family: 'OmnesMedium' });
Font.register(`${config.dataUrl}/wp-content/themes/rsw-cremme/assets/fonts/Omnes-Bold.ttf`, { family: 'OmnesBold' });
Font.register(`${config.dataUrl}/wp-content/themes/rsw-cremme/assets/fonts/Omnes-Semibold.ttf`, { family: 'OmnesSemibold' });

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
  semiBold: {
    fontFamily: 'OmnesSemibold',
  },
  text: {
    fontFamily: 'Omnes',
  },
  textRight: {
    textAlign: 'right',
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
    const tabNotas = this.props.notas;
    let tabNotasReturn = [];
    if (tabNotas !== false) {
      tabNotas.forEach(nota => tabNotasReturn.push(nota.nota));
    } else {
      tabNotasReturn = undefined;
    }
    const returnShowNote = (y) => {
      showNote = true;
      yShowNote = y;
    };

    const headerContent = [{
      title_1: 'foto',
      title_2: '',
    }, {
      title_1: 'tipologia',
      title_2: '',
    }, {
      title_1: 'L x P x A (cm)',
      title_2: '',
    }, {
      title_1: 'acabamento',
      title_2: '',
    }, {
      title_1: 'preço unitario',
      title_2: '',
    }, {
      title_1: 'quantidade',
      title_2: '',
    }, {
      title_1: 'valor total',
      title_2: '',
    },
    ];
    // const counterRepeatImage = 0;
    const showSameProductsTogether = false;
    // Create all the page of the orçamento
    for (let i = 0; i < (allProductsClass.length / numberLigne); i += 1) {
      table.push(
        <Page key={i} size="A4" orientation="landscape" style={styles.page}>
          <TraitTableau show="block" width={802} height={1} top={20} left={20} backgroundColor="#979797" />
          <BigTab x={20} y={20} width={802} height={16} content={headerContent} text={['foto', 'tipologia', '', 'L x P x A (cm)', '', 'acabamento', '', 'preço unitario', 'quantidade', 'valor total']} />
          {/* eslint-disable-next-line */}
          {productBy4[i].map((product, key) => {
            const foundProduct = this.props.allProducts.find(
              oneProduct => oneProduct.id === product.id_product,
            );
            // Check if product.size is defined or not
            let sizeProduct = `${product.size}`;
            // console.log(foundProduct.acf.layout);
            if (product.size === null) {
              sizeProduct = '';
            }
            // Case of canapé composé
            if (foundProduct.acf.msquare === true) {
              sizeProduct = `${product.size_x} X ${product.size_y}`;
            }
            // Check if product.material is defined or not
            let materialProduct = product.material;
            if (product.material === null) {
              materialProduct = '';
            }

            // Check if product.price is defined or not
            let priceProduct = `R$                 ${product.price !== null ? product.price.toLocaleString('pt-BR') : 'N/A'}`;
            if (product.price === null) {
              priceProduct = '';
              // priceProduct = foundProduct.acf.variations[0].price;
            }

            // Quantidade
            let quantidade = `${product.quantity}`;
            if (product.quantity === null) {
              quantidade = '';
            }

            // Total price & quantity
            let valorTotal = `R$                 ${product.price !== null && product.quantity !== null ? (product.quantity * product.price).toLocaleString('pt-BR') : 'N/A'}`;
            if (product.quantity === null) {
              valorTotal = '';
            }
            // Value of src image of product
            let srcImageProduct = foundProduct.acf.header.cover.sizes.thumbnail;
            // console.log(typeof foundProduct.acf.packshot === 'object');
            if (typeof foundProduct.acf.packshot === 'object') {
              srcImageProduct = foundProduct.acf.packshot.sizes.thumbnail;
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
                if (showSameProductsTogether) {
                  valueShowImg = 'none';
                  showUnderBorder = 'none';
                }
              }
            }
            // When Image the tab of product with same ID (before) is hide
            if (productBy4[iToUseLess][keyToUseLess] !== undefined) {
              if (product.id_product === productBy4[iToUseLess][keyToUseLess].id_product) {
                if (showSameProductsTogether) {
                  valueShowImg = 'none';
                  srcImageProduct = undefined;
                }
                // counterRepeatImage += 1;
                // console.log(`same ID on next product : ${product.id_product} - ${counterRepeatImage}`);
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
                // })
                // positionYimg = -((87 * numberOfProductWithSameID) / 2 + 10);
              }
            }
            // show the border under the last product
            if (isLastElement) {
              showUnderBorder = 'block';
              // counterRepeatImage = 0;
            }
            // test
            // console.log(`${87 * numberLigne - keyToUsePlus * 87} > ${20 + 12.8 * tabNotasReturn.length}`);
            // console.log((87 * numberLigne - keyToUsePlus * 87) > (20 + 12.8 * tabNotasReturn.length));
            // Is on the last page
            if (((i + 1) >= (allProductsClass.length / numberLigne))
            && (productBy4[i].length === key + 1) && (tabNotasReturn !== undefined)) {
              // console.log('is on the last page');
              // Have enouth place to show the note
              if ((87 * numberLigne - keyToUsePlus * 87) > (20 + 12.8 * tabNotasReturn.length)) {
                // console.log('SHOW NOOOOOOOOOOOOOOOOOOOOOOOTE');
                returnShowNote(keyToUsePlus * 87 + 20 + 13);
              }
            }
            const rowContent = [{
              title_1: '',
              title_2: '',
            }, {
              title_1: foundProduct.title.rendered,
              title_2: '',
            }, {
              title_1: '',
              title_2: sizeProduct,
            }, {
              title_1: '',
              title_2: materialProduct,
            }, {
              title_1: '',
              title_2: priceProduct,
            }, {
              title_1: '',
              title_2: quantidade,
            }, {
              title_1: '',
              title_2: valorTotal,
            },
            ];
            // The line of one product in the orçamento
            return <BigTab key={product.id} x={20} y={33 + key * 87} width={802} height={87} positionYimg={positionYimg} showUnderBorder={showUnderBorder} showImg={valueShowImg} src={srcImageProduct} content={rowContent} text={['', foundProduct.title.rendered, '', '', sizeProduct, '', materialProduct, priceProduct, quantidade, valorTotal]} />;
          })
          }
          {/* Adding note at the end of the orçamento (if have enouth place) */
            (showNote && (tabNotasReturn !== undefined))
            && <ShowTabNote style={styles.text} y={yShowNote} tabNote={tabNotasReturn} />
          }
          <LogoCircleCustom src={LogCremmeCircle} />
        </Page>,
      );
    }
    // If the note doesn't have enouth place to be show on the page with last product : Create a new page with the note
    if (!showNote && (tabNotasReturn !== undefined)) {
      table.push(
        <Page key={-1} size="A4" orientation="landscape" style={styles.page}>
          <ShowTabNote style={styles.text} y={20} tabNote={tabNotasReturn} />
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
        <Titre style={styles.semiBold}>orçamento</Titre>
        <ImageCustom src={this.props.infoContact.foto.url} />
        <Rectangle />
        <Trait />
        <Adresse style={styles.medium}>
          <Text>{this.props.infoContact.adresse1}</Text>
          <Text>{this.props.infoContact.adresse2}</Text>
        </Adresse>
        <LogoCircleCustom src={LogCremmeCircle} />
        <Contact style={styles.medium}>
          <Text style={styles.textRight}>{this.props.infoContact.web_site}</Text>
          <Text style={styles.textRight}>{this.props.infoContact.mail_contato_cremme}</Text>
          <Text style={styles.textRight}>{this.props.infoContact.telefone_fixo}</Text>
        </Contact>
      </Page>
      {/* PDF part */}
      {this.pagePDF()}
      {/* Orçamento PDF */}
      {this.AllPage()}
      {/* Last Page Contato PDF */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <TitreSup style={styles.semiBold}> {'>'} </TitreSup>
        <TitreContato style={styles.semiBold}>contato</TitreContato>
        <TraitHaut />
        <TitreMerci style={styles.semiBold}>- merci -</TitreMerci>
        <ContentContato style={styles.medium}>
          <Text>{this.props.infoContact.mail_1}</Text>
          <Text2>{this.props.infoContact.mail_2}</Text2>
          <Text>{this.props.infoContact.adresse1}</Text>
          <Text2>{this.props.infoContact.adresse2}</Text2>
          <Text>{this.props.infoContact.telefone_1}</Text>
          <Text2>{this.props.infoContact.telefone_2}</Text2>
          <Text>{this.props.infoContact.web_site}</Text>
        </ContentContato>
        <Trait />
        <Adresse style={styles.medium}>
          <Text>{this.props.infoContact.adresse1}</Text>
          <Text>{this.props.infoContact.adresse2}</Text>
        </Adresse>
        <LogoCircleCustom src={LogCremmeCircle} />
        <Contact style={styles.medium}>
          <Text style={styles.textRight}>{this.props.infoContact.web_site}</Text>
          <Text style={styles.textRight}>{this.props.infoContact.mail_contato_cremme}</Text>
          <Text style={styles.textRight}>{this.props.infoContact.telefone_fixo}</Text>
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
  notas: PropTypes.arrayOf(PropTypes.object).isRequired,
  infoContact: PropTypes.shape({
    mail_1: PropTypes.string,
    mail_2: PropTypes.string,
    adresse1: PropTypes.string,
    adresse2: PropTypes.string,
    telefone_1: PropTypes.string,
    telefone_2: PropTypes.string,
    web_site: PropTypes.string,
    mail_contato_cremme: PropTypes.string,
    telefone_fixo: PropTypes.string,
    foto: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

// ----------------- Page 1 of the PDF -----------------
const Titre = styled.Text`
  margin-top: 90px;
  margin-left: 50px;
  margin-bottom: 20px;
  font-size: 30px;
  color: #979797;
`;

const ImageCustom = styled.Image`
  position: absolute;
  z-index: 5;
  top: 142px;
  left: 0;
  object-fit: cover;
  object-position: 50% 50%;
  width: 842px;
`;

const Rectangle = styled.View`
  position: absolute;
  z-index: 10;
  top: 454px;
  left: 0px
  width: 842px;
  height: 73px;
  background-color: #ffffff;
`;

const Trait = styled.View`
  position: absolute;
  z-index: 15;
  bottom: 88px;
  left: 35px;
  width: 772px;
  height: 1px;
  background-color: #979797;
`;

const Adresse = styled.View`
  position: absolute;
  z-index: 15px;
  top: 515px;
  left: 35px;
  font-size: 10px;
  
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
  top: 515px;
  right: 35px;
  font-size: 10px;
  
  color: #979797;
  width: 100%;
`;
const TraitTableau = styled.View`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  z-index: 15;
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
  display: ${props => props.show};
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

// ----------------- Last page : Contato -----------------
const TitreContato = styled.Text`
  margin-top: 60px;
  margin-left: 160px;
  margin-bottom: 20px;
  font-size: 30px;
  color: #979797;
`;
const TitreSup = styled.Text`
  position: absolute;
  top: 42px;
  left: 253px;
  font-size: 30px;
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
  top: 150px;
  text-align: center;
  font-size: 60px;
  color: #636463;
`;
const ContentContato = styled.View`
  position: absolute;
  z-index: 15px;
  top: 242px;
  text-align: center;
  font-size: 14px;
  line-height: 1.1px;
  color: #979797;
`;
const Text2 = styled.Text`
  margin-bottom: 15px;
`;
