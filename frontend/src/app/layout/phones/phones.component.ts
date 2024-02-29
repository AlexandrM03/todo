import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';

@Component({
    selector: 'app-phones',
    standalone: true,
    imports: [TableComponent],
    templateUrl: './phones.component.html',
    styleUrl: './phones.component.css'
})
export class PhonesComponent {
    phones: any[] = [
        { model: 'iPhone 12', price: 999, year: 2020, screenSize: '6.1"', color: 'black' },
        { model: 'Samsung Galaxy S20', price: 899, year: 2020, screenSize: '6.2"', color: 'white' },
        { model: 'Google Pixel 5', price: 699, year: 2020, screenSize: '6.0"', color: 'black' },
    ];
}
