import { Router, request } from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';

const usersRoutes = Router(); // Define a variavel que vai inicializar o router.
const upload = multer(uploadConfig); // Define a variavel que vai inicializar o multer passando como parametro a upload config


const userService = new CreateUserService();
usersRoutes.post('/', async (request, response) => {
        const { name, email, password } = request.body;
        const user = await userService.excute({name, email, password}); // passa name, email and  password para função execute do service.
        delete user.password; // deleta a senha para nao retornar na resposta
        return response.json(user);
});
//Cria uma rota com o metodo http PATCH(PARA ALTERAÇÕES UNICAS) e aplica o middleware de autenticação e de upload.
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'),  async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService();
        // Pega o id atraves do middleware, e o file do request.file.filename do express.
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename
        });
        return response.json(user);
});

export default usersRoutes;
