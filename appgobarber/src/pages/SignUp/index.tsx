import React from 'react';
import { Image , KeyboardAvoidingView, Platform, View, ScrollView} from 'react-native';

import Input from '../../components/input';
import Button from '../../components/button';
import logoImg from '../../assets/logo.png';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Container, Title, BackToSignInButton, BackToSignInButtonText } from './styles';

const SignUp: React.FC = () => {
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
                            <Title>Crie sua conta</Title>
                        </View>
                        <Input name='name' icon="user" placeholder='Nome'/>
                        <Input name='email' icon="mail" placeholder='E-mail'/>
                        <Input name='email' icon='lock' placeholder='Senha'/>
                        <Button onPress={() => {console.log('foi')}}>Cadastrar</Button>
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