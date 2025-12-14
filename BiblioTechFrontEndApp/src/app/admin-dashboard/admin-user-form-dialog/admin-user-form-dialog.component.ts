import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService, User } from '../../service/user.service';

@Component({
  selector: 'app-admin-user-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './admin-user-form-dialog.component.html',
  styleUrls: ['./admin-user-form-dialog.component.css']
})
export class AdminUserFormDialogComponent {
  form: FormGroup;
  hidePassword = true;
  isEditMode = false;
  loading = false;
  errorMessage: string | null = null;
  roles = ['client', 'admin'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<AdminUserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.isEditMode = !!data && !!data.id;
    
    this.form = this.fb.group({
      username: [
        data?.username || '',
        [Validators.required, Validators.minLength(3)]
      ],
      name: [
        data?.name || '',
        [Validators.required, Validators.minLength(2)]
      ],
      email: [
        data?.email || '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        this.isEditMode
          ? [Validators.minLength(6)]
          : [Validators.required, Validators.minLength(6)]
      ],
      role: [
        (data?.roles && data.roles.length > 0 ? data.roles[0] : 'client') || 'client',
        Validators.required
      ]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const formValue = this.form.value;
    const user: User = {
      id: this.data?.id,
      username: formValue.username,
      name: formValue.name,
      email: formValue.email,
      password: formValue.password || this.data?.password || '',
      roles: [formValue.role]
    };

    const request = this.isEditMode
      ? this.userService.updateUser(user.id!, user)
      : this.userService.register(user);

    request.subscribe({
      next: (result) => {
        this.loading = false;
        this.dialogRef.close(result);
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.errorMessage = err.error?.message || 'Une erreur est survenue.';
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
