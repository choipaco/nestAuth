import UsersEntity from "./users.entity";
export default class BoardEntity {
    uuid: string;
    title: string;
    content: string;
    createdAt: Date;
    user: UsersEntity;
}
