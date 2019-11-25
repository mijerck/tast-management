import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentilas: AuthCredentialsDto): Promise<void> {
      const { username, password } = authCredentilas;

      const user = new User();
      user.username = username;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      console.log(user.password);

      try {
        await user.save();
      } catch (error) {
        if (error.code === '23505') {
          throw new ConflictException('Username already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
  }

  async valdateUserPassword(authCredentilasDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentilasDto;
    const user = await this.findOne({ username });

    if (user && await user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

// TODO install @nestjs/jwt @nestjs/passport bycrpt
}
