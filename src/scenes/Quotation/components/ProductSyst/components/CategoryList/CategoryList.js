import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Ratio from 'react-ratio';
import ContentLoader from 'react-content-loader';
import LinkCustom from '../../../../../../components/LinkCustom';
import defaultPicture from '../../../../../../assets/defaultPicture.jpg';
import config from '../../../../../../utils/config';

const { back } = config.icons;

const CATEGORY_LIST_ADMIN = ['nao-publicado'];

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.classActiveOrNot = 'notActive';
  }

  state = {
    active: this.props.mainCategory,
    imageStatus: 'loading',
    // searchOpened: false,
  }


  selectMainCategory = (index) => {
    setTimeout(() => {
      const { setMainCategory } = this.props;
      setMainCategory(index);
      if (this.state.active !== this.props.mainCategory) {
        this.setState({
          imageStatus: 'loading',
        });
      }
      this.setState({
        active: index,
      });
    }, 0);
  }

  selectSubCategory = (index) => {
    setTimeout(() => {
      const { setSubCategory } = this.props;
      setSubCategory(index);
    }, 0);
  }

  handleImageLoaded = () => {
    this.setState({ imageStatus: 'loaded' });
  }

  handleImageErrored = () => {
    this.setState({ imageStatus: 'failed to load' });
  }

  render() {
    const {
      categoryList,
      mainCategory,
      showSubCategory,
      subCategory,
    } = this.props;
    let objetSubCategory = { name: 'Name not defined' };

    if (categoryList.children !== undefined) {
      objetSubCategory = categoryList.children[mainCategory].children.find(
        children => children.term_id === subCategory);
    } else {
      return <h1>Category not loaded</h1>;
    }
    const MyLoaderImg = () => (
      <ContentLoader height={300}>
        <rect x="0" y="0" rx="5" ry="5" width="400" height="800" />
      </ContentLoader>
    );

    return (
      <ProductsBlock>
        <HeaderCategories>
          <Categories>
            { (categoryList.children !== undefined)
            && categoryList.children.map((categorie, index) => (
              (!(this.props.sessionPermission === 0 && CATEGORY_LIST_ADMIN.indexOf(categorie.slug) >= 0)
                && (
                <LinkCustom
                  key={categorie.term_id}
                  eventClick={() => this.selectMainCategory(index)}
                >
                  <h3 className={this.state.active === index ? 'active' : 'noActive'}>
                    <div className={this.state.active === index ? 'categoryName' : ''}>
                      {categorie.name}
                    </div>
                  </h3>
                </LinkCustom>
                )
              )
            ),
            )}
          </Categories>
        </HeaderCategories>
        {!showSubCategory
          ? (
            <SubCategories>
              { (categoryList.children !== undefined)
                && categoryList.children[mainCategory].children.map(sousCategorie => (
                  <SubCategory key={sousCategorie.term_id}>
                    <LinkCustom eventClick={() => this.selectSubCategory(sousCategorie.term_id)}>
                      <RatioCustom ratio={16 / 9}>
                        <img
                          src={sousCategorie.cover !== false ? sousCategorie.cover.sizes.thumbnail : defaultPicture}
                          className="photoCategory"
                          alt={sousCategorie.cover !== false ? sousCategorie.cover.alt : ''}
                          onLoad={this.handleImageLoaded}
                          onError={this.handleImageErrored}
                        />
                        <Loader>
                          {this.state.imageStatus === 'loading' && (
                            MyLoaderImg()
                          )}
                        </Loader>
                      </RatioCustom>
                      <h4>
                        {sousCategorie.name}
                      </h4>
                    </LinkCustom>
                  </SubCategory>
                ))}
            </SubCategories>)
          : <div style={{ display: 'flex' }}><LogoRetour onClick={() => this.selectMainCategory(mainCategory)} src={back} alt="" /><h3 className="sub_category_title">{objetSubCategory.name}</h3></div>
        }
      </ProductsBlock>
    );
  }
}

export default CategoryList;

CategoryList.propTypes = {
  sessionPermission: PropTypes.number.isRequired,
  mainCategory: PropTypes.number.isRequired,
  categoryList: PropTypes.shape({
    term_id: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  setMainCategory: PropTypes.func.isRequired,
  setSubCategory: PropTypes.func.isRequired,
  subCategory: PropTypes.number.isRequired,
  showSubCategory: PropTypes.bool.isRequired,
};
const ProductsBlock = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 50px;
  padding: 0 20px 0 20px;
  h3.sub_category_title {
    font-family: ${config.fonts.medium};
  }
`;

const HeaderCategories = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 40px;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 1024px) {
    flex-direction: row;

    width: calc(100% - 80px);
    margin: 0 40px;
  }
  justify-content: space-around;
  text-align: center;
  button {
    border: none;
    padding: 0;
    background: linear-gradient(#000000, #000000);
    background-position: 0px 100%;
    background-size: 0 1px;
    background-repeat: no-repeat;
    margin-bottom: 10px;
    @media only screen and (min-width: 1024px) {
      margin-bottom: 0;
    }
    &:hover {
      cursor: pointer;
    }
  }
  h3 {
    font-family: ${config.fonts.light};
    background: linear-gradient(#000000, #000000);
    background-position: 0px 100%;
    background-size: 0 1px;
    background-repeat: no-repeat;
    transition: background-size 0.3s ease-out;
    margin: 0;
    display: inline-block;
    margin-right: 10px;
    font-size: 25px;
    line-height: 28px;
    letter-spacing: 1px;
    letter-spacing: 0;
    text-transform: lowercase;
    &:hover {
      background-size: 100% 1px;
      cursor: pointer;
    }
  }
  h3.active {
    font-family: ${config.fonts.medium};
  }
  .categoryName{
    
  }
`;

const RatioCustom = styled(Ratio)`
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  margin-bottom: 15px;
  overflow: hidden;
`;
const SubCategories = styled.div`
  columns: 1;
  @media only screen and (min-width: 768px) {
    columns: 2;
  }
  -webkit-column-gap: 50px; /* Chrome, Safari, Opera */
  -moz-column-gap: 50px; /* Firefox */
  column-gap: 50px;
  button {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0;
    background-color: #ffffff;
    &:hover {
      cursor: pointer;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    transition: transform 1.5s ease-in-out;
  }
  }
  img:hover {
    -moz-transform: scale(1.05);
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }
  h4 {
    font-family: ${config.fonts.light};
    font-size: 17px;
    line-height: 23px;
    letter-spacing: 0.7px;
    margin: 0;
    @media only screen and (min-width: 1024px) {
      font-size: 22px;
    }
  }
`;
const SubCategory = styled.div`
  margin-bottom: 30px;
`;
const Loader = styled.div`
  position: absolute;
  z-index: 300;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const LogoRetour = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 5px;
  cursor: pointer;
`;
