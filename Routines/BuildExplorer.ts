import {
  ChangeProduction,
  CityBuild as CityBuildAction,
} from '@civ-clone/core-city-build/PlayerActions';
import {
  CityRegistry,
  instance as cityRegistryInstance,
} from '@civ-clone/core-city/CityRegistry';
import {
  PlayerWorldRegistry,
  instance as playerWorldRegistryInstance,
} from '@civ-clone/core-player-world/PlayerWorldRegistry';
import {
  StrategyNoteRegistry,
  instance as strategyNoteRegistryInstance,
} from '@civ-clone/core-strategy/StrategyNoteRegistry';
import CityBuild from '@civ-clone/core-city-build/CityBuild';
import Normal from '@civ-clone/core-rule/Priorities/Normal';
import Priority from '@civ-clone/core-rule/Priority';
import Routine from '@civ-clone/core-strategy/Routine';
import { generateKey } from '@civ-clone/core-strategy/StrategyNote';

export class BuildExplorer extends Routine {
  #cityRegistry: CityRegistry;
  #playerWorldRegistry: PlayerWorldRegistry;
  #strategyNoteRegistry: StrategyNoteRegistry;

  constructor(
    priority: Priority = new Normal(),
    cityRegistry: CityRegistry = cityRegistryInstance,
    playerWorldRegistry: PlayerWorldRegistry = playerWorldRegistryInstance,
    strategyNoteRegistry: StrategyNoteRegistry = strategyNoteRegistryInstance
  ) {
    super(priority, CityBuildAction, ChangeProduction);

    this.#cityRegistry = cityRegistry;
    this.#playerWorldRegistry = playerWorldRegistry;
    this.#strategyNoteRegistry = strategyNoteRegistry;
  }

  attempt(playerAction: CityBuildAction | ChangeProduction): Promise<boolean> {
    // Before we build an explorer we need to check if there are:
    //  - any existing explorers - if we have too many for the space it's probably not worthwhile
    //  - unit types we can build that could be useful in this City
    //  - any risks that we'll trigger `CivilDisorder`
    //  - any risks that we'll exhaust resources

    const player = playerAction.player(),
      // Alternatively, just have a NotesRegistry? Then multiple notes could be associated via a `Unit`'s `.id()` and
      //  it could be tagged explorer or something. Could even be exposed as `AdditionalData` to the UI if needed.
      notes = this.#strategyNoteRegistry.getByKey(
        generateKey(player, BuildExplorer.name)
      ),
      cityBuild = playerAction.value() as CityBuild,
      city = cityBuild.city(),
      playerWorld = this.#playerWorldRegistry.getByPlayer(player);

    // Look for `Tile`s that aren't fully explored that are:
    //  - accessible by `Unit`-type (`Unit` can `pathTo`)
    //  - weighted by number of new `Tile`s they would expose
    //  - aren't already targeted by another `Unit` (use the `StrategyNoteRegistry`?)
  }
}

export default BuildExplorer;
