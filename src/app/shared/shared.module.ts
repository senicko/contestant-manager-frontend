import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerComponent } from './divider/divider.component';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DividerComponent, HeaderComponent, InputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [HeaderComponent, InputComponent],
})
export class SharedModule {}
