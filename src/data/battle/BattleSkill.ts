import { SaveData } from "@/entities/SaveData"

type BattleSkillResult = {
  messages: string[], snd?: string, params?: {}
} | null | undefined

type TypeBattleSkill = (
  /** 攻擊者資料 */
  attacker: SaveData,
  /** 被攻擊者資料 */
  victim: SaveData,
  /** 被攻擊者行動 */
  victimAction: number,
  /** 攻擊者Buff */
  attackerBuff: { [buff: string]: number },
  /** 被攻擊者Buff */
  victimBuff: { [buff: string]: number },
  /** 攻擊者類型, 1 = 我方, 0 = 敵方 */
  attackerID: number) => BattleSkillResult

const varATPat = new Array(
  /** 
  "鋭い牙で噛みついた！",
  "尻尾で素早く払った！",
  "頭突きした！",
  "突進した！",
  "引っかいた！",
  "体当たりをした！"
  */
  'Game.Battle.Attack.Type1',
  'Game.Battle.Attack.Type2',
  'Game.Battle.Attack.Type3',
  'Game.Battle.Attack.Type4',
  'Game.Battle.Attack.Type5',
  'Game.Battle.Attack.Type6',
);

// 通常攻撃
function PS_Attack(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  var varLv = (attacker.Maxhp + attacker.at + attacker.df + attacker.speed - 10 - attacker.lv) / 12 + 1;
  var varI = Math.round(attacker.at - (victim.df * 0.8));
  if (varI < 1) varI = 1;
  const varAns = Math.max(1, Math.round((varI + Math.random() * varLv) * 0.6 + Math.random() * 5));

  const pat = varATPat[Math.round(Math.random() * 5)]
  if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [
      'Game.Battle.Attack.Base',
      'Game.Battle.Fail.Dodge'
    ];

    return { messages, params: { pat } }
  } else if (victimAction == 2) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [
      'Game.Battle.Attack.Base',
      'Game.Battle.Fail.SpecialAttackRange'
    ];
    return {
      messages, params: { pat }
    }
  }
  victim.hp = victim.hp - varAns;
  attackerID
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [
    'Game.Battle.Attack.Base',
    'Game.Battle.Damage.ToVictim.1'
  ];
  return { messages, snd: attackerID ? 'snd01' : 'snd02', params: { pat } };
}

// 防御
function PS_Bougyo(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  // varMsgColor[0] = L_MColor;
  const messages = ['Game.Battle.Counter.Content'];
  return { messages };
}

// 回避
function PS_Kaihi(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  const snd = ('snd08');
  const varAns = Math.round((Math.random() * 10) + (attacker.Maxhp * 0.1));
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  // varMsgColor[2] = L_MColor;
  const messages = [`Game.Battle.Dodge.Content`];
  attacker.hp += varAns;
  return { messages, snd, };
}

