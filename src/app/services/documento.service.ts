import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import baserUrl from './helper';
import { documento } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  constructor(private http: HttpClient) {}

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



  bucarDocumentos(propietario: any, fechaDesde: any, fechaHasta: any) {
    const params = new HttpParams()
      .set('propietario', propietario)
      .set('FechaInicio', fechaDesde)
      .set('FechaFinal', fechaHasta);

    return this.http.get(`${baserUrl}/files/findDocumentosByPropietario`, { params });
  }

  bucarDocumento(nombre:any): Observable<Blob>  {    
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    return this.http.get(`${baserUrl}/files/${nombre}`, { headers, responseType: 'blob' });
  }
 
}
