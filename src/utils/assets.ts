export enum PokerSound {
  Bet = 'bet',
  Check = 'check',
  Fold = 'fold',
  TurnCards = 'turnCards',
  TurnCard = 'turnCard',
  Timeout = 'turningEnd',
  Win = 'winChips',
  YourAction = 'yourTurn',
}

export const getPokerSound = (asset: PokerSound) =>
  `${process.env.PUBLIC_URL}/sounds/poker/${asset}.mp3`;