// 属性アタック
function PS_ElementAt(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  let snd = '';
  var varLv = (attacker.Maxhp + attacker.at + attacker.df + attacker.speed - 10 - attacker.lv) / 12 + 1;
  var varI = Math.round(attacker.at - (victim.df * 0.8));
  if (varI < 1) varI = 1;
  let varAns = Math.round((varI + Math.random() * varLv) * 0.6 + Math.random() * 5);

  if (attacker.element1 < 50) {
    if ((victim.element2 < 50) && ((victimBuff['Flg00']) <= 0))
      varAns = Math.round(varAns * 1.5);	// 風属性の場合は倍ダメージ(炎防壁術 がかかってる時は無効)
    if (victim.element1 > 50)
      varAns = Math.round(varAns * 0.7);						// 水属性の場合は減倍ダメージ
  } else if (attacker.element1 > 50) {
    if ((victim.element1 < 50) && ((!victimBuff['Flg01'])))
      varAns = Math.round(varAns * 1.5);	// 炎属性の場合は倍ダメージ(水防壁術 がかかってる時は無効)
    if (victim.element2 > 50)
      varAns = Math.round(varAns * 0.7);						// 地属性の場合は減倍ダメージ
  } else if (attacker.element2 < 50) {
    if ((victim.element2 > 50) && ((!victimBuff['Flg01'])))
      varAns = Math.round(varAns * 1.5);	// 地属性の場合は倍ダメージ(風防壁術 がかかってる場合無効)
    if (victim.element1 < 50)
      varAns = Math.round(varAns * 0.7);						// 炎属性の場合は減倍ダメージ
  } else if (attacker.element2 > 50) {
    if ((victim.element1 > 50) && ((!victimBuff['Flg01'])))
      varAns = Math.round(varAns * 1.5);	// 水属性の場合は倍ダメージ(地防壁術 がかかってる場合は無効)
    if (victim.element2 < 50)
      varAns = Math.round(varAns * 0.7);						// 風属性の場合は減倍ダメージ
  }
  if (varAns < 1) { varAns = 1; }

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [
      `Game.Battle.SpecialAttack.19`,
      `Game.Battle.Fail.Buff`];
    return { messages }
  } else if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [
      `Game.Battle.SpecialAttack.19`,
      `Game.Battle.Fail.Dodge`];
    return { messages }
  }
  if (victimAction == 3) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [
      `Game.Battle.SpecialAttack.19`,
      `Game.Battle.Counter.Action`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns; if (attacker.hp < 1) { attacker.hp = 0; }
    attackerID
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }
    return { messages, snd }
  }
  if (victimBuff['Flg04']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.19`,
      `Game.Battle.Counter.Buff`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }
    return { messages, snd, params: { buffName: 'Data.Skill.04.Title' } }
  }

  victim.hp = victim.hp - varAns;
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.19`,
    `Game.Battle.Damage.ToVictim.1`];
  if (attackerID) {
    snd = ('snd01'); // PS_Shock2();
  } else {
    snd = ('snd02'); // PS_Shock(varAns);
  }

  return { messages, snd }
}


// ナイトメア･ハズ･ビガン
function PS_Masic18(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 262144) || (attacker.mp <= 0)) {
    return;
  }
  let varAns = Math.round(attacker.at * ((Math.random() * 4 + 2) * 0.1 + 1));
  let snd = '';
  if ((attacker.hp - Math.round(varAns / 2)) <= 0) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.00.FailHP`];
    return { messages, }
  }

  attacker.mp = 0;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.Fail.Buff`];
    return { messages }
  } else if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`, `Game.Battle.Fail.Dodge`];
    return { messages, params: { buffName: 'Data.Skill.04.Title' } }
  }
  if (victimAction == 3) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    varAns *= 2;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.Counter.Action2`,
      `Game.Battle.SpecialAttack.00.Counter`];
    attacker.hp = attacker.hp - varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }
    return { messages, snd, }
  }
  if (victimBuff['Flg04']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    varAns *= 2;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.SpecialAttack.00.CounterBuff`];
    attacker.hp = attacker.hp - varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }

    return { messages, snd, }
  }

  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  // varMsgColor[2] = L_MColor;
  let varAnsToAttacker = Math.round(varAns / 2);
  const messages = [`Game.Battle.SpecialAttack.Init`,
    `Game.Battle.SpecialAttack.00.Success`];
  victim.hp -= varAns;
  attacker.hp -= varAnsToAttacker;

  if (attackerID) {
    snd = ('snd01'); // PS_Shock2(); // PS_Shock(varAns);
  } else {
    snd = ('snd02'); // PS_Shock2(); // PS_Shock(varAns);
  }

  return { messages, snd, }
}

// エンド･オブ･アイズ
function PS_Masic17(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 131072) || (attacker.mp < 70)) {
    return
  }
  let snd = '';
  attacker.mp -= 70;
  const varAns = Math.round(attacker.at * ((Math.random() * 10 + 60) * 0.01));

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.Fail.Buff`];
    return { messages }
  } else if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.Fail.Dodge`];
    return { messages }
  }
  if (victimAction == 3) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.Counter.Action2`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }
    return { messages, snd, }
  }
  if (victimBuff['Flg04']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.Counter.Buff`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }

    return { messages, snd, params: { buffName: 'Data.Skill.04.Title' } }
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init`,
    `Game.Battle.SpecialAttack.01`];
  victim.hp -= varAns;
  if (attackerID) {
    snd = ('snd01'); // PS_Shock2();
  } else {
    snd = ('snd02'); // PS_Shock(varAns);
  }

  return { messages, snd, }


}

// メガラース
function PS_Masic16(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 65536) || (attacker.mp < 50)) {
    return;
  }
  attacker.mp -= 50;
  let snd = '';
  let varAns = Math.round(attacker.at * ((Math.random() * 15 + 40) * 0.01));
  if (varAns < 0) varAns = 1;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.Fail.Buff`];
    return { messages }
  }
  if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.Fail.Dodge`];
    return { messages }
  }
  if (victimAction == 3) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.Counter.Action2`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }
    return { messages, snd }
  }
  if (victimBuff['Flg04']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.Counter.Buff`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }

    return { messages, snd, params: { buffName: 'Data.Skill.04.Title' } }
  }
  if (varAns > 1) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.SpecialAttack.02.Success`,
      `Game.Battle.Damage.ToVictim.2`];
    victim.hp -= varAns;
    if (attackerID) {
      snd = ('snd01'); // PS_Shock2();
    } else {
      snd = ('snd02'); // PS_Shock(varAns);
    }

    return { messages, snd }
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init`,
    `Game.Battle.SpecialAttack.02.Fail`]
  return { messages }

}

// インフェルノ(地獄)
function PS_Masic15(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 32768) || (attacker.mp < 20)) {
    return;
  }
  let snd = '';
  attacker.mp -= 20;
  let varAns = Math.round(attacker.at * ((Math.random() * 15 + 20) * 0.01));
  if (varAns < 0) varAns = 1;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.Fail.Buff`];
    return { messages }
  }
  if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.Fail.Dodge`];
    return { messages }
  }
  if (victimAction == 3) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.Counter.Action2`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }
    return { messages, snd }
  }
  if (victimBuff['Flg04']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.SpecialAttack.03.Counter`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }

    return { messages, snd, params: { buffName: 'Data.Skill.04.Title' } }
  }
  if (varAns > 1) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init`,
      `Game.Battle.SpecialAttack.03.Success`,
      `Game.Battle.Damage.ToVictim.3`];
    victim.hp -= varAns;
    if (attackerID) {
      snd = ('snd01'); // PS_Shock2();
    } else {
      snd = ('snd02'); // PS_Shock(varAns);
    }

    return { messages, snd }
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init`,
    `Game.Battle.SpecialAttack.03.Fail`];
  return { messages }
}

// 炎の吐息
function PS_Masic14(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 16384) || (attacker.mp < 10)) {
    return
  }
  attacker.mp -= 10;
  let snd = '';
  var varLv = (attacker.Maxhp + attacker.at + attacker.df + attacker.speed - 10 - attacker.lv) / 12 + 1;

  let varAns = (50 - attacker.element1);
  if (varAns > 50) varAns = 50;
  if (attacker.element1 == 99999999) varAns = 100; //ラスボス用
  varAns += Math.round(varLv) + Math.round(Math.random() * 15);
  if (attacker.element1 > 50) varAns = 1;

  if (victim.element1 == 99999999) victim.element1 = 50; //ラスボス用
  if (victim.element2 == 99999999) victim.element2 = 50; //ラスボス用
  if ((victim.element2 < 50) && ((victimBuff['Flg00']) <= 0)) varAns = Math.round(varAns * 1.5);	// 風属性の場合は倍ダメージ(炎防壁術がかかってる時は無効)
  if (victim.element1 > 50) varAns = Math.round(varAns * 0.7);						// 水属性の場合は減倍ダメージ
  varAns += Math.round(Math.random() * 5);
  if (varAns < 0) varAns = 1;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.SpecialAttack.04.FailBuff`];
    return { messages }
  }
  if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Fail.Dodge`];
    return { messages }
  }
  if (victimAction == 3) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Counter.Action2`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }
    return { messages, snd, }
  }
  if (victimBuff['Flg00']) {
    varAns = 1;
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Block.Buff`,
      `Game.Battle.Damage.ToVictim.2`];
    victim.hp -= varAns;
    if (attackerID) {
      snd = ('snd01'); // PS_Shock2();
    } else {
      snd = ('snd02'); // PS_Shock(varAns);
    }

    return { messages, snd, params: { buffName: 'Data.Skill.0.Title' } }
  }
  if (victimBuff['Flg04']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Counter.Buff`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }

    return { messages, snd, params: { buffName: 'Data.Skill.04.Title' } }
  }
  if (varAns > 1) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.SpecialAttack.04.Success`,
      `Game.Battle.Damage.ToVictim.3`];
    victim.hp -= varAns;
    if (attackerID) {
      snd = ('snd01'); // PS_Shock2();
    } else {
      snd = ('snd02'); // PS_Shock(varAns);
    }
    return { messages, snd, }
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init2`,
    `Game.Battle.SpecialAttack.04.Fail`];
  return { messages }

}


// 竜の氷息
function PS_Masic13(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 8192) || (attacker.mp < 10)) {
    return;
  }

  let snd = '';
  attacker.mp -= 10;
  var varLv = (attacker.Maxhp + attacker.at + attacker.df + attacker.speed - 10 - attacker.lv) / 12 + 1;

  let varAns = (attacker.element1 - 50);
  if (varAns > 50) varAns = 50;
  if (attacker.element1 == 99999999) varAns = 100; //ラスボス用
  varAns += Math.round(varLv) + Math.round(Math.random() * 15);
  if (attacker.element1 < 50) varAns = 1;

  if (victim.element1 == 99999999) victim.element1 = 50; //ラスボス用
  if (victim.element2 == 99999999) victim.element2 = 50; //ラスボス用
  if ((victim.element1 < 50) && ((!victimBuff['Flg01']))) varAns = Math.round(varAns * 1.5);		// 炎属性の場合は倍ダメージ(水防壁術がかかってる時は無効)
  if (victim.element2 > 50) varAns = Math.round(varAns * 0.7);							// 地属性の場合は減倍ダメージ
  varAns += Math.round(Math.random() * 5);
  if (varAns < 0) varAns = 1;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.SpecialAttack.05.FailBuff`];
    return { messages }
  }
  if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Fail.Dodge`];
    return { messages }
  }
  if (victimAction == 3) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Counter.Action2`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }

    return { messages, snd, }
  }
  if (victimBuff['Flg03']) {
    varAns = 1;
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Block.Buff`,
      `Game.Battle.Damage.ToVictim.2`];
    victim.hp -= varAns;
    if (attackerID) {
      snd = ('snd01'); // PS_Shock2();
    } else {
      snd = ('snd02'); // PS_Shock(varAns);
    }
    return { messages, snd, params: { buffName: 'Data.Skill.03.Title' } }
  }
  if (victimBuff['Flg04']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Counter.Buff`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }
    return { messages, snd, params: { buffName: 'Data.Skill.04.Title' } }
  }
  if (varAns > 1) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.SpecialAttack.05.Success`,
      `Game.Battle.Damage.ToVictim.3`];
    victim.hp -= varAns;
    if (attackerID) {
      snd = ('snd01'); // PS_Shock2();
    } else {
      snd = ('snd02'); // PS_Shock(varAns);
    }

    return { messages, snd, }
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init2`,
    `Game.Battle.SpecialAttack.05.Fail`];
  return { messages }
}


// 岩の砕息
function PS_Masic12(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 4096) || (attacker.mp < 10)) {
    return;
  }

  let snd = '';
  attacker.mp -= 10;
  var varLv = (attacker.Maxhp + attacker.at + attacker.df + attacker.speed - 10 - attacker.lv) / 12 + 1;

  let varAns = (attacker.element2 - 50);
  if (varAns > 50) varAns = 50;
  if (attacker.element2 == 99999999) varAns = 100; //ラスボス用
  varAns += Math.round(varLv) + Math.round(Math.random() * 15);
  if (attacker.element2 < 50) varAns = 1;

  if (victim.element1 == 99999999) victim.element1 = 50; //ラスボス用
  if (victim.element2 == 99999999) victim.element2 = 50; //ラスボス用
  if ((victim.element1 > 50) && ((!victimBuff['Flg01']))) varAns = Math.round(varAns * 1.5);	// 水属性の場合は倍ダメージ(地防壁術がかかってる場合は無効)
  if (victim.element2 < 50) varAns = Math.round(varAns * 0.7);						// 風属性の場合は減倍ダメージ
  varAns += Math.round(Math.random() * 5);
  if (varAns < 0) varAns = 1;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.SpecialAttack.06.FailBuff`];
    return { messages }
  }
  if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Fail.Dodge`];
    return { messages }
  }
  if (victimAction == 3) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Counter.Action2`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }
    return { messages, snd }
  }
  if (victimBuff['Flg02']) {
    varAns = 1;
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Block.Buff`,
      `Game.Battle.Damage.ToVictim.2`];
    victim.hp -= varAns;
    if (attackerID) {
      snd = ('snd01'); // PS_Shock2();
    } else {
      snd = ('snd02'); // PS_Shock(varAns);
    }

    return { messages, snd, params: { buffName: 'Data.Skill.02.Title' } }
  }
  if (victimBuff['Flg04']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Counter.Buff`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }

    return { messages, snd, params: { buffName: 'Data.Skill.04.Title' } }
  }
  if (varAns > 1) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.SpecialAttack.06.Success`,
      `Game.Battle.Damage.ToVictim.3`];
    victim.hp -= varAns;
    if (attackerID) {
      snd = ('snd01'); // PS_Shock2();
    } else {
      snd = ('snd02'); // PS_Shock(varAns);
    }

    return { messages, snd }
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init2`,
    `Game.Battle.Fail.NoEffectOnVictim`];
  return { messages }

}

// 竜の風息
function PS_Masic11(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 2048) || (attacker.mp < 10)) {
    return;
  }
  attacker.mp -= 10;
  let snd = '';
  var varLv = (attacker.Maxhp + attacker.at + attacker.df + attacker.speed - 10 - attacker.lv) / 12 + 1;

  let varAns = (50 - attacker.element2);
  if (varAns > 50) varAns = 50;
  if (attacker.element2 == 99999999) varAns = 100; //ラスボス用
  varAns += Math.round(varLv) + Math.round(Math.random() * 15);
  if (attacker.element2 > 50) varAns = 1;

  if (victim.element1 == 99999999) victim.element1 = 50; //ラスボス用
  if (victim.element2 == 99999999) victim.element2 = 50; //ラスボス用
  if ((victim.element2 > 50) && ((!victimBuff['Flg01']))) varAns = Math.round(varAns * 1.5);	// 地属性の場合は倍ダメージ(風防壁術がかかってる場合無効)
  if (victim.element1 < 50) varAns = Math.round(varAns * 0.7);						// 炎属性の場合は減倍ダメージ
  varAns += Math.round(Math.random() * 5);
  if (varAns < 0) varAns = 1;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.SpecialAttack.07.FailBuff`];
    return { messages }
  } if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Fail.Dodge`];
    return { messages }
  } else if (victimAction == 3) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Counter.Action2`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }
    return { messages, snd }
  }
  if (victimBuff['Flg01']) {
    varAns = 1;
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Block.Buff`,
      `Game.Battle.Damage.ToVictim.2`];
    victim.hp -= varAns;
    if (attackerID) {
      snd = ('snd01'); // PS_Shock2();
    } else {
      snd = ('snd02'); // PS_Shock(varAns);
    }

    return { messages, snd, params: { buffName: 'Data.Skill.01.Title' } }
  }
  if (victimBuff['Flg04']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.Counter.Buff`,
      `Game.Battle.Damage.ToAttacker.1`];
    attacker.hp -= varAns;
    if (attackerID) {
      snd = ('snd02'); // PS_Shock(varAns);
    } else {
      snd = ('snd01'); // PS_Shock2();
    }

    return { messages, snd, params: { buffName: 'Data.Skill.04.Title' } }
  }
  if (varAns > 1) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init2`,
      `Game.Battle.SpecialAttack.07.Success`,
      `Game.Battle.Damage.ToVictim.3`];
    victim.hp -= varAns;
    if (attackerID) {
      snd = ('snd01'); // PS_Shock2();
    } else {
      snd = ('snd02'); // PS_Shock(varAns);
    }

    return { messages, snd }
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init2`,
    `Game.Battle.SpecialAttack.07.Fail`];
  return { messages }

}

