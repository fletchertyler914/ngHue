import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedBootstrapModule } from './shared-bootstrap.module';

import { AppComponent } from './app.component';

import { HueApiService } from './hueapi.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    SharedBootstrapModule
  ],
  providers: [HueApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
