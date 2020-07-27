import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import User from '../models/User';
import path from 'path';
import fs from 'fs'; //import o file system
import AppError from '../errors/AppError';

interface Request {
    user_id: string,
    avatarFilename: string
}

class UpdateUserAvatarService {
    public async execute({user_id, avatarFilename}: Request): Promise<User>{
        const usersRepository = getRepository(User);

        const isValidUser = await usersRepository.findOne(user_id);

        if(!isValidUser) {
            throw new AppError('Only valid users can change avatar.', 401)
        }
        //Deletar avatar anterior
        if (isValidUser.avatar) { // verifica se o usuario tem um avatar anterior
            const userAvatarFilePath = path.join(uploadConfig.directory, isValidUser.avatar); // concatena o caminho + o nome do arquivo do avatar
            // Isso garante que vamos esta usando as funções do filesystem como promise ao inves de callback, dai para poder usar o await.
            // A função stat, tras o status de um arquivo mas só se ele existir, vamos usar isso para verificar se o arquivo existe.
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath); // Deleta o arquivo na maquina
            }
        }

        isValidUser.avatar = avatarFilename; // falamos que o campo avatar do user, vai receber o avatarFilename passado no metodo.
        await usersRepository.save(isValidUser); // salva as informações no banco de dados
        return isValidUser;
    }
}

export default UpdateUserAvatarService;
