import { Component } from '@angular/core';
import { Buffer } from 'buffer';
import { AuthService } from '../../../../core/auth/auth.service';
import { UserService } from '../user.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { User } from '../../../model/user.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ CommonModule, CardModule, AvatarModule, BadgeModule, TableModule, FileUploadModule ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class UserProfileComponent {
  user: User;
  test = "test";
  reader = new FileReader();

  constructor(private authService: AuthService, private userService: UserService, private http: HttpClient) {
    this.user = this.authService.getUser();
    this.userService.getMyUser(this.user).subscribe(res => 
      { 
        this.user.birthday = res.birthday
        this.user.createdAt = res.createdAt
        this.user.updatedAt = res.updatedAt
        this.user.profilePhoto = res.profilePhoto
        if (!res.profilePhoto) {
          this.http.get('assets/img/user_thumb.jpeg', {responseType: 'blob'})
          .subscribe(userThumb => {
              this.reader.readAsDataURL(userThumb)
            });
          }
      }
    )
  }

  onFileSelected(event: any) {
    this.reader.onload = (e: any) => {
      this.user.profilePhoto = e.target.result;
      this.userService.saveUser(this.user).subscribe(res => 
        { 
          console.log(this.user)
          this.user = res
          console.log(this.user)
        });
    };
    this.reader.readAsDataURL(event.files[0]);
    
  }

  private base64toBlob(base64Data: any, contentType: any): Blob {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = Buffer.from(base64Data, 'base64').toString('latin1');
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
}
