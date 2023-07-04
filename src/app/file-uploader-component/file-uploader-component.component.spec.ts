import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploaderComponentComponent } from './file-uploader-component.component';

describe('FileUploaderComponentComponent', () => {
  let component: FileUploaderComponentComponent;
  let fixture: ComponentFixture<FileUploaderComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploaderComponentComponent]
    });
    fixture = TestBed.createComponent(FileUploaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
