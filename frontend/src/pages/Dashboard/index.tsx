import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Container, Header, HeaderContent, Profile} from './styles';
import { useHistory } from 'react-router-dom';

const Dashboard: React.FC = () => {

    const history = useHistory();
    return(
        <Container>
            <Header>
                <HeaderContent>
                    <Profile>
                        <img src="https://avatars0.githubusercontent.com/u/5678023?s=400&u=dfdc2b3c239f20f288f063357aa497911bad9ade&v=4" alt="Vinicius"></img>
                        <div>
                            <span>Bem Vindo, </span>
                            <strong>Vinicius</strong>
                        </div>
                    </Profile>
                    <button type="button" onClick={() => history.push('/')}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
        </Container>
    )

}


export default Dashboard;