import React, { useMemo } from 'react';
import { Grid } from '@material-ui/core';
import useMeasure from 'react-use-measure';
import { ICard } from '../../socket/types/card';
import { CardMargin, PokerCard, PokerCardProps } from '../PokerCard';
import { getFakeCards } from '../../utils/fake';

type Props = {
  className?: string;
  cards: ICard[] | null;
  max: 5 | 2;
} & Omit<PokerCardProps, 'card'>;

const RenderCards: React.FC<Exclude<Props, 'cards'> & { cards: ICard[] }> = ({
  max,
  className,
  cards,
  ...rest
}) => {
  const [ref, bounds] = useMeasure();
  const style = useMemo(() => {
    let cardHeight: number;
    if (rest.margin === CardMargin.Small) {
      cardHeight = Math.floor(bounds.width / max / 0.7 - (max - 1) * 8);
    } else {
      const maxVisible = (max + 1) / 2;
      // calculate correct height from width
      cardHeight = Math.floor(bounds.width / maxVisible / 0.7);
    }

    return {
      '--card-height': `${Math.min(cardHeight, 150)}px`,
    } as any;
  }, [bounds, max, rest.margin]);

  return (
    <Grid
      alignItems="center"
      className={className}
      container
      justify="center"
      ref={ref}
      style={style}
    >
      {cards.map(card => (
        <PokerCard card={card} key={card.suit + card.rank} {...rest} />
      ))}
    </Grid>
  );
};

export const Cards: React.FC<Props> = props => {
  const { cards } = props;
  // const cards = getFakeCards(props.max);
  if (cards) {
    return <RenderCards {...props} cards={cards} />;
  }
  return null;
};
