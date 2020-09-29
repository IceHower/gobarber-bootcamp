import React from 'react';
import { Container, Content, ModalMain } from './styles';

// O children da tag vai para a variavel children.

const Modal: React.FC = ({ children }) => {
return(
    <ModalMain>
    <Container>
        <button className='close'></button>
        <Content>
            {children}
        </Content>
    </Container>
    </ModalMain>
);

}


export default Modal;