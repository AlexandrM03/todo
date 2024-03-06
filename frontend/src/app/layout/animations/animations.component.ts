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
        ]),
        trigger('bounceCol', [
            transition('normal => hovered', [
                query('tr > td:first-child', [
                    style({ transform: 'translateY(0)' }),
                    stagger(250, [
                        animate('500ms ease-out', style({ transform: 'translateY(-10px)' })),
                        animate('500ms ease-out', style({ transform: 'translateY(0)' }))
                    ])
                ], { optional: true })
            ]),
            transition('hovered => normal', [
                query('tr > td:first-child', [
                    style({ transform: 'translateY(0)' }),
                    stagger(100, [
                        animate('500ms ease-out', style({ transform: 'translateY(0)' }))
                    ])
                ], { optional: true })
            ])
        ])
    ]
})
export class AnimationsComponent {
    bounceState = 'normal';

    togleBounce() {
        this.bounceState = this.bounceState === 'normal' ? 'hovered' : 'normal';
    }

    columns = [
        { bounce: 'inactive' },
        { bounce: 'inactive' },
        { bounce: 'inactive' }
    ];
    rotate = false;

    rows = [
        { col1: '1', col2: '1', col3: '1' },
        { col1: '2', col2: '2', col3: '2' },
        { col1: '3', col2: '3', col3: '3' },
        { col1: '4', col2: '4', col3: '4' },
        { col1: '5', col2: '5', col3: '5' },
        { col1: '6', col2: '6', col3: '6' }
    ]

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
