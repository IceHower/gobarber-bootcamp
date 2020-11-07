import React, {useRef, useCallback} from 'react';
import { Image , KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert} from 'react-native';

import Input from '../../components/input';
import Button from '../../components/button';
import logoImg from '../../assets/logo.png';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer, useNavigation,  } from '@react-navigation/native';
import { Container, Title, BackToSignInButton, BackToSignInButtonText } from './styles';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const handleSignUp = useCallback(async (data: SignUpFormData) => {
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
            //await api.post('/users', data)

            // addToast({
            //     type: 'success',
            //     title: 'Cadastro realizado!',
            //     description: 'Você já pode fazer seu logon no GoBarber'  
            // });

        } catch(err) {
            if( err instanceof Yup.ValidationError) { // Verifica se o erro é uma instancia do YupValidation error
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return
            }
            Alert.alert('Erro no cadastro', 'Ocorreu um erro ao fazer o cadastro, tente novamente.')
        }
    }, []);

    return (
        <>
        <KeyboardAvoidingView 
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding': undefined}
        enabled>
            <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flex: 1}}>
            <Container>
                        <Image source={logoImg} />
                        <View>
                            <Title>Crie sua conta</Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input 
                                autoCapitalize='words' 
                                name='name' 
                                icon="user" 
                                placeholder='Nome'
                                returnKeyType='next'
                                onSubmitEditing={() => { emailInputRef.current?.focus()}}
                            />

                            <Input 
                                ref={emailInputRef}
                                keyboardType='email-address' 
                                autoCorrect={false}
                                autoCapitalize='none'
                                name='email' 
                                icon="mail" 
                                placeholder='E-mail'
                                returnKeyType='next'
                                onSubmitEditing={() => { passwordInputRef.current?.focus()}}
                            />
                            
                            <Input 
                                ref={passwordInputRef}
                                secureTextEntry
                                name='password' 
                                icon='lock' 
                                placeholder='Senha'
                                textContentType='newPassword'
                                returnKeyType='send'
                                onSubmitEditing={() => formRef.current?.submitForm()}
                            />
                        </Form>
                        <Button onPress={() => formRef.current?.submitForm()}>Cadastrar</Button>
            </Container>
            </ScrollView>
        </KeyboardAvoidingView>
        <BackToSignInButton onPress={() => navigation.navigate('SignIn')}>
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInButtonText>Voltar para o logon</BackToSignInButtonText>
        </BackToSignInButton>
        
        </>);;
}

export default SignUp