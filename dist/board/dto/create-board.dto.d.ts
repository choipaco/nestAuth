import BoardEntity from 'src/entities/board.entity';
export declare class CreateBoardDTO {
    title: string;
    content: string;
    toEntity(): BoardEntity;
}
