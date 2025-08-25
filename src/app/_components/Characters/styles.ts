import styled, { keyframes } from "styled-components";

interface ThumbnailData {
  thumbnail: {
    path: string;
    extension: string;
  };
}


const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

export const Header = styled.div`
  background: url('/banner.jpg') no-repeat center;
  background-size: cover;
  width: auto;
  height: auto;
  padding: 4rem 2rem;
  border-radius: 1px;
  box-shadow: 0px 4px 15px 5px rgba(0, 0, 0, 0.35);
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    margin: 0.5rem auto;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #2c2c2c;
  border-radius: 25px;
  padding: 12px 20px;
  margin: 20px 0;
  width: 80%;
  max-width: 500px;
  border: 2px solid #ec1d24;
  box-shadow: 0 4px 15px rgba(236, 29, 36, 0.3);

  @media (max-width: 768px) {
    width: 90%;
    padding: 10px 15px;
  }
`;

export const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  padding: 5px 15px;
  width: 100%;
  outline: none;
  caret-color: #ec1d24;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 20px;
`;

export const Card = styled.div<ThumbnailData>`
  background: #1a1a1a;
  height: 450px;
  width: 300px;
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 2px 2px 10px 1px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(236, 29, 36, 0.4);
  }
   
  h2 {
    color: white;
    padding: 10px;
    text-align: center;
    font-weight: bold;
    margin: 0;
    font-size: 1.2rem;
  }

  h3 {
    color: #ec1d24;
    padding: 8px 10px;
    text-align: left;
    font-weight: bold;
    margin: 0;
    font-size: 1rem;
  }

  p {
    color: #ccc;
    padding: 0 10px 10px;
    text-align: justify;
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  li {
    color: #ccc;
    padding: 2px 10px;
    text-align: left;
    font-size: 0.85rem;
  }

  div#img {
    height: 400px;
    width: 100%;
    background: url(${(props) => `${props.thumbnail.path}.${props.thumbnail.extension}`}) no-repeat center;
    background-size: cover;
    transition: all 0.5s ease;
  }

  &:hover {
    div#img {
      height: 200px;
    }
  }
`;

export const ButtonMore = styled.div`
  background: #ec1d24;
  color: white; 
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 2px 2px 10px 1px rgba(0,0,0,0.3);
  margin: 30px auto;
  padding: 0 60px;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-weight: bold;
  border: none;

  &:hover {
    background: #ff4040;
    transform: scale(1.05);
  }

  svg {
    margin: 0 8px;
  }
`;

export const ClearButton = styled.button`
  background: transparent;
  border: none;
  color: #ec1d24;
  cursor: pointer;
  padding: 5px;
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff4040;
  }
`;

export const LoadingText = styled.div`
  color: #ec1d24;
  text-align: center;
  padding: 20px;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const NoResultsText = styled.div`
  color: #ccc;
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
`;

export const LoadMoreIndicator = styled.div`
  color: #ec1d24;
  text-align: center;
  padding: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  animation: ${pulse} 1.5s infinite;
`;