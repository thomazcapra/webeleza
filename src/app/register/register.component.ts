import { Component, AfterViewInit, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../shared/core/services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ApiService, ICardInfo } from '../shared/core/services/api/api.service';
import { NotificationService } from '../shared/core/services/notification/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class RegisterComponent implements AfterViewInit, OnInit {
  @ViewChild('registerDialog')
  public registerDialog: TemplateRef<any>;
  private _dialogRef: MatDialogRef<any, any>;

  form: FormGroup;

  constructor(private matDialog: MatDialog, private router: Router,
    private notificationService: NotificationService,
    private userService: UserService, private apiService: ApiService) {
    if (this.userService.authenticated) {
      let card: ICardInfo;

      this.apiService.getUserData()
        .then((c: ICardInfo) => {
          card = c;
        }).catch((error) => {
          this.notificationService.showError('Erro ao obter dados');
        }).finally(() => {
          this.createForm(card);
        });
    }
  }

  private createForm(card?: ICardInfo): void {
    const user = this.userService.currentUser;

    this.form = new FormGroup(
      {
        name: new FormControl(card && card.name, null),
        email: new FormControl({ value: user.email, disabled: true }, null),
        photo: new FormControl({ value: user.photoURL, disabled: true }, null),
        birthDate: new FormControl({ value: new Date(Date.now()), disabled: true }, null),
        description: new FormControl(card && card.description),
        // mainPhoto: new FormControl(m),
        phone: new FormControl(card && card.phone),
        address: new FormControl(card && card.address),
      }
    );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._dialogRef = this.matDialog.open(this.registerDialog);
      this._dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['']);
      });

      if (!this.userService.authenticated) {
        this.closeRegisterDialog();
      }
    });
  }

  closeRegisterDialog(): void {
    this._dialogRef.close();
  }

  loginOrLogout(): void {
    if (this.userService.authenticated) {
      this.userService.logout();
    } else {
      this.userService.login();
    }

    this.closeRegisterDialog();
  }

  buttonInfo(): { buttonText: string, buttonImageUrl: string } {
    return this.userService.authenticated
      ? { buttonText: `${this.userService.currentUser.displayName}, deseja sair?`, buttonImageUrl: this.userService.currentUser.photoURL }
      : { buttonText: 'Login com google', buttonImageUrl: 'assets/images/google-icon.svg' };
  }

  isAnyUser(): boolean {
    return this.userService.authenticated;
  }

  onSaveData(): void {
    const payload = this.form.getRawValue();
    this.apiService.updateData(payload);
  }
}
