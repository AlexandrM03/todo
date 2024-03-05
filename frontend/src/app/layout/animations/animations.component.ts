import { AnimationBuilder, AnimationPlayer, animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';

@Component({
    selector: 'app-animations',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './animations.component.html',
    styleUrl: './animations.component.css',
    animations: [
        trigger('bounce', [
            state('inactive', style({
                transform: 'translateY(0)'
            })),
            state('active', style({
                transform: 'translateY(-10px)'
            })),
            transition('inactive <=> active', animate('200ms ease-in'))
        ])
    ]
})
export class AnimationsComponent {
    columns = [
        { bounce: 'inactive' },
        { bounce: 'inactive' },
        { bounce: 'inactive' }
    ];
    rotate = false;

    bounceColumn() {
        this.columns.forEach((column, index) => {
            setTimeout(() => {
                column.bounce = 'active';
                setTimeout(() => {
                    column.bounce = 'inactive';
                }, 200);
            }, index * 200);
        });
    }

    toggleRotate() {
        this.rotate = !this.rotate;
    }
}
