import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-json-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './json-upload.component.html',
  styleUrl: './json-upload.component.scss'
})
export class JsonUploadComponent {
  jsonContent: any = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      try {
        this.jsonContent = JSON.parse(reader.result as string);
      } catch (error) {
        alert('Invalid JSON file.');
        console.error(error);
      }
    };

    reader.readAsText(file);
  }

  toggleActive(user: any): void {
    user.isActive = !user.isActive;
  }

  get activeUsers() {
    return this.jsonContent?.filter((user: any) => user.isActive);
  }

   clearJson(): void {
    this.jsonContent = null;
  }
} 
