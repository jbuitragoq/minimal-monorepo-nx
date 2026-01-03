import { TestBed } from "@angular/core/testing";
import { ButtonComponent } from './button.component';

describe('App', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ButtonComponent
            ]
        }).compileComponents();
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(ButtonComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

});
