import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
})
export class DividerComponent {
  @Input() text!: string;

  constructor() {}
}
