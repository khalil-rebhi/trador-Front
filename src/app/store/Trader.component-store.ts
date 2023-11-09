import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Data } from 'src/app/core/models/Data';

@Injectable()
export class TraderComponentStore extends ComponentStore<Data> {
  constructor() {
    super(new Data());
  }

  readonly trader$ = this.select((state : Data) => state)

  readonly updateTrader = this.updater((state: Data, payload: Data) => payload)
}
