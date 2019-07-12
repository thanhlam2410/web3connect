import * as React from "react";
import styled, { keyframes } from "styled-components";
import {
  getProviderInfoByName,
  formatProviderDescription
} from "../helpers/utils";
import { SIcon, STitle, SDescription } from "./common";

const shimmer = keyframes`
0% {
  background-position: -468px 0
}
100% {
  background-position: 468px 0
}
`;

const SProviderContainer = styled.div`
  transition: background-color 0.2s ease-in-out;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  padding: 24px 16px;
  @media screen and (max-width: 768px) {
    padding: 12px;
  }
`;

const SName = styled(STitle)`
  color: rgb(12, 12, 13);
`;

interface IProviderStyleProps {
  loading: boolean;
}

const SProvider = styled.div<IProviderStyleProps>`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid rgba(195, 195, 195, 0.14);

  ${({ loading }) =>
    loading &&
    `
    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: forwards;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-name: ${shimmer};
    -webkit-animation-timing-function: linear;
    background: #f6f7f8;
    background-image: -webkit-gradient(linear, left center, right center, from(#f6f7f8), color-stop(.2, #edeef1), color-stop(.4, #f6f7f8), to(#f6f7f8));
    background-image: -webkit-linear-gradient(left, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
    background-repeat: no-repeat;
    background-size: 800px 104px;
  `};

  @media (hover: hover) {
    &:hover ${SProviderContainer} {
      background-color: rgba(195, 195, 195, 0.14);
    }
  }
`;

interface IProviderState {
  loading: boolean;
}

interface IProviderProps {
  name: string | null;
  onClick: () => void;
}

class Provider extends React.Component<IProviderProps, IProviderState> {
  public state = {
    loading: false
  };
  public onClick = async () => {
    this.setState({ loading: true });
    try {
      let result = await this.props.onClick();
      this.setState({ loading: false });
      return result;
    } catch (error) {
      this.setState({ loading: false });
      return error;
    }
  };
  public render() {
    const { loading } = this.state;
    const { name, ...props } = this.props;
    const providerInfo = getProviderInfoByName(name);
    const description = formatProviderDescription(providerInfo);
    return (
      <SProvider loading={loading} onClick={this.onClick} {...props}>
        <SProviderContainer>
          <SIcon noShadow={providerInfo.styled.noShadow}>
            <img src={providerInfo.logo} alt={providerInfo.name} />
          </SIcon>
          <SName>{providerInfo.name}</SName>
          <SDescription>{description}</SDescription>
        </SProviderContainer>
      </SProvider>
    );
  }
}

export default Provider;
