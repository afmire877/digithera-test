import { TestBed } from '@angular/core/testing';

import { AdminLocalStorageService } from './admin-local-storage.service';

describe('AdminLocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminLocalStorageService = TestBed.get(AdminLocalStorageService);
    expect(service).toBeTruthy();
  });
});
