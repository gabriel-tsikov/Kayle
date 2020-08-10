import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable, Subject } from 'rxjs';

import { IImageCompress } from '../../models/image-compress-state.model';
import { POSSIBLE_TEXT } from '../../../users/constants/image-compress.constants';


@Injectable({
  providedIn: 'root',
})
export class ImageCompressService {
  imageSubject: Subject<IImageCompress> = new Subject<IImageCompress>();
  imageState$: Observable<IImageCompress> = this.imageSubject.asObservable();

  constructor(private imageCompress: NgxImageCompressService) {
  }

  prepareFile(image: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (file) => {
      const url: string | ArrayBuffer = file.target.result;
      this.fileSizeCompress(image, url);
    };
  }

  async fileSizeCompress(img: File, url: string | ArrayBuffer): Promise<void> {
    let currentSize: number = img.size;

    while (currentSize > 499900) {
      await this.imageCompress
        .compressFile(url, -1, 50, 70)
        .then((result: string) => {
          url = result;
          img = this.generateFile(result);
          currentSize = img.size;
        });
    }
    this.imageSubject.next({ image: img, url });
  }

  generateFile(url?: string): File {
    const block: string[] = url.split(';');
    const contentType: string = block[0].split(':')[1];
    const realData: string = block[1].split(',')[1];
    const date: number = new Date().valueOf();
    let text = '';

    for (let i = 0; i < 5; i++) {
      text += POSSIBLE_TEXT.charAt(
        Math.floor(Math.random() * POSSIBLE_TEXT.length),
      );
    }

    const imageName = `${date}.${text}.${contentType}`;
    const imageBlob: Blob = this.formatFileChange(realData);
    return new File([imageBlob], imageName, { type: contentType });
  }

  formatFileChange(dataURI?: string): Blob {
    const byteString: string = window.atob(dataURI);
    const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
    const intArray: Uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], { type: 'image/jpeg' });
  }
}
