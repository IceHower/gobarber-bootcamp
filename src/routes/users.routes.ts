import { Router, request } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';

const usersRoutes = Router(); // Define a variavel que vai inicializar o router.
const upload = multer(uploadConfig); // Define a variavel que vai inicializar o multer passando como parametro a upload config


const userService = new CreateUserService();
usersRoutes.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const user = await userService.excute({name, email, password}); // passa name, email and  password para função execute do service.
        delete user.password; // deleta a senha para nao retornar na resposta
        return response.json(user);
    } catch (err) {
        return response.status(400).json({error: err.message}); // Vai retornar um erro com a mensagem definida no services.
    }
});
//Cria uma rota com o metodo http PATCH(PARA ALTERAÇÕES UNICAS) e aplica o middleware de autenticação e de upload.
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'),  async (request, response) => {
    return response.json({ok: true});
});

export default usersRoutes;
