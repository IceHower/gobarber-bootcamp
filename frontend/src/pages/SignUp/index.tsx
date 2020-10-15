import React, { useCallback, useRef } from 'react';
import { Container, Content, Background, AnimationContainer } from './styles';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import Button from '../../Components/button';
import Input from '../../Components/input'
import { Form } from '@unform/web'; // Importa o componente Form da biblioteca de unform
import * as Yup from 'yup'; // Importa a biblioteca para realizar a validação de formulario, e armazena dentro de uma variavel chamada Yup
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext'
 
const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    interface SignUpFormData {
        name: string;
        email: string;
        password: string;
    }

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'Minimo 6 digitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            await api.post('/users', data)

            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu logon no GoBarber'  
            });

            history.push('/');

        } catch(err) {
            if( err instanceof Yup.ValidationError) { // Verifica se o erro é uma instancia do YupValidation error
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return
            }
            // Disparar um toast
            addToast({
                type: 'error',
                title: 'Error no cadastro',
                description: 'Ocorreu um erro ao fazer cadastro, tente novamente.'
            });
        }
    }, [history, addToast]);
    
    return(
    <Container>
        <Background/>
        <Content>
            <AnimationContainer>
                <img src={Logo}></img>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1> Faça seu cadastro </h1>
                    <Input name='name' icon={FiUser} placeholder='Nome' />
                    <Input name='email' icon={FiMail} placeholder='Email' />
                    <Input name='password' icon={FiLock} placeholder='Senha' type='password'/>
                    <Button type='submit'> Cadastrar </Button>

                    <Link to="/"> <FiArrowLeft/> Voltar para logon </Link>
                </Form>
            </AnimationContainer>
        </Content>
        
    </Container>
);}

export default SignUp;