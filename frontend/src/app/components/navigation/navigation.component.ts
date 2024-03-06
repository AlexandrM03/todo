import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Route, Router, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [MatSidenavModule, MatListModule, RouterModule, CommonModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css'
})
export class NavigationComponent {
    // from upper case
    routes = routes.filter(r => r.path !== '').map(r => {
        return {
            path: '/' + r.path,
            name: r.path!.charAt(0).toUpperCase() + r.path!.slice(1)
        }
    })

    constructor(private router: Router) {
    }
}
