declare class UserDto {
    uuid: string;
    id: string;
}
declare class ItemDto {
    uuid: string;
    title: string;
    createdAt: string;
    user: UserDto;
}
export declare class PaginatedResponseDto {
    items: ItemDto[];
    total: number;
    currentPage: number;
    totalPages: number;
}
export {};
