import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-uploader-component',
  templateUrl: './file-uploader-component.component.html',
  styleUrls: ['./file-uploader-component.component.scss']
})
export class FileUploaderComponentComponent {
  selectedFiles: File[] = [];
  selectedFiles2: File[] = [];
  selectedFiles3: File[] = [];
  constructor(private http: HttpClient) {}

  handleFileChange(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  handleFileChange2(event: any): void {
    this.selectedFiles2 = Array.from(event.target.files);
  }
  handleFileChange3(event: any): void {
    this.selectedFiles3 = Array.from(event.target.files);
  }

  uploadFiles(): void {
    if (this.selectedFiles.length === 0) return;

    const chunkSize = 1024 * 1024; // 1MB chunk size

    this.selectedFiles.forEach((file) => {
      const totalChunks = Math.ceil(file.size / chunkSize);
      let chunkIndex = 0;
      const fileName = file.name;
      const fileExtension = this.getFileExtension(fileName);
      const uploadChunk = (start: number, end: number): void => {
        const chunk = file.slice(start, end);

        // Create headers with chunk information
        const headers = new HttpHeaders({
          'Content-Type': 'application/octet-stream',
          'X-Chunk-Index': String(chunkIndex),
          'X-Total-Chunks': String(totalChunks),
        });

        // Send the chunk to the server
        this.http
          .post(`http://localhost:5080/api/FileUpload/upload/${fileName}/${fileExtension}`, chunk, { headers })
          .subscribe((response) => {
            // Handle response from the server, e.g., success or error handling
            console.log(response);
            chunkIndex++;

            // Upload next chunk if there are more chunks remaining
            if (chunkIndex < totalChunks) {
              uploadChunk(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);
            } else {
              // All chunks uploaded for the current file
              console.log(`File '${file.name}' upload complete.`);
            }
          });
      };

      uploadChunk(0, chunkSize);
    });
  }


  uploadFiles2(): void {
    if (this.selectedFiles2.length === 0) return;

    this.selectedFiles2.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);

      const headers = new HttpHeaders();
      headers.append('Content-Disposition', `attachment; filename="${file.name}"`);

      this.http.post('http://localhost:5080/api/FileUpload/Upload1', formData, { headers }).subscribe(
        (response) => {
          console.log(response);
        }     
      );
    });
  }

  uploadFiles3(): void {
    if (this.selectedFiles2.length === 0) return;

    this.selectedFiles2.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);

      const headers = new HttpHeaders();
      headers.append('Content-Disposition', `attachment; filename="${file.name}"`);

      this.http.post('http://localhost:5080/api/FileUpload/UploadLargeFile', formData, { headers }).subscribe(
        (response) => {
          console.log(response);
        }     
      );
    });
  }
   
  
  getFileExtension(fileName: string): string {
    const parts = fileName.split('.');
    return parts[parts.length - 1];
  }
}
