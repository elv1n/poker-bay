import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from '../../features/auth';
import { LS, LSKeys } from '../../utils/LS';
import { gameActions } from '../../features/game';
import {
  socket,
  SocketErrorTags,
  SocketMsg,
  socketSendAuth,
  SocketTag,
} from '../../socket';
import { lobbyActions } from '../../features/lobby';

export const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (LS.get(LSKeys.token)) {
      socketSendAuth();
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);

  useEffect(() => {
    const close = () => {
      console.log('disconnected');
      setTimeout(() => {
        socket.reconnect();
      }, 750);
    };

    const onMessage = (msg: MessageEvent) => {
      const parsedMsg: SocketMsg = JSON.parse(JSON.parse(msg.data));
      const process = () => {
        switch (parsedMsg.tag) {
          case SocketTag.AuthSuccess:
            return dispatch(authActions.set(LS.getUsername()));
          case SocketTag.TableList:
            return dispatch(lobbyActions.set(parsedMsg.contents));
          case SocketTag.NewGameState:
          case SocketTag.SuccessfullySubscribedToTable:
          case SocketTag.SuccessfullySatDown:
            return dispatch(gameActions.set(parsedMsg.contents));
          case SocketTag.ErrMsg: {
            const { contents } = parsedMsg;
            switch (contents.tag) {
              case SocketErrorTags.AuthFailed: {
                // socket.close();
                LS.remove(LSKeys.token);
                return dispatch(authActions.error(contents.contents));
              }
              default:
                console.log('not handled errpr', contents.tag, contents);
                return undefined;
            }
          }
          default:
            console.log('not handled', parsedMsg.tag, parsedMsg.contents);
            return undefined;
        }
      };
      process();
    };

    socket.addEventListener('close', close);
    socket.addEventListener('message', onMessage);

    return () => {
      socket.removeEventListener('close', close);
      socket.removeEventListener('message', onMessage);
    };
  }, [dispatch]);
};
