import React from 'react';
import { Image , KeyboardAvoidingView, Platform, View, ScrollView} from 'react-native';

import Input from '../../components/input';
import Button from '../../components/button';
import logoImg from '../../assets/logo.png';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';
import { useNavigation } from '@react-navigation/native';

const SignIn: React.FC = () => {
    const navigation = useNavigation();
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
                        <Title>Faça seu logon</Title>
                    </View>
                    <Input name='email' icon="mail" placeholder='E-mail'/>
                    <Input name='email' icon='lock' placeholder='Senha'/>
                    <Button onPress={() => {console.log('foi')}}>Entrar</Button>
                    <ForgotPassword onPress={() => {console.log('foi')}}>
                        <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                    </ForgotPassword>
        </Container>
        </ScrollView>
    </KeyboardAvoidingView>
    <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
    </CreateAccountButton>
    
    </>);
}

export default SignIn