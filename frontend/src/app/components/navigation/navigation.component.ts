import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';


@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [MatSidenavModule, MatListModule, RouterModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css'
})
export class NavigationComponent {
    constructor(private router: Router) { }
}
