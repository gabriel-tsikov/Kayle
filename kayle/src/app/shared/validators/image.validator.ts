import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ALLOWED_EXTENSIONS } from '../constants/common.constants';

export class ImageValidator {
  static validateExtension(control: AbstractControl): ValidationErrors | null {
    const extension = (control.value as string)?.split('.').pop();

    for (const allowedExtension of ALLOWED_EXTENSIONS) {
      if (extension.toLowerCase() === allowedExtension) {
        return null;
      }
    }
    return { notAnImage: true };
  }
}
