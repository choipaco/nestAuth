import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { GetUser } from 'src/auth/security/get-user.decorator';
import UsersEntity from 'src/entities/users.entity';
import { PageDTO } from './dto/page.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { PaginatedResponseDto } from './dto/page-response.dto';

@ApiBearerAuth()
@ApiTags('board')
@Controller('board')
export class BoardController {
    constructor(private readonly boardService:BoardService){}

    @Post('/create')
    @ApiBadRequestResponse({description: '입력이 틀렸을 경우'})
    @ApiCreatedResponse({description: '성공한 경우'})
    @UseGuards(AuthGuard)
    async create(@Body() createBoardDTO: CreateBoardDTO, @GetUser() user: UsersEntity){
        return this.boardService.create(createBoardDTO, user);
    }

    @Get('/list')
    @ApiOkResponse({description: '성공한 경우',type: PaginatedResponseDto})
    async list(@Query() query: PageDTO){
        return this.boardService.list(query);
    }

    @Get('/:uuid')
    @UseGuards(AuthGuard)
    async getOne(@Param('uuid') uuid: string){
        return this.boardService.getOne(uuid);
    }

    @Put('/update/:uuid')
    @UseGuards(AuthGuard)
    async update(@Param('uuid') uuid: string, @Body() updateBoardDTO:UpdateBoardDTO, @GetUser() user: UsersEntity){
        return this.boardService.update(uuid, updateBoardDTO, user);
    }

    @Delete('/delete/:uuid')
    @UseGuards(AuthGuard)
    async delete(@Param('uuid') uuid: string, @GetUser() user: UsersEntity){
        return this.boardService.delete(uuid, user);
    }
}
