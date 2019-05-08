import { Component, AfterViewInit, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../shared/core/services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { NotificationService, ApiService } from '@webeleza/services';
import { ICardInfo } from '@webeleza/models';

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
  public mainPhotoUrl: string;

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
        mainPhotoUrl: new FormControl(),
        numLikes: new FormControl(),
        phone: new FormControl(),
      }
    );

    if (card) {
      this.mainPhotoUrl = card.mainPhotoUrl;
      this.form.patchValue(card);
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

  onSaveData(): void {
    if (this.form.dirty) {
      const payload = {
        ...this.form.getRawValue(),
        name: this.userService.authState.displayName,
        mainPhotoUrl: this.mainPhotoUrl,
        avatarUrl: this.userService.authState.photoURL
      };
      this.apiService.updateData(payload);
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      this.apiService.uploadImage(file)
        .then((url) => {
          this.mainPhotoUrl = url;
          this.form.markAsDirty();
          // console.log('uploaded', url);
          this.onSaveData();
          this.notificationService.showSucess('Imagem alterada com sucesso!');
        }).catch((error) => {
          this.notificationService.showError('Error ao fazer upload');
        });
    }
  }
}
