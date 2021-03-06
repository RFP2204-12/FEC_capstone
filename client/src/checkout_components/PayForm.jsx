import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../index.jsx';
import { ProdPageContext } from '../product_page.jsx';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  width: 35%;
  justify-content: center;
  align-items: top;
  position: relative;
  margin-left: 1rem;
`;

const HeaderStyle = styled.h4`
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const LineItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  text-align: left;
  margin-left: 2.5rem;
`;

const LineValue = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: flex-end;
  margin-right: 5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
`;

const AddButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 0.25rem 1rem;
  border: 1px solid ${(props) => props.theme.fontColor};
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  margin: 0 2rem 0 0;
  background: black;
  color: white;
  &:hover {
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  }
`;

const InputStyle = styled.input`
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const LabelStyle = styled.label`
  display: block;
  margin-left: 1rem;
`;

const ShortLabelStyle = styled.label`
  display: flex;
`;

const PayForm = () => {
  const {cart, setCart, setShowModal, setModalBodyContent, setModalHeaderContent} = useContext(AppContext);
  const [total, setTotal] = useState(0);

  let getTotal = () => {
    let tempTotal = 0;
    cart.forEach((item) => {
      tempTotal += (item.price * item.quant)
    });
    setTotal(tempTotal);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    let tempArray = [];
    cart.forEach((item) => {
      let data = {
        "sku_id": item.sku
      };
      for (let i = 0; i < item.quant; i++) {
        tempArray.push(
          axios.post(`/FEC/cart`, data, {
            headers: {
              Authorization: config.TOKEN
            }
          })
            .then((response) => {return response.data})
            .catch((err) => console.log(err))
        );
      };
    });
    return Promise.all(tempArray)
      .then(() => setCart([]))
      .then(() => {
        setModalHeaderContent(null);
        setModalBodyContent('Thank you for your purchase! :)');
        setShowModal(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTotal();
  }, [cart]);

  return (
    <Container>
      <div style={{'marginBottom': '1rem'}}>
        <HeaderStyle>Order Summary</HeaderStyle>
          <div style={{'display': 'flex'}}>
            <LineItem>SubTotal</LineItem>
            <LineValue>${Math.round((total * 100) / 100).toFixed(2)}</LineValue>
          </div>
          <div style={{'display': 'flex'}}>
            <LineItem>Delivery</LineItem>
            <LineValue>FREE</LineValue>
          </div>
          <div style={{'display': 'flex'}}>
            <LineItem>Sales Tax</LineItem>
            <LineValue>-</LineValue>
          </div>
          <div style={{'display': 'flex'}}>
            <LineItem>Service Fee</LineItem>
            <LineValue>${Math.round((total * 10) / 100).toFixed(2)}</LineValue>
          </div>
          <div style={{'display': 'flex'}}>
            <LineItem>Total</LineItem>
            <LineValue>${Math.round((total * 110) / 100).toFixed(2)}</LineValue>
          </div>
      </div>
      <div>
        <HeaderStyle>Shipping Information</HeaderStyle>
        <form onSubmit={handleSubmit}>
          <div style={{'marginLeft': '1rem'}}>
            <InputStyle type="text" placeholder="First Name" required></InputStyle>
            <InputStyle type="text" placeholder="Last Name" required></InputStyle>
            <InputStyle type="text" placeholder="Shipping Address" required></InputStyle>
            <InputStyle type="text" placeholder="City" required></InputStyle>
            <InputStyle type="text" placeholder="State" required></InputStyle>
            <InputStyle type="text" placeholder="Postal Code" required></InputStyle>
          </div>
          <HeaderStyle>Payment Information</HeaderStyle>
          <div>
            <LabelStyle>Card Number</LabelStyle>
            <input style={{'width': '20rem', 'marginLeft': '1rem'}} placeholder="(dashes not required)" minLength="12" maxLength="19" required></input>
            <LabelStyle>Name on Card</LabelStyle>
            <input style={{'width': '20rem', 'marginLeft': '1rem'}} type="text" placeholder="Full Name" required></input>
            <div style={{'display': 'flex', 'marginLeft': '1rem'}}>
              <div style={{ 'width': '20%'}}>
                <ShortLabelStyle>Exp. Date</ShortLabelStyle>
                <input style={{'width': '5rem'}} type="text" placeholder="MM/YY" maxLength ={5} required></input>
              </div>
              <div style={{'width': '20%', 'marginLeft': '1rem'}}>
                <ShortLabelStyle>CVC</ShortLabelStyle>
                <input style={{'width': '5rem'}} type="text" placeholder="***" maxLength={3} required></input>
              </div>
            </div>
          </div>
          <ButtonContainer>
            <AddButton type="submit">Checkout</AddButton>
          </ButtonContainer>
        </form>
      </div>

    </Container>
  );
};

export default PayForm;

