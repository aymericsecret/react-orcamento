import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Ratio from 'react-ratio';
import LinkCustom from '../../../../../../components/LinkCustom';
import iconSearch from '../../../../../../assets/icons_search_dark.png';
import '../../../../../../font.css';

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.classActiveOrNot = 'notActive';
  }

  state = {
    active: 0,
  }

  componentDidMount = () => {
    const {
      getCategoryList, categoryIsLoaded, categoryLoadedAt,
    } = this.props;
    const oneHour = 60 * 60 * 1000;
    console.log(new Date() - new Date(categoryLoadedAt));
    if (!categoryIsLoaded || new Date() - new Date(categoryLoadedAt) > oneHour) {
      getCategoryList();
    }
  }

  selectMainCategory = (index) => {
    const { setMainCategory } = this.props;
    setMainCategory(index);
    this.setState({ active: index });
  }

  selectSubCategory = (index) => {
    const { setSubCategory } = this.props;
    setSubCategory(index);
  }

  render() {
    const {
      categoryList, categoryIsLoaded, mainCategory, showSubCategory, subCategory,
    } = this.props;
    let objetSubCategory = { name: 'Name not defined' };
    if (categoryList.children !== undefined) {
      objetSubCategory = categoryList.children[mainCategory].children.find(
        children => children.term_id === subCategory);
    }
    if (!categoryIsLoaded) return <h1>Category not loaded</h1>;
    return (
      <ProductsBlock>
        <HeaderCategories>
          <IconSearchDiv>
            <img
              src={iconSearch}
              className="icons_search openingGridMenu"
              alt=""
            />
          </IconSearchDiv>
          <Categories>
            {categoryList.children.map((categorie, index) => (
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
            ))}
          </Categories>
        </HeaderCategories>
        {showSubCategory
          ? (
            <SubCategories>
              {categoryList.children[mainCategory].children.map(sousCategorie => (
                <SubCategory key={sousCategorie.term_id}>
                  <LinkCustom eventClick={() => this.selectSubCategory(sousCategorie.term_id)}>
                    <RatioCustom ratio={16 / 9}>
                      <img
                        src={sousCategorie.cover.url}
                        className="photoCategory"
                        alt=""
                      />
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
  getCategoryList: PropTypes.func.isRequired,
  categoryIsLoaded: PropTypes.bool.isRequired,
  categoryLoadedAt: PropTypes.string.isRequired,
  subCategory: PropTypes.number.isRequired,
  showSubCategory: PropTypes.bool.isRequired,
};
CategoryList.defaultProps = {
};
const ProductsBlock = styled.div`
  width: 100%;
  margin-bottom: 50px;
  padding: 0 20px;
`;
const Categories = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 1024px) {
    flex-direction: row;
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
  float: right;
  margin-right: 10px;
`;
const HeaderCategories = styled.div`
  margin-bottom: 40px;
`;
const RatioCustom = styled(Ratio)`
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
