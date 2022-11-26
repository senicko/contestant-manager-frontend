import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
})
export class InputComponent {
  // required attributes
  @Input() controlName!: string;
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() group!: FormGroup;

  // optional attributes
  @Input() type: string = 'text';
  @Input() hasError: boolean = false;

  constructor() {}
}
