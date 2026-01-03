import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { App } from './app';
import { ApiService } from '@minimal-monorepo/utils-common';

describe('App', () => {

  const apiServiceMock = {
    getCourses: vitest.fn().mockReturnValue(of([])),
    getStudents: vitest.fn().mockReturnValue(of([])),
    getEnrollments: vitest.fn().mockReturnValue(of([]))
  };

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
        { provide: ApiService, useValue: apiServiceMock },
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
