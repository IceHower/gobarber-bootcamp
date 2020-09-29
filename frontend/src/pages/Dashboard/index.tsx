import React, { useState, useRef, useEffect } from 'react';
import { FiPower, FiPlusCircle, FiChevronRight, FiCircle } from 'react-icons/fi';
import { Container, Header, HeaderContent, Profile, Body, IQList } from './styles';
import { useHistory } from 'react-router-dom';
import Modal from '../../Components/modal';
import Button from '../../Components/button';
import Input from '../../Components/input';
import { Form } from  '@unform/web';
import { FormHandles } from '@unform/core';

const Dashboard: React.FC = () => {

    const history = useHistory();
    const formRef = useRef<FormHandles>(null);
    const [showModal, setShowModal] = useState(false);
    const [newLista, setNewLista] = useState('');
    const [lista, setLista] = useState<string[]>(()=> {
    const storagedLista = localStorage.getItem('@NovaLista:lista');
        if (storagedLista) {
            return JSON.parse(storagedLista);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('@NovaLista:lista', JSON.stringify(lista));
    }, [lista]);

    function HandleAddLista() {
        if (newLista === '') {
            return
        }
        setShowModal(false);
        setLista([...lista, newLista]);
        setNewLista('');
    }
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
                    <div className="iqoption-status">
                        <span>Online</span> 
                        <FiCircle/>
                    </div> 
                </HeaderContent>
            </Header>
            <Body>
                <strong>LISTAS</strong>
                <button type="button" onClick={() => setShowModal(true)}>
                    <FiPlusCircle size={32}/>
                </button>
            </Body>
            {showModal && 
            <Modal>
                <Form ref={formRef} onSubmit={HandleAddLista}>
                    <h1> Nova Lista </h1>
                    <Input name='lista' placeholder='Nome da lista' onChange={e => setNewLista(e.target.value)}/>
                    <Button type='submit'> Criar </Button>
                </Form>
            </Modal>}
            {lista.map(list => (
            <IQList>
                    <div>
                        <strong>{list}</strong>
                        <p> EM ESPERA <FiCircle className='Circle'/> </p>
                    </div>
            <FiChevronRight size={20}/>
            </IQList>
            ))}
        </Container>
    )

}


export default Dashboard;