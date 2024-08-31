// components/Modal.js
import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 8px;
  width: 80%;
  max-height: 80%;
  overflow-y: auto;
  text-align: center;
`;

const ImageContainer = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-bottom: 1rem;
      max-height: 800px;
      overflow: auto;
      object-fit: contain;
`;

const StyledImage = styled.img`
  max-width: 80%;
  object-fit: contain;
  height: auto;
  border-radius: 8px; // Optional: add border-radius for a softer look
  margin: 1rem 0; // Add some margin above and below the image
`;
const CloseButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 1rem;
`;

const CloseButton = styled.button`
  background: #0070f3;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  position: fixed;

  &:hover {
    background: #005bb5;
  }
`;

const Description = styled.p`
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const DataConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;

`;

const Modal = ({ isOpen, closeModal, data }) => {
  if (!isOpen) return null;
  return (
    <ModalWrapper>
      <ModalContent>
        <CloseButtonContainer>
       <CloseButton onClick={closeModal}>
        Close
       </CloseButton>
        </CloseButtonContainer>
        {
          data?.map((item, index) => (
            <DataConatiner key={index}>
              <h2>{item.title}</h2>
              <Description>{item.description}</Description>
              <ImageContainer>
              <StyledImage src={item.imageUrl} alt={item.alt} />
              </ImageContainer>
            </DataConatiner>
          ))
        }
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;