import { TestBed, inject } from '@angular/core/testing';

import { BrowserFavicons } from './favicon.service';

describe('FaviconService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserFavicons]
    });
  });

  it('should be created', inject([BrowserFavicons], (service: BrowserFavicons) => {
    expect(service).toBeTruthy();
  }));
});
