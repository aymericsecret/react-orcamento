import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Ratio from 'react-ratio';
import ContentLoader from 'react-content-loader';
import LinkCustom from '../../../../../../components/LinkCustom';
import iconSearch from '../../../../../../assets/icons_search_dark.png';
import '../../../../../../font.css';

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.classActiveOrNot = 'notActive';
  }

  state = {
    active: this.props.mainCategory,
    imageStatus: 'loading',
    searchOpened: false,
  }

  onClickSearch = () => {
    this.props.toggleSearch();
    // const lastState = this.state.searchOpened;
    // this.setState({ searchOpened: !lastState });
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
          {/* <HeaderSearch className={this.state.searchOpened ? 'opened' : ''}>
            <SearchBar onClickCallback={this.onClickSearch} />
          </HeaderSearch> */}
          <IconSearchDiv onClick={this.onClickSearch}>
            <img
              src={iconSearch}
              className="icons_search openingGridMenu"
              alt=""
            />
          </IconSearchDiv>

          <Categories>
            { (categoryList.children !== undefined)
            && categoryList.children.map((categorie, index) => (
              (this.state.active === index)
                ? (
                  <LinkCustom
                    key={categorie.term_id}
                    eventClick={() => this.selectMainCategory(index)}
                  >
                    <h3 className="active"><div className="categoryName">{categorie.name}</div></h3>
                  </LinkCustom>
                ) : (
                  <LinkCustom
                    key={categorie.term_id}
                    eventClick={() => this.selectMainCategory(index)}
                  >
                    <h3 className="notActive">{categorie.name}</h3>
                  </LinkCustom>
                )
            ))
            }
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
                          src={sousCategorie.cover.sizes.thumbnail}
                          className="photoCategory"
                          alt={sousCategorie.cover.alt}
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
          : <h3>{objetSubCategory.name}</h3>
        }
      </ProductsBlock>
    );
  }
}

export default CategoryList;

CategoryList.propTypes = {
  mainCategory: PropTypes.number.isRequired,
  categoryList: PropTypes.shape({
    term_id: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  setMainCategory: PropTypes.func.isRequired,
  setSubCategory: PropTypes.func.isRequired,
  subCategory: PropTypes.number.isRequired,
  showSubCategory: PropTypes.bool.isRequired,
  toggleSearch: PropTypes.func.isRequired,
};
const ProductsBlock = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 50px;
  padding: 60px 20px 0 20px;
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
    &:hover {
      cursor: pointer;
    }
  }
  h3 {
    font-family: "OmnesLight";
    background: linear-gradient(#000000, #000000);
    background-position: 0px 100%;
    background-size: 0 1px;
    background-repeat: no-repeat;
    transition: background-size 0.3s ease-out;
    margin: 0;
    padding-right: 10px;
    font-size: 25px;
    line-height: 28px;
    letter-spacing: 1px;
    color: #3c3c3c;
    letter-spacing: 0;
    text-transform: lowercase;
    &:hover {
      background-size: 100% 1px;
      cursor: pointer;
    }
  }
  h3.active {
    font-family: "OmnesMedium";
  }
  .categoryName{
    
  }
`;


const IconSearchDiv = styled.div`
  position: absolute;
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: white;
  top: 0;
  right: 0;
  img {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

// const IconSearchDiv = styled.div`
//   float: right;
//   margin-right: 10px;
// `;
const HeaderSearch = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 0%;
  height: 30px;
  transition: width .3s ease-out;
  &.opened {
    width: 100%;
  }
`;
const HeaderCategories = styled.div`
  position: absolute;
  top: 0;
  margin: 0;
  width: calc(100% - 40px);
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
    font-family: OmnesLight;
    font-size: 17px;
    line-height: 23px;
    letter-spacing: 0.7px;
    color: #3c3c3c;
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
