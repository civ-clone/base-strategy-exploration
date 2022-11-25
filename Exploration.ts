import Normal from '@civ-clone/core-rule/Priorities/Normal';
import Priority from '@civ-clone/core-rule/Priority';
import Strategy from '@civ-clone/core-strategy/Strategy';
import BuildExplorer from './Routines/BuildExplorer';
import MoveUnit from './Routines/MoveUnit';

export class Exploration extends Strategy {
  constructor(priority: Priority = new Normal()) {
    super(priority, new BuildExplorer(), new MoveUnit());
  }
  //
  // async attempt(action: ActiveUnit): Promise<boolean> {
  //   const unit = action.value() as Unit;
  //
  //   // TODO: Don't want to filter all the tiles each time, this strategy is likely to be associated with a specific user
  //   //  so this could cache which tiles have neighbouring `UndiscoveredTile`s and target those, instead of working that
  //   //  out each turn. Could also implement `Rule`s for `player:visibility-changed` to monitor this more efficiently.
  //   let candidates = this.#undiscoveredTiles
  //     .filter((tile) => tile.getNeighbours().some((tile) => this.#playerWorld.getByTile(tile) !== null) &&
  //       // TODO: Not sure that this is generic enough...
  //       unit instanceof LandUnit ? tile.terrain() instanceof Land : (
  //         unit instanceof Naval ? tile.terrain() instanceof Water : unit instanceof Air
  //   )
  //     )
  //     .sort((a, b) => a.distanceFrom(unit.tile()) - b.distanceFrom(unit.tile()));
  //
  //   if (candidates.length === 0) {
  //     return false;
  //   }
  //
  //   // TODO: check continent IDs is the same, is that covered by `GoTo`?
  //
  //   // const [candidate] = candidates;
  //   //
  //   // new GoTo(unit, candidate);
  //   //
  //   // return true;
  //
  //   return false;
  // }
}

export default Exploration;
