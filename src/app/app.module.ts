import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './services/post.service';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsComponent } from './components/tags/tags.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PostEditorComponent } from './components/admin/post-editor/post-editor.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CommentListComponent } from './components/comments/comment-list/comment-list.component';
import { CommentFormComponent } from './components/comments/comment-form/comment-form.component';

@NgModule({
    declarations: [
        AppComponent,
        PostComponent,
        NotfoundComponent,
        BlogComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        AboutComponent,
        ContactComponent,
        TagsComponent,
        LoginComponent,
        RegisterComponent,
        AdminDashboardComponent,
        PostEditorComponent,
        CommentListComponent,
        CommentFormComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
    ],
    providers: [
        PostService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
