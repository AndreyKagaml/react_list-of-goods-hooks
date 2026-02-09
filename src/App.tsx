import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  alphabetically = 'alphabetically',
  length = 'length',
  default = '',
}

function prepareGoods(goods: string[], sortKey: SortType, reverse?: boolean) {
  const goodsList = [...goods];

  if (sortKey) {
    goodsList.sort((good1, good2) => {
      switch (sortKey) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    goodsList.reverse();
  }

  return goodsList;
}

export const App: React.FC = () => {
  const [reversed, setReverse] = useState(false);
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const goods = prepareGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
          onClick={() => setSortField(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReverse(!reversed)}
        >
          Reverse
        </button>

        {(sortField !== SortType.default || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setSortField(SortType.default);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodsList goods={goods} />
    </div>
  );
};
