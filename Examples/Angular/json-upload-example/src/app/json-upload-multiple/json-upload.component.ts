import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ParsedFile {
  fileName: string;
  data: any[];
}
@Component({
  selector: 'app-json-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './json-upload.component.html',
  styleUrl: './json-upload.component.scss'
})
export class JsonUploadComponent {
  jsonContent: any = null;
  uploadedFiles: ParsedFile[] = [];

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    Array.from(input.files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result as string);
          if (Array.isArray(parsed)) {
            this.uploadedFiles.push({ fileName: file.name, data: parsed });
          } else {
            alert(`${file.name} does not contain a valid JSON array.`);
          }
        } catch (err) {
          alert(`Error parsing ${file.name}`);
          console.error(err);
        }
      };

      reader.readAsText(file);
    });
  }

toggleActive(fileIndex: number, user: any): void {
    user.isActive = !user.isActive;
  }

  getActiveUsers(file: ParsedFile): any[] {
    return file.data.filter(user => user.isActive);
  }

  clearAll(): void {
    this.uploadedFiles = [];
  }
} 
