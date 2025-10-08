import { Component, Inject, Renderer2, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      if ((event as NavigationEnd).urlAfterRedirects.startsWith('/admin')) {
        this.renderer.addClass(this.document.body, 'admin-view-active');
      } else {
        this.renderer.removeClass(this.document.body, 'admin-view-active');
      }
    });
  }
}