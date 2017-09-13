import { TestBed, inject } from '@angular/core/testing';

import { SelectedEntityService } from './selected-entity.service';

describe('SelectedEntityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedEntityService]
    });
  });

  it('should be created', inject([SelectedEntityService], (service: SelectedEntityService) => {
    expect(service).toBeTruthy();
  }));
});
