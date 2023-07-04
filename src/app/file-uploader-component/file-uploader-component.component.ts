import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-uploader-component',
  templateUrl: './file-uploader-component.component.html',
  styleUrls: ['./file-uploader-component.component.scss']
})
export class FileUploaderComponentComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  handleFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadChunks(): void {
    if (!this.selectedFile) return;

    const chunkSize = 1024 * 1024; // 1MB chunk size
    const totalChunks = Math.ceil(this.selectedFile.size / chunkSize);
    let chunkIndex = 0;

    const uploadChunk = (start: number, end: number): void => {
      const chunk = this.selectedFile?.slice(start, end);

      // Create headers with chunk information
      const headers = new HttpHeaders({
        'Content-Type': 'application/octet-stream',
        'X-Chunk-Index': String(chunkIndex),
        'X-Total-Chunks': String(totalChunks),
      });

      // Send the chunk to the server
      this.http
        .post('http://localhost:5003/api/Fileupload/api/upload', chunk, { headers })
        .subscribe((response) => {
          // Handle response from the server, e.g., success or error handling
          console.log(response);
          chunkIndex++;

          // Upload next chunk if there are more chunks remaining
          if (chunkIndex < totalChunks) {
            uploadChunk(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);
          } else {
            // All chunks uploaded
            console.log('File upload complete.');
          }
        });
    };

    uploadChunk(0, chunkSize);
  }
}




