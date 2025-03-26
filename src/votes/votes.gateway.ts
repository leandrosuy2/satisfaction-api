import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VotesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinCompanyRoom')
  async handleJoinCompanyRoom(client: Socket, companyId: string) {
    client.join(`company_${companyId}`);
  }

  @SubscribeMessage('leaveCompanyRoom')
  handleLeaveCompanyRoom(client: Socket, companyId: string) {
    client.leave(`company_${companyId}`);
  }

  async broadcastVoteUpdate(companyId: string, analytics: any) {
    this.server.to(`company_${companyId}`).emit('voteUpdate', analytics);
  }
} 