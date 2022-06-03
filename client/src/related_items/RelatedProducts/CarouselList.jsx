import React, { useState, useEffect, useContext } from 'react';
import { ProdPageContext } from '../../product_page.jsx';
import { RelatedCarouselContext } from './ProductDetails.jsx';
import StarRating from '../../shared_components/StarRating.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { CarouselContainer, CardStyle, ImageWrapper,
          ImageStyle, DetailsWrapper, InfoStyle, CategoryStyle,
          PriceStyle, Arrow, ArrowTransparent, RelatedButtonStyle,
          SalesPrice, OriginalPrice} from '../Styled/Carousel.Styled.js';

const RelatedCarousel = () => {
  const {prod_id, setProd, prod_name, setShowModal, setModalBodyContent, setModalHeaderContent} = useContext(ProdPageContext);
  const {productDetails} = useContext(RelatedCarouselContext);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const display = productDetails.slice(currentImageIdx, (currentImageIdx + 4));
  const maxDisplay = productDetails.length - 4;
  const placeholder = 'https://wallpaperaccess.com/full/44303.jpg';

  const nextSlide = () => {
    setCurrentImageIdx(currentImageIdx === maxDisplay ? currentImageIdx : currentImageIdx + 1);
  };

  const prevSlide = () => {
    setCurrentImageIdx(currentImageIdx === 0 ? 0 : currentImageIdx - 1);
  };

  useEffect(() => {
    setCurrentImageIdx(0);
  }, [productDetails]);

  const handleModalClick = (id) => {
    setModalHeaderContent('COMPARING')
    setModalBodyContent(<ComparisonModal mainId={prod_id} relatedId={id}/>);
    setShowModal(true);
  }

  const changeProductID = (id) => {
    setProd(id);
  }

  return (
    <CarouselContainer className='CarouselContainer'>
      {
        currentImageIdx !== 0 ?
        <Arrow icon={faAngleLeft} onClick={() => prevSlide()}/> : <ArrowTransparent icon={faAngleLeft}/>
      }
      {display.map((details, index) => {
        return (
          <CardStyle className='CardStyle' key={index}>
            <ImageWrapper className='ImageWrapper'>
              <ImageStyle className='ImageStyle'
                src={details.images === null ? placeholder : details.images}
                onClick={(id) => changeProductID(details.id)}
              />
              <RelatedButtonStyle>
                <FontAwesomeIcon
                  icon={faStar}
                  onClick={() => handleModalClick(details.id)}
                />
              </RelatedButtonStyle>
            </ImageWrapper>
            <DetailsWrapper className='Details'>
              <InfoStyle className='InfoStyle'>
                <span>{details.names}</span>
                <CategoryStyle>{details.categories}</CategoryStyle>
                <span>{StarRating(details.ratings.avgRating)}</span>
              </InfoStyle>
                {details.salePrices ?
                <PriceStyle>
                  <OriginalPrice>${Math.trunc(details.prices)}</OriginalPrice>
                  <SalesPrice>${Math.trunc(details.salePrices)}</SalesPrice>
                </PriceStyle>
                :
                <PriceStyle>
                  <div>${Math.trunc(details.prices)}</div>
                </PriceStyle>}
            </DetailsWrapper>
          </CardStyle>
        )
      })}
      {
        (currentImageIdx !== maxDisplay && display.length >= 4) ?
        <Arrow icon={faAngleRight} onClick={() => nextSlide()}/> :
        <ArrowTransparent icon={faAngleRight} fill='transparent'/>
      }
    </CarouselContainer>
  )
}

export default RelatedCarousel;