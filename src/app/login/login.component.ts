import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('loginDialog')
  public loginDialog: TemplateRef<any>;
  private _dialogRef: MatDialogRef<any, any>;

  constructor(private matDialog: MatDialog, private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this._dialogRef = this.matDialog.open(this.loginDialog);

      this._dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['']);
      });
    });
  }

  closeLoginDialog(): void {
    this._dialogRef.close();
  }
}
