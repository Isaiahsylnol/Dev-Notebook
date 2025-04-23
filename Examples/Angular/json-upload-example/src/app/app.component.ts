import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonUploadComponent } from './json-upload/json-upload.component';
import { NavComponent } from "./components/nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonUploadComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'json-upload-example';
}