// ロスト
function PS_Masic10(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 1024) || (attacker.mp < 20) || (victim.speed <= 4)) {
    return;
  }
  attacker.mp -= 20;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init4`,
      `Game.Battle.SpecialAttack.08.FailBuff`]
    return { messages };
  }
  if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init4`,
      `Game.Battle.Fail.Dodge`];
    return { messages };
  }
  if (victimAction == 3) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init4`,
      `Game.Battle.Counter.Action2`,
      `Game.Battle.SpecialAttack.08.Counter`];
    attacker.speed = Math.round(attacker.speed * 0.8);
    return { messages };
  }
  if (victimBuff['Flg04']) {
    attacker.speed = Math.round(attacker.speed * 0.8);
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init4`,
      `Game.Battle.Counter.Buff`,
      `Game.Battle.SpecialAttack.08.Counter`];
    return { messages, params: { buffName: 'Data.Skill.04' } }
  }
  if (Math.round(Math.random() * 3) > 1) {
    victim.speed = Math.round(victim.speed * 0.6);
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init4`,
      `Game.Battle.SpecialAttack.08.Success`];
    return { messages }
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init4`,
    `Game.Battle.SpecialAttack.08.Fail`];
  return { messages }
}

// 再生の霧
function PS_Masic09(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 512) || (attacker.mp < 50) || (attacker.hp >= (attacker.Maxhp / 3))) {
    return;
  }
  const snd = ('snd08');
  attacker.mp -= 50;
  const varAns = Math.round((Math.random() * 20) + (attacker.Maxhp * 0.6));

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init5`,
      `Game.Battle.SpecialAttack.09.FailBuff`];
    return { messages }
  }
  attacker.hp += varAns;
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  // varMsgColor[2] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init5`,
    `Game.Battle.SpecialAttack.09.Success`];
  return { messages, snd };

}


// リカーブ
function PS_Masic08(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 256) || (attacker.mp < 10) || (attacker.hp > (attacker.Maxhp / 2))) {
    return
  }
  attacker.mp -= 10;
  const snd = ('snd08');
  const varAns = Math.round((Math.random() * 20) + (attacker.Maxhp * 0.3));

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init4`,
      `Game.Battle.Fail.Buff`];
    return { messages }
  }

  attacker.hp += varAns;
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  // varMsgColor[2] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init4`,
    `Game.Battle.SpecialAttack.10`];
  return { messages, snd }
}


