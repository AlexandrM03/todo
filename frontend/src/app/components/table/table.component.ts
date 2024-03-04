import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
    // TODO: create animation for hover
})
export class TableComponent implements OnInit {
    @Input() data: any[] = [];
    @Input() headerProperty: string = '';

    properties: string[] = [];
    isMobileView: boolean = false;

    constructor() { }

    ngOnInit() {
        this.detectMobileView();
        window.addEventListener('resize', () => {
            this.detectMobileView();
        });

        if (this.data.length > 0) {
            this.properties = Object.keys(this.data[0]);
            this.properties = this.properties.filter(prop => prop !== this.headerProperty);
        }
    }

    detectMobileView() {
        this.isMobileView = window.innerWidth < 768;
    }

    beautifyKey(key: string): string {
        return key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
    }
}
