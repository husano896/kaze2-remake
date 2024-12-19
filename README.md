# 竜の風詩2 "Dragon's Wind Poem 2" Remake

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Copyrights

This project is a **fanmade** project that not associated with the official game [http://www.game-can.com/kaze2.htm].

All assets are belong to their owners, and I got permission from Author (@GaryuTown on X) to remake this game.

## Target

Remake the game in Angular and support modern browsers (sorry IE) with Responsive Web Design(RWD).

Mobile device support is also planned with PWA support, and expected to provide 仔竜の風詩 like UI layouts.

## Todo

- [] Index
  - [x] Docs1
  - [x] Docs2
  - [x] Docs3
  - [] New game (Currently works in local)
  - [] Continue (Currently works in local)
  - [x] Credits
- [] Game Menu
  - Delete save
- [] Game System
  - [] Saving / Loading (Currently works in local)
  - [x] Items
  - [x] Skins
  - [x] Battle
    - [x] Point shop
    - [x] Battle system (originally in CGI)
    - [x] Skill setting
  - [x] Gain in game money
    - [x] Minigame 1 (Slot machine)
    - [x] Minigame 2 (Chess)
    - [x] Minigame 3 (Number board)
  - [x] Dialogue system
  - [x] Maps
  - [x] Dungeon system
    - [x] lv0 / lv4 (發作藥)
    - [x] lv1
    - [x] lv2
    - [x] lv3
- [] Events
  - [x] Opening
  - [x] Endings
  - [x] Progress
  - [] Home events (39/100)
    - [x] (1~20) 初回檢診
    - [x] (21~30) 二次檢診
    - [] (31~40) 三次檢診
    - [] (41~50) 四次檢診
    - [] (51~60) 五次檢診
    - [] (61~70) 六次檢診
    - [] (71~80) 七次檢診
    - [] (81~90) 八次檢診
    - [] (91~100) 最後次檢診
  - [] Map Events
    - [x] Games04 (神獸)
    - [] Games07 滅びの都ヒディール
    - [x] Quest01 (トピリアの森)
    - [x] Quest02 (カザリナ山・幸いの地フッフール)
    - [x] Quest03 (ドラゴンの古代遺跡)
    - [x] Quest04 (幻の浮島ラグナルクス)
    - [] Quest05 (飛竜保護区ドラゴンバレー)
    - [x] Quest06 (魔獣の森)
    - [x] Quest07 (忘れ去られし古城)
    - [] Quest08 (サラ平原)
    - [] Quest09 (街の雑木林)
    - [] Quest10 (ウリア大砂漠地帯)
- [] I18n
  - [] Japanese (ja)
  - [] Traditional Chinese (zh_hant)
  - [] English (en) 
- [] API
  - [x] Battle (with old game-can version data)
    - [GET] /api/battle?battlePower=:battlePower 
    - [GET] /api/battle/:battleID
  - [] Save / Load
  - [] Ranking...? (Low priority)

## Minor Changes

- In Dragongame, owned item list (アイテム一覧) and skins (容姿変更) now merged into "inventory" page, and showing status on the right window. 
- In Dragongame, item shop (道具購入) and food shop (餌をやる) now merged into "shop" page, and the "food" tab and the action button will be light up when the dragon is ready to eat.
- In Dragongame, action buttons down below will be disabled if turn is not enough.
- In Dragongame, actions buttons are now merged to be more friendly to mobile devices.
- In message window, NEXT button is removed, you can now click on the message window to continue.
- In Quest07 (古城 / ヴァンパネラ), revisit after quest is completed, HP & Love changes that not shown in scripts are cancelled.
- In Minigame01 "SLOT Machine" (街 の 資 金 配 給 所), rewards list details can be collapsed, 
- In all minigames, Start button will be disabled instead of showing "turn is not enough" message.
- In battle point redeem (褒 賞 贈 呈 所), rewards will automatically be redeemed without clicking "check" button.