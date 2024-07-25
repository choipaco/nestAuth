export declare class ChatGateway {
    server: any;
    wsClients: any[];
    connectSomeone(data: string, client: any): void;
    private broadcast;
    sendMessage(data: string, client: any): void;
}