// ドレーン
function PS_Masic07(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 128) || (attacker.mp < 40) || (attacker.hp > (attacker.Maxhp / 2))) {
    return
  }
  attacker.mp -= 40;
  const varAns = Math.round((Math.random() * 20) + (attacker.Maxhp * 0.3));

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Fail.Buff`];
    return { messages }
  }
  if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Fail.Dodge`];
    return { messages }
  }
  if (victimAction == 3) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Counter.Action2`,
      `Game.Battle.Fail.NoEffectOnVictim`]
    return { messages }
  }
  if (victimBuff['Flg04']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Counter.Buff`,
      `Game.Battle.Fail.NoEffectOnVictim`];
    return { messages, params: { buffName: 'Data.Skill.04.Title' } }
  }

  let snd = '';
  attacker.hp += varAns;
  victim.hp -= varAns;
  if (victim.hp < 0) victim.hp = 0;
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  // varMsgColor[2] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init3`,
    `Game.Battle.SpecialAttack.11`];
  if (attackerID) {
    snd = ('snd01'); // PS_Shock2();
  } else {
    snd = ('snd02'); // PS_Shock(varAns);
  }
  return { messages, snd }

}


// スペウォール（相手術封印)
function PS_Masic06(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 64) || (attacker.mp < 30) || (attackerBuff['Flg06'])) {
    return
  }
  attacker.mp -= 30;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Fail.Buff`];
    return { messages }
  } else if (victimBuff['Flg04']) {
    victimBuff['Flg06'] = 3;				// スペウォール3ターンまで有効
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Counter.Buff`,
      `Game.Battle.SpecialAttack.12`];
    return { messages, params: { buffName: 'Data.Skill.04.Title' } }
  } else if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Fail.Dodge`];
    return { messages }
  } else if (victimAction == 3) {
    victimBuff['Flg06'] = 3;				// スペウォール3ターンまで有効
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Counter.Action2`,
      `Game.Battle.SpecialAttack.12`];
    return { messages }
  }
  attackerBuff['Flg06'] = 3;			// スペウォール3ターンまで有効
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init3`,
    `Game.Battle.SpecialAttack.12`];
  return { messages }

}
// リプレス(ＨＰ交換)
function PS_Masic05(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 32) || (attacker.mp < 30)) {
    return;
  }
  attacker.mp -= 30;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Fail.Buff`];
    return { messages }
  } if ((victimAction == 4) && (Math.random() * 10 > 5)) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Fail.Dodge`];
    return { messages }
  }
  if (victimAction == 3) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Counter.Action2`,
      `Game.Battle.Fail.NoEffectOnVictim`];
    return { messages }
  }
  if (victimBuff['Flg04']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Counter.Buff`,
      `Game.Battle.Fail.NoEffectOnVictim`];
    return { messages, params: { buffName: 'Data.Skill.04.Title' } }
  }
  if (Math.round((Math.random() * 7)) == 1) {
    const varAns = attacker.hp; attacker.hp = victim.hp; victim.hp = varAns;
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    // varMsgColor[2] = L_MColor;
    const messages = [
      `Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.SpecialAttack.13.Success`];
    return { messages }
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [
    `Game.Battle.SpecialAttack.Init3`,
    `Game.Battle.SpecialAttack.13.Fail`];
  return { messages }
}


// リフレックス(技反射術：自分にかける)
function PS_Masic04(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 16) || (attacker.mp < 55) || (attackerBuff['Flg04'])) {
    return;
  }
  attacker.mp -= 55;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Fail.Buff`];
    return { messages };
  } else if (Math.round(Math.random() * 4) >= 1) {
    attackerBuff['Flg04'] = 3;
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.SpecialAttack.14`];
    return { messages, snd: 'sndCounter' }
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init3`,
    `Game.Battle.Fail.ChanceLarge`];
  return { messages }
}


