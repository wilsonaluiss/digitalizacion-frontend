import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders  } from '@angular/common/http';
import baserUrl from './helper';
import { documento } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  
  constructor(private http: HttpClient) { }

  saveDocumento(datos: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data; boundary=<boundary>');
  
    console.log(this.formDataToJSON(datos));
  
    return this.http.post(`${baserUrl}/files/save`, datos, { headers });
  }
  


formDataToJSON(formData) {
  const json = {};
  for (const [key, value] of formData.entries()) {
    json[key] = value;
  }
  return JSON.stringify(json);
}
}
