import { jetonOrder, ChipType } from '../../Chip/constants';

export type PokerChip = {
  type: ChipType;
  count: number;
};
export const getChips = (bet: number): PokerChip[] => {
  return jetonOrder
    .reduce(
      (acc: { bet: number; chips: PokerChip[] }, num, index) => {
        const count = Math.floor(acc.bet / num);
        const nextCount = jetonOrder[index + 1]
          ? Math.floor(acc.bet / jetonOrder[index + 1])
          : 0;
        /**
         * Example 180
         * 100 only once so it go next end return
         * 3 x 50
         * 1 X 25
         * 1 X 5
         * instead of 1X100 etc
         */
        if (count < 2 && nextCount > 2) {
          return acc;
        }
        if (count) {
          acc.chips.push({
            type: num,
            count,
          });
          acc.bet -= count * num;
        }

        return acc;
      },
      { bet, chips: [] }
    )
    .chips.reverse();
};
