import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    // async signUp(authCredentilas: AuthCredentialsDto): Promise<void> {
    //     const { username, password } = authCredentilas;

    //     const user = new User();

    //     user.username = username;
    //     user.password = password;

    //     await user.save();
    // }
}
