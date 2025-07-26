import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service.js';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  constructor(private flowbiteService: FlowbiteService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  isDarkMode = false;
  isBrowser: boolean;
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      console.log('Flowbite loaded', flowbite);
    });
    if (this.isBrowser) {
      this.isDarkMode = localStorage.getItem('theme') === 'dark';
      this.applyTheme();
    }
  }
  toggleDarkMode(): void {
    if (!this.isBrowser) return;
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme(): void {
    if (!this.isBrowser) return;
    const html = document.documentElement;
    if (this.isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}