import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class VotesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleJoinCompanyRoom(client: Socket, companyId: string): Promise<void>;
    handleLeaveCompanyRoom(client: Socket, companyId: string): void;
    broadcastVoteUpdate(companyId: string, analytics: any): Promise<void>;
}
