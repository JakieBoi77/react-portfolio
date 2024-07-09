"use client"

import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    color: #fff;
    z-index: 1000;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-top: 5px solid #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingScreen = () => {
  return (
    <StyledDiv>
      <div className="loading-screen">
        <div className="spinner"></div>
        <p className="pl-5">Loading ...</p>
      </div>
    </StyledDiv>
  );
}

export default LoadingScreen;