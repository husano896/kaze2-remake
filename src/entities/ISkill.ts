import { BattleComponent } from "@/app/pages/game/battle/battle.component";
import { IBattleData } from "@/data/battle";

interface IAttackResult {
  messages: Array<string>;
}
type AttackAction = (attacker: IBattleData, victim: IBattleData, component: BattleComponent) => void 