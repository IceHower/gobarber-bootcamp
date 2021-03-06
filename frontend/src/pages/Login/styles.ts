import styled, { keyframes } from 'styled-components';
import loginImage from '../../assets/sign-in-background.png';
import { shade } from 'polished'

export const Container = styled.div`
    height: 100vh; /** vh - view port heigh, faz  com que a div ocupe 100% da tela visivel*/
    display: flex;
    align-items: stretch;

`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    width: 100%;
    max-width: 700px;

`;
const appearFromLeft = keyframes `
    from {
        opacity: 0;
        transform: translateX(-50px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }

`;
export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${appearFromLeft} 1s;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
    }

    h1 {
        margin-bottom: 24px;
        font-size: 38px;
    }
    a {
        color: #ff9000;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;
        svg {
            margin-right: 16px;
        }
        &:hover {
            color: ${shade(0.2, '#ff9000')}
        }
    }
    .password {
        color: #FFF;
    }

`;

export const Background = styled.div`
    flex: 1;
    background: url(${loginImage}) no-repeat center;
    background-size: cover;
`;
