export const GoodsList = ({ goods }: { goods: string[] }) => (
  <ul>
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  </ul>
);
