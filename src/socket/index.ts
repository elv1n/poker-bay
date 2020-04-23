import ReconnectingWebSocket from 'reconnecting-websocket';
import type { GameMsgContents, SocketSendMsg } from './types';
import { SocketSendTag } from './types';
import { LS, LSKeys } from '../utils/LS';
import { PlayerAction } from './types/player';

export * from './types';

if (!process.env.REACT_APP_SOCKET) {
  throw new Error('Socket url should be defined in environment');
}

export const socket = new ReconnectingWebSocket(process.env.REACT_APP_SOCKET);

let open = false;

socket.addEventListener('open', () => {
  open = true;
});

export const socketSend = (msg: SocketSendMsg) => {
  if (open) {
    socket.send(JSON.stringify(msg));
  } else {
    setTimeout(() => socketSend(msg), 500);
  }
};

export const socketSendAuth = () => {
  const token = LS.get(LSKeys.token);
  if (token) {
    if (open) {
      socket.send(token.access_token);
    } else {
      setTimeout(() => socketSendAuth(), 500);
    }
  }
};

export const gameSocketMsg = (contents: GameMsgContents) =>
  socketSend({
    tag: SocketSendTag.GameMsgIn,
    contents,
  });

export const sendGameMove = (table: string, moveContents: PlayerAction) =>
  gameSocketMsg({
    tag: SocketSendTag.GameMove,
    contents: [table, moveContents],
  });
