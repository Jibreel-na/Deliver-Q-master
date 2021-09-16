import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
  isLogin: number;

  constructor(public dialog: MatDialog,
              private matDialogRef: MatDialogRef<GuestComponent>) {
    this.matDialogRef.disableClose = true;

  }

  saveURL(){
    localStorage.setItem('url' , '/new-shipment');
  }

  loginGuest(){
    this.isLogin = 1;
    this.matDialogRef.beforeClosed().subscribe(() => this.matDialogRef.close(this.isLogin));
    this.dialog.closeAll();
  }

  ngOnInit(): void {
  }

}
