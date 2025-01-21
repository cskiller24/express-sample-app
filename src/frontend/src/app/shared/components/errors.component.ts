import { Component, Input } from '@angular/core';
import { MessageModule } from 'primeng/message';

export interface Errors {
    errors: { [key: string]: string };
}

@Component({
    selector: 'app-list-errors',
    standalone: true,
    imports: [MessageModule],
    template: `
        @if (errorList) {
            <ul class="error-messages">
                @for (error of errorList; track error) {
                    <p-message severity="error">Error Message</p-message>
                }
            </ul>
        }
    `
})
export class ErrorsComponent {
    errorList: string[] = [];

    @Input() set errors(errorList: Errors | null) {
        this.errorList = errorList ? Object.keys(errorList.errors || {}).map((key) => `${key} ${errorList.errors[key]}`) : [];
    }
}
