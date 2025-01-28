import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';

@Component({
    selector: 'validation-messages',
    imports: [MessageModule, NgIf],
    template: `
        <ng-container *ngIf="control?.touched && control?.invalid">
            <p-message variant="outlined" *ngIf="control?.errors?.['required']" severity="error"
                       text="This field is required."></p-message>
            <p-message variant="outlined" *ngIf="control?.errors?.['email']" severity="error"
                       text="Please enter a valid email address."></p-message>
            <p-message variant="outlined" *ngIf="control?.errors?.['minlength']" severity="error"
                       text="Minimum length is {{ control?.errors?.['minlength']?.requiredLength }} characters."></p-message>
            <p-message variant="outlined" *ngIf="control?.errors?.['maxlength']" severity="error"
                       text="Maximum length is {{ control?.errors?.['maxlength']?.requiredLength }} characters."></p-message>
            <p-message variant="outlined" *ngIf="control?.errors?.['pattern']" severity="error"
                       text="The input format is invalid."></p-message>
            <p-message variant="outlined" *ngIf="control?.errors?.['min']" severity="error"
                       text="Value must be at least {{ control?.errors?.['min']?.min }}."></p-message>
            <p-message variant="outlined" *ngIf="control?.errors?.['max']" severity="error"
                       text="Value must be at most {{ control?.errors?.['max']?.max }}."></p-message>
            <p-message variant="outlined" *ngIf="control?.errors?.['custom']" severity="error"
                       text="{{ control?.errors?.['custom'] }}"></p-message>
        </ng-container>
    `,
    styles: [
        `
            p-message {
                margin: 0.5rem 0;
            }
        `
    ],
    standalone: true
})
export class ValidationMessagesComponent {
    @Input() control?: AbstractControl<any, any> | null;
}
