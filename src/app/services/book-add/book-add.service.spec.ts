import { TestBed } from '@angular/core/testing';

import { BookAddService } from './book-add.service';

describe('BookAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookAddService = TestBed.get(BookAddService);
    expect(service).toBeTruthy();
  });
});
