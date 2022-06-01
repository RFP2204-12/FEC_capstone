import React, { useContext } from 'react';
import { ProdPageContext } from '../product_page.jsx';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const EmptyCard = ({saveToStorage}) => {
  const {prod_id} = useContext(ProdPageContext);
  return (
      <CarouselWrapper>
          <IndividualCardStyle>
            <AddIcon onClick={(e) => saveToStorage(e, prod_id)}>
              Add To Outfit
            </AddIcon>
          </IndividualCardStyle>
      </CarouselWrapper>
  )
}

const CarouselWrapper = styled.div`
  flex-direction: row;
  position: relative;
  display: flex;
  object-fit: cover;
  align-items: center;
`;

const IndividualCardStyle = styled.div`
  display: block;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  margin: 15px;
  flex-direction: column;
  flex-wrap: nowrap;
  &:hover {
    box-shadow: 0 0 10px rgba(90, 90, 90, 0.8);
  }
  width: 240px;
  height: 340px;
  object-fit: contain;
  overflow: hidden;
  text-align: center;
`;

const AddIcon = styled.button`
  align-items: center;
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #3c4043;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: center;
  letter-spacing: .25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 24px;
  position: relative;
  top: 40%;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform,opacity;
  z-index: 0;
  font-family: "Google Sans",Roboto,Arial,sans-serif;

  &:hover {
  background: #F6F9FE;
  color: #174ea6;
  }

  &:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
  }

  &:focus {
  outline: none;
  border: 2px solid #4285f4;
  }

  &:not(:disabled) {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }

  &:not(:disabled):hover {
  box-shadow: rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px;
  }

  &:not(:disabled):focus {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }

  &:not(:disabled):active {
  box-shadow: rgba(60, 64, 67, .3) 0 4px 4px 0, rgba(60, 64, 67, .15) 0 8px 12px 6px;
  }

  &:disabled {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }
`;

export default EmptyCard;