import { TestBed, inject } from '@angular/core/testing';

import { MessageInputService } from './messageInput.service';

describe('MessageInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageInputService]
    });
  });

  it('should be created', inject([MessageInputService], (service: MessageInputService) => {
    expect(service).toBeTruthy();
  }));
});
