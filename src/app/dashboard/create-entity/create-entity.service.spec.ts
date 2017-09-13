import { TestBed, inject } from '@angular/core/testing';

import { CreateEntityService } from './create-entity.service';

describe('CreateEntityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateEntityService]
    });
  });

  it('should be created', inject([CreateEntityService], (service: CreateEntityService) => {
    expect(service).toBeTruthy();
  }));
});
