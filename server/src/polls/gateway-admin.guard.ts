import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsUnauthorizedException } from 'src/exceptions/ws-exceptions';
import { PollsService } from './polls.service';
import { AuthPayload, SocketWithAuth } from './types';

@Injectable()
export class GatewayAdminGuard implements CanActivate {
  private readonly logger = new Logger(GatewayAdminGuard.name);
  constructor(
    private readonly pollsService: PollsService,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket: SocketWithAuth = context.switchToWs().getClient();

    const token =
      socket.handshake.auth.token || socket.handshake.headers['token'];

    if (!token) {
      this.logger.error('No authorization token provided');
      throw new WsUnauthorizedException('No token provided');
    }

    try {
      this.logger.debug(`Validating admin for poll ${socket.pollID}`);

      const poll = await this.pollsService.getPoll(socket.pollID);

      if (!poll || socket.userID !== poll.adminID) {
        throw new WsUnauthorizedException('Admin privileges required');
      }

      return true;
    } catch (e) {
      this.logger.error('Error validating admin privileges', e);
      throw new WsUnauthorizedException('Admin privileges required');
    }
  }
}
