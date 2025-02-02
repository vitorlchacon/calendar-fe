import { SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export class User {
  userId: string;
  username: string;
  email: string;
  emailVerified: boolean;
  fullName: string;
  firstName: string;
  lastName: string;
  roles!: string[];
  birthday!: Date;
  weight!: string;
  height!: string;
  profilePhoto!: string;
  createdAt!: Date;
  updatedAt!: Date;
  private objectUrls: string[] = [];
  private sanitizer!: DomSanitizer

  constructor(userInfo: any, sanitizer: DomSanitizer) {
    this.userId = userInfo.id || userInfo.userId || '';
    this.username = userInfo.username || '';
    this.email = userInfo.email || '';
    this.roles = userInfo.roles || []; 
    this.birthday = userInfo.birthday || ''; 
    this.weight = userInfo.weight || ''; 
    this.height = userInfo.height || ''; 
    this.emailVerified = userInfo.emailVerified;
    this.firstName = userInfo.firstName || '';
    this.lastName = userInfo.lastName || '';
    this.fullName = this.firstName + ' ' + this.lastName;
    this.profilePhoto = userInfo.profilePhoto || '';
    this.createdAt = userInfo.createdAt || '';
    this.updatedAt = userInfo.updatedAt || '';
  }

  private handleProfilePhotoBlob(blob: Blob): void {
    this.profilePhoto = this.createSafeObjectUrl(blob);
  }

  private handleProfilePhotoString(imageData: string): void {
    if (imageData.startsWith('data:')) {
      const blob = this.dataUriToBlob(imageData);
      this.profilePhoto = this.createSafeObjectUrl(blob);
    } else {
      this.profilePhoto = imageData;
    }
  }

  private dataUriToBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([arrayBuffer], { type: mimeString });
  }

  private createSafeObjectUrl(blob: Blob): string {
    const url = URL.createObjectURL(blob);
    this.objectUrls.push(url);
    return this.sanitizer.sanitize(SecurityContext.URL, url) || '';
  }
  
  private loadDefaultImage(): void {
    this.profilePhoto = this.sanitizer.sanitize(SecurityContext.URL, 'assets/img/user_thumb.jpeg') || '';
    console.log('loadDefaultImage ' + this.profilePhoto)
  }

  destroy() {
    this.objectUrls.forEach(url => URL.revokeObjectURL(url))
  }
}
