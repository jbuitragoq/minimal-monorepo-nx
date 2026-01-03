import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { App } from './app';
import { of } from 'rxjs';

describe('App', () => {
  const activatedRouteMock = {
    params: of({}),
    queryParams: of({}),
    data: of({})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
