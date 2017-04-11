import { Injectable } from '@angular/core';

@Injectable()
export class AttachService {
  urlPrefix: string = 'http://localhost:24544/AttachFile/Download/'; 
  constructor() {
  }
}