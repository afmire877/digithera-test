import { NgModule } from '@angular/core';

import { MatCardModule, MatInputModule, MatButtonModule } from '@angular/material';

const modules = [MatCardModule, MatInputModule, MatButtonModule];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
