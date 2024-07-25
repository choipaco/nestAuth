import BoardEntity from 'src/entities/board.entity';
export declare class UpdateBoardDTO {
    title: string;
    content: string;
    toEntity(): BoardEntity;
}
