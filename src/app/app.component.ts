import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
 import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService,
    private router: Router
   ){
    this.authService.appUser$.subscribe(user => {
      if (!user) {
      return;
      } else {
      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) {
      return;
      }
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
      }
      })

  }
  title = 'blogsite';
}
