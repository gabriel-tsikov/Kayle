import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ImageCompressService } from '../../../shared/services/image-compress/image-compress.service';
import { IImageCompress } from '../../../shared/models/image-compress-state.model';
import { changeLoggedUserAvatar } from '../../../store/authentication/actions';
import { ImageValidator } from '../../../shared/validators/image.validator';
import { IAppState } from '../../../store';


@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-picture.component.html',
})
export class EditPictureComponent implements OnInit {
  changeAvatarForm: FormGroup;
  avatarFile: File;
  url: string;

  constructor(private store: Store<IAppState>,
              private formBuilder: FormBuilder,
              private usersService: UsersService,
              private imageCompressService: ImageCompressService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.changeAvatarForm = this.formBuilder.group({
      avatar: ['', [Validators.required, ImageValidator.validateExtension]],
    });
  }

  get avatar(): AbstractControl {
    return this.changeAvatarForm.get('avatar');
  }

  onFileSelected(event): void {
    this.avatarFile = null;
    this.url = '';

    if (event.target?.files.length > 0 && !this.avatar.errors) {
      this.getCompressedImage();
      this.imageCompressService.prepareFile(event.target.files[0]);
    }
  }

  getCompressedImage(): void {
    this.imageCompressService.imageState$.pipe(take(1))
      .subscribe((response: IImageCompress) => {
        this.avatarFile = response.image;
        this.url = response.url as string;
      });
  }

  onSubmit(): void {
    const formData: FormData = new FormData();
    formData.append('avatar', this.avatarFile);

    this.store.dispatch(changeLoggedUserAvatar({
      payload: {
        data: formData,
      },
    }));
  }
}
