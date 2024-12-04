import { TestBed } from '@angular/core/testing';

import { BattleListService } from './battle-list.service';

describe('BattleListService', () => {
  let service: BattleListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
