import InternalGrid from './grid';
import GridItem from './gridItem';

type InternalGridProps = typeof InternalGrid;

export interface FinalGridProps extends InternalGridProps {
  Item: typeof GridItem;
}

const Grid = InternalGrid as FinalGridProps;

Grid.Item = GridItem;

export default Grid;