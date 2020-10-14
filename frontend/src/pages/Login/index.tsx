import React, {useRef, useCallback} from 'react';
import { Container, Content, Background } from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import Button from '../../Components/button';
import Input from '../../Components/input'
import {Form} from  '@unform/web';
import Logo from '../../assets/logo.svg'
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from '../../hooks/AuthContext';
import {useToast} from '../../hooks/ToastContext';

interface SignInFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const {signIn} = useAuth();
    const { addToast } = useToast();

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            })
            await schema.validate(data, {
                abortEarly: false,
            });
            //history.push('/dashboard');
            console.log(data);
            await signIn({
                email: data.email,
                password: data.password,
            });
        } catch(err) {
            if( err instanceof Yup.ValidationError) { // Verifica se o erro é uma instancia do YupValidation error
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }
            // Disparar um toast
            addToast({
                type: 'error',
                title: 'Error na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credencias.'
            });
        }
    }, [signIn, addToast]);
    
return (
    <Container>
        <Content>
            <img src={Logo}></img>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1> Faça seu logon </h1>
                <Input name='email' icon={FiMail} placeholder='Email' />
                <Input name='password' icon={FiLock} placeholder='Senha' type='password'/>
                <Button type='submit'> Entrar </Button>

                
                <a className="password" href="#"> Esqueceu sua senha? </a>
                <Link to="/cadastro"> <FiLogIn/> Criar conta </Link>
            </Form>
        </Content>
        <Background/>
    </Container>
)};

export default Login;