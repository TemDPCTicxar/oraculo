import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  userName = 'Usuario'; // Puedes reemplazar esto con datos del usuario desde un servicio

  ngOnInit(): void {
    // Al cargar el componente, verificamos si hay usuario en localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.firstName) {
      this.userName = `${user.firstName} ${user.lastName}`;
    }
  }
}
