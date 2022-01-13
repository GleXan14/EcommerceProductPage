import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { NavbarComponent } from '../app/views/navbar/navbar.component';
import { SideNavbarComponent } from '../app/views/side-navbar/side-navbar.component';
import { ProductDetailComponent } from '../app/views/product-detail/product-detail.component';
import { ProductHomeComponent } from '../app/views/product-home/product-home.component';
import { ProductCartComponent } from './views/product-cart/product-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SideNavbarComponent,
    ProductHomeComponent,
    ProductDetailComponent,
    ProductCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatDialogModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  providers: [],
  entryComponents: [
    ProductDetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
