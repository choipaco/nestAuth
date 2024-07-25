import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UsersEntity from 'src/entities/users.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from './dto/register.dto';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
    ){}

  async findByFields(options: FindOneOptions<LoginDTO | UsersEntity>): Promise<UsersEntity | undefined> {
    return await this.userRepository.findOne(options);
  }

  async save(registerDTO: RegisterDTO){
    await this.transformPassword(registerDTO);
    return await this.userRepository.save(registerDTO);
  }

  async transformPassword(user: RegisterDTO) {
    user.password = await bcrypt.hash(
      user.password, 10,
    );
    return Promise.resolve();
  }
}


