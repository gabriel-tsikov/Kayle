import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ImageCompressService } from '../../../shared/services/image-compress/image-compress.service';
import { IImageCompress } from '../../../shared/models/image-compress-state.model';
import { ImageValidator } from '../../../shared/validators/image.validator';
import { createPost } from '../../../store/all-posts/actions';
import { IAppState } from '../../../store';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  url: string;
  post: any;
  imageFile: File;
  openPicker = false;

  constructor(private formBuilder: FormBuilder,
              private store: Store<IAppState>,
              private imageCompressService: ImageCompressService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.createPostForm = this.formBuilder.group({
      description: [''],
      location: [''],
      isPublic: ['true'],
      image: ['', [Validators.required, ImageValidator.validateExtension]],
    });
  }

  get image(): AbstractControl {
    return this.createPostForm.get('image');
  }

  get description(): AbstractControl {
    return this.createPostForm.get('description');
  }

  get location(): AbstractControl {
    return this.createPostForm.get('location');
  }

  get isPublic(): AbstractControl {
    return this.createPostForm.get('isPublic');
  }

  onFileSelected(event): void {
    this.imageFile = null;
    this.url = '';

    if (event.target?.files.length > 0 && !this.image.errors) {
      this.getCompressedImage();
      this.imageCompressService.prepareFile(event.target.files[0]);
    }
  }

  getCompressedImage(): void {
    this.imageCompressService.imageState$.pipe(take(1))
      .subscribe((response: IImageCompress) => {
        this.imageFile = response.image;
        this.url = response.url as string;
      });
  }

  onSubmit(): void {
    const formData: FormData = new FormData();
    formData.append('description', escape(this.description.value));
    formData.append('location', this.location.value);
    formData.append('public', this.isPublic.value);
    formData.append('image', this.imageFile);

    this.store.dispatch(
      createPost({
        payload: {
          post: formData,
        },
      }),
    );
  }

  addEmoji(event): void{
    const data = this.createPostForm.get('description');
    data.patchValue(data.value + event.emoji.native);
  }

  triggerPicker(): void {
    this.openPicker = this.openPicker === false;
  }
}
