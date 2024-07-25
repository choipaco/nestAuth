import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BoardEntity from 'src/entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDTO } from './dto/create-board.dto';
import UsersEntity from 'src/entities/users.entity';
import { PageDTO } from './dto/page.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>,
    ){}

    async create(createBoardDTO:CreateBoardDTO,user:UsersEntity){
        const board = createBoardDTO.toEntity();
        board.user = user;
        await this.boardRepository.save(board);
    }


    async list(pageDTO:PageDTO){
        const {max,page} = pageDTO;
        const skip = (page - 1) * max;
        const [items, total] = await this.boardRepository.findAndCount({
            skip,
            take: max,
            order: { createdAt: 'DESC' },
            relations:['user']
        });
        const response = {
            items: items.map((item) => ({
                uuid: item.uuid,
                title: item.title,
                content: undefined,
                createdAt: item.createdAt,
                user: {
                    uuid: item.user.uuid,
                    id: item.user.id,
                },
            })),
            total,
            currentPage: page,
            totalPages: Math.ceil(total / max),
        };
        return response;
    }

    async getOne(uuid:string){
        const info = await this.boardRepository.findOne({
            where:{
                uuid: uuid
            },
            relations:['user'],
        })

        info.user = {
            ...info.user,
            password: undefined,
            name: undefined,
            email: undefined,
        }

        return info;
    }


    async update(uuid:string, updateBoardDTO:UpdateBoardDTO, user:UsersEntity){
        const info = await this.boardRepository.findOne({
            where:{
                uuid: uuid
            },
            relations: ['user']
        })

        if(!info) new NotFoundException("게시판을 찾을 수 없습니다");
        if(info.user.uuid !== user.uuid) new UnauthorizedException("같은 유저가 아닙니다");
        
        const board = updateBoardDTO.toEntity();
        
        info.title = board.title;
        info.content = board.content;

        await this.boardRepository.save(info);
        return true;
    }

    async delete(uuid:string, user:UsersEntity){
        const info = await this.boardRepository.findOne({
            where:{
                uuid: uuid
            },
            relations: ['user']
        })

        if(!info) new NotFoundException("게시판을 찾을 수 없습니다");
        if(info.user.uuid !== user.uuid) new UnauthorizedException("같은 유저가 아닙니다");

        await this.boardRepository.remove(info);

        return true;
    }


}
