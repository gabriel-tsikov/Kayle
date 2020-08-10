import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpInterceptorService } from './services/http-interceptor/http.interceptor';
import { DynamicContentDirective } from './directives/dynamic-content.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ModalComponent } from './components/modal/modal.component';
import { AlertComponent } from './components/alert/alert.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { UnescapePipe } from './pipes/unescape.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    LoaderComponent,
    ModalComponent,
    AlertComponent,
    ShortenPipe,
    DynamicContentDirective,
    AvatarComponent,
    UnescapePipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    LoaderComponent,
    ModalComponent,
    AlertComponent,
    ShortenPipe,
    UnescapePipe,
    AvatarComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    NgxImageCompressService,
  ],
})
export class SharedModule {
}
