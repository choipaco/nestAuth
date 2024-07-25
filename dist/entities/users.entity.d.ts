import BoardEntity from "./board.entity";
export default class UsersEntity {
    uuid: string;
    id: string;
    email: string;
    name: string;
    password: string;
    board: BoardEntity[];
}
