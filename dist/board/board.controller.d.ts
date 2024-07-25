import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import UsersEntity from 'src/entities/users.entity';
import { PageDTO } from './dto/page.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    create(createBoardDTO: CreateBoardDTO, user: UsersEntity): Promise<void>;
    list(query: PageDTO): Promise<{
        items: {
            uuid: string;
            title: string;
            content: any;
            createdAt: Date;
            user: {
                uuid: string;
                id: string;
            };
        }[];
        total: number;
        currentPage: number;
        totalPages: number;
    }>;
    getOne(uuid: string): Promise<import("../entities/board.entity").default>;
    update(uuid: string, updateBoardDTO: UpdateBoardDTO, user: UsersEntity): Promise<boolean>;
    delete(uuid: string, user: UsersEntity): Promise<boolean>;
}
