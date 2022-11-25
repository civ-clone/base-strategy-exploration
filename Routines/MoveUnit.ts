import ActiveUnit from '@civ-clone/base-player-action-active-unit/ActiveUnit';
import Normal from '@civ-clone/core-rule/Priorities/Normal';
import Priority from '@civ-clone/core-rule/Priority';
import Routine from '@civ-clone/core-strategy/Routine';

export class MoveUnit extends Routine {
  constructor(priority: Priority = new Normal()) {
    super(priority, ActiveUnit);
  }

  attempt(action: ActiveUnit): Promise<boolean> {
    throw new Error('Unimplemented!!');
  }
}

export default MoveUnit;
