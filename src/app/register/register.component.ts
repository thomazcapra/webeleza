import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MatDialog, MatDialogRef, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import { ICardInfo } from '@webeleza/models';
import { ApiService, NotificationService } from '@webeleza/services';
import { UserService } from '../shared/core/services/user/user.service';

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
  private _file: File;
  public mainPhotoUrl: string;
  public loadingImage: boolean;

  form: FormGroup;

  constructor(private matDialog: MatDialog, private router: Router,
    private notificationService: NotificationService,
    private userService: UserService, private apiService: ApiService) {

    if (this.userService.authenticated) {
      this.userService.getUserData()
        .then((c: ICardInfo) => {
          this.createForm(c);
        }).catch((error) => {
          this.notificationService.showError('Erro ao obter dados do usuário');
        });
    }
  }

  private createForm(card?: ICardInfo): void {
    this.form = new FormGroup(
      {
        address: new FormControl(),
        avatarUrl: new FormControl(),
        clientName: new FormControl(),
        description: new FormControl(),
        email: new FormControl(),
        name: new FormControl(),
        numLikes: new FormControl(),
        phone: new FormControl(),
      }
    );

    if (card) {
      this.mainPhotoUrl = card.mainPhotoUrl;
      this.form.patchValue({
        ...card,
        name: this.userService.authState.displayName,
        email: this.userService.authState.email,
        avatarUrl: this.userService.authState.photoURL
      });
      const controls = this.form.controls;
      controls.email.disable();
      controls.name.disable();
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._dialogRef = this.matDialog.open(this.registerDialog, {
        disableClose: true
      });

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

  async onSaveData(): Promise<void> {
    if (this.form.dirty) {
      const payload = {
        ...this.form.getRawValue(),
        name: this.userService.authState.displayName,
        avatarUrl: this.userService.authState.photoURL
      };
      this.apiService.updateData(payload, this._file);
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    this.loadingImage = true;

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this._file = file;
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.form.markAsDirty();
        this.mainPhotoUrl = reader.result as string;
        this.loadingImage = false;
      };
    }
  }
}
