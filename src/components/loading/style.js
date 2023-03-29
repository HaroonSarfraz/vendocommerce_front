import styled from "styled-components";

export const LoadingWrapper = styled.div`
  .table-loader {
    visibility: visible;
    border: 1px solid transparent !important;
    content: " ";
    width: 100%;
    height: 600px;
    background-image: linear-gradient(rgba(235, 235, 235, 1) 1px, transparent 0),
      linear-gradient(90deg, rgba(235, 235, 235, 1) 1px, transparent 0),
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.5) 15%,
        rgba(255, 255, 255, 0) 30%
      ),
      linear-gradient(rgba(240, 240, 242, 1) 35px, transparent 0);

    background-repeat: repeat;

    background-size: 1px 35px, calc(100% * 0.1666666666) 1px, 30% 100%, 2px 70px;

    background-position: 0 0, 0 0, 0 0, 0 0;

    animation: shine 0.5s infinite;
  }

  @keyframes shine {
    to {
      background-position: 0 0, 0 0, 40% 0, 0 0;
    }
  }
`;
