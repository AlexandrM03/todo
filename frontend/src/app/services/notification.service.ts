import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor() { }

    requestPermission(): void {
        if (!('Notification' in window)) {
            console.log('This browser does not support desktop notification');
        } else {
            Notification.requestPermission().then(permission => {
                if (permission !== 'granted') {
                    console.log('Permission not granted for Notification');
                }
            });
        }
    }

    showNotification(title: string, options?: NotificationOptions): void {
        if (!('Notification' in window)) {
            console.log('This browser does not support desktop notification');
        } else if (Notification.permission === 'granted') {
            new Notification(title, options);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification(title, options);
                }
            });
        }
    }
}
