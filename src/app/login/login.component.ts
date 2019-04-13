import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../shared/core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('loginDialog')
  public loginDialog: TemplateRef<any>;
  private _dialogRef: MatDialogRef<any, any>;

  constructor(private matDialog: MatDialog, private router: Router, private userService: UserService) { }

  ngOnInit() { }

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

  loginOrLogout(): void {
    if (this.userService.authenticated) {
      this.userService.logout();
    } else {
      this.userService.login();
    }

    this.closeLoginDialog();
  }

  buttonInfo(): { buttonText: string, buttonImageUrl: string } {
    return this.userService.authenticated
      ? { buttonText: `${this.userService.currentUser.displayName}, deseja sair?`, buttonImageUrl: this.userService.currentUser.photoURL }
      : { buttonText: 'Login com google', buttonImageUrl: 'assets/images/google-icon.svg' };
  }

}