// 水防壁術
function PS_Masic03(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 8) || (attacker.mp < 3) || (attackerBuff['Flg03'])) {
    return
  }
  attacker.mp -= 3;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Fail.Buff`];
  } else if (Math.round((Math.random() * 3)) > 1) {
    attackerBuff['Flg03'] = 6;
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.SpecialAttack.15`];
    return { messages, snd: 'sndCounter' }
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init3`,
    `Game.Battle.Fail.NoEffect`];
  return { messages }

}


// 地防壁術
function PS_Masic02(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 4) || (attacker.mp < 3) || (attackerBuff['Flg02'])) {
    return;
  }
  attacker.mp -= 3;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Fail.Buff`];
    return { messages }
  }
  if (Math.round((Math.random() * 3)) > 1) {
    attackerBuff['Flg02'] = 6;
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.SpecialAttack.16`];
    return { messages, snd: 'sndCounter' }
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init3`,
    `Game.Battle.Fail.NoEffect`];
  return { messages }
}


// 風防壁術
function PS_Masic01(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 2) || (attacker.mp < 3) || (attackerBuff['Flg01'])) {
    return
  }
  attacker.mp -= 3;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Fail.Buff`];
    return { messages }
  }
  if (Math.round((Math.random() * 3)) > 1) {
    attackerBuff['Flg01'] = 6;
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.SpecialAttack.17`];
    return { messages, snd: 'sndCounter' }
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init3`,
    `Game.Battle.Fail.NoEffect`];
  return { messages }
}


// 炎防壁術
function PS_Masic00(attacker: SaveData, victim: SaveData, victimAction: number, attackerBuff: { [buff: string]: number }, victimBuff: { [buff: string]: number }, attackerID: number): BattleSkillResult {
  if (!(attacker.magicS & 1) || (attacker.mp < 3) || (attackerBuff['Flg00'])) {
    return;
  }
  attacker.mp -= 3;

  if (victimBuff['Flg06']) {
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.Fail.Buff`];
    return { messages }
  }
  if (Math.round((Math.random() * 3)) > 1) {
    attackerBuff['Flg00'] = 6;
    // varMsgColor[0] = L_MColor;
    // varMsgColor[1] = L_MColor;
    const messages = [`Game.Battle.SpecialAttack.Init3`,
      `Game.Battle.SpecialAttack.18`];
    return { messages, snd: 'sndCounter' };
  }
  // varMsgColor[0] = L_MColor;
  // varMsgColor[1] = L_MColor;
  const messages = [`Game.Battle.SpecialAttack.Init3`, `Game.Battle.Fail.NoEffect`];
  return { messages }
}

const BattleSkills: { [skillID: number]: TypeBattleSkill } = {
  18: PS_Masic18,// ナイトメア･ハズ･ビガン
  17: PS_Masic17,// エンド･オブ･アイズ
  16: PS_Masic16,// メガラース
  15: PS_Masic15,// インフェルノ
  14: PS_Masic14,// 炎の吐息
  13: PS_Masic13,// 竜の氷息
  12: PS_Masic12,// 岩の砕息
  11: PS_Masic11,// 竜の風息
  10: PS_Masic10,// ロスト
  9: PS_Masic09,// 再生の霧
  8: PS_Masic08,// リカーブ
  7: PS_Masic07,// ドレーン
  6: PS_Masic06,// スペウォール
  5: PS_Masic05,// リプレス
  4: PS_Masic04,// リフレックス
  3: PS_Masic03,// 水防壁術
  2: PS_Masic02,// 地防壁術
  1: PS_Masic01,// 風防壁術
  0: PS_Masic00,// 炎防壁術
  19: PS_ElementAt,	// 属性アタック
  20: PS_Attack,	// 通常攻撃
  98: PS_Kaihi,	// 回避
  99: PS_Bougyo,	// 防御
}
export { type TypeBattleSkill, BattleSkills, type BattleSkillResult }