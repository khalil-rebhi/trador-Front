import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/app/core/models/Client';
import { Store } from '@ngrx/store';
import { update_admin } from 'src/app/store/actions/user.action';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {
  @Input() user: Client | null;
  userId: number;
  modalVisible = false;

  constructor(
    private store : Store<any>
  ) {}

  ngOnInit() {
  }
  

  saveChanges() {
    if (this.user) {
      this.store.dispatch(update_admin(this.user))
    }
  }
}
