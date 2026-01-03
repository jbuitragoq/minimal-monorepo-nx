import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'lib-button',
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' = 'primary';
    @Input() size: 'small' | 'normal' | 'large' = 'normal';
    @Input() disabled = false;
    @Output() clickBtn = new EventEmitter<void>();

    get buttonClasses(): string {
        const classes = ['btn', `btn-${this.variant}`];

        if (this.size !== 'normal') {
            classes.push(`btn-${this.size}`);
        }

        return classes.join(' ');
    }

    onClick(): void {
        if (!this.disabled) {
            this.clickBtn.emit();
        }
    }
}