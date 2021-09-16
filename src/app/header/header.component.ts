import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {AuthService} from "angularx-social-login";
import * as $ from 'jquery';
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , AfterViewInit {
  notificationCount = 0;

  isLogin = false;
  name: string;
  constructor(public appService: AppService,
              private authService: AuthService,
              private router: Router,
              private restService: DataService
  ) {
  }


  logout() {
    localStorage.removeItem('auth_token_deliver');
    localStorage.removeItem('refresh_token');
    this.authService.signOut();
    window.location.reload();
  }



  refresh() {
    window.location.reload();

  }

  navigate(){
    this.router.navigateByUrl('/home');
  }


  ngAfterViewInit() {
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function (event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
          &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }

            });
          }
        }
      });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});

  }

  ngOnInit(): void {
    this.appService.isUserLoggedIn.subscribe(value => {
      if (value) {
        this.isLogin = true;
      }
    });

    this.restService.notificationCount.subscribe(value => {
      if (value) {
        this.notificationCount = value;
      } else {
        this.notificationCount = 0;
      }
    });

  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();

      if (scrollTop > 80) {
        $('.header').addClass('filter-fixed');

      } else {
        $('.header').removeClass('filter-fixed');

      }
    });
  }

}
