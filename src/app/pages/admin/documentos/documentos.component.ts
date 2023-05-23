import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { documento } from 'src/app/interfaces/interfaces';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
})
export class DocumentosComponent implements OnInit {
  agregarForm: FormGroup;
  dataSourceEventos = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  eventoColumns: string[] = [
    'regionPatencion',
    'dpiUsuario',
    'nombreUsuarioAtencion',
    'codigoCargo',
    'accion',
  ];

  constructor(private documentoServicio: DocumentoService) {
    this.agregarForm = new FormGroup({
      fechaElaboracion: new FormControl('', [Validators.required]),
      propietario: new FormControl('', [Validators.required]),
    });

    this.selectedFiles = [];
  }
  archi: any;

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEventos.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEventos.paginator) {
      this.dataSourceEventos.paginator.firstPage();
    }
  }

  selectedFiles: any[];

  guardar() {
    if (this.agregarForm.valid && this.selectedFiles.length > 0) {
      const formData = new FormData();

      formData.append('propietario', this.agregarForm.get('propietario').value);
      formData.append('fecha', this.agregarForm.get('fechaElaboracion').value);
      formData.append('usuarioCreacion', '1');

      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('file', this.selectedFiles[i]);
      }

      this.documentoServicio.saveDocumento(formData).subscribe(
        (response) => {
          Swal.fire({
            title: 'El archivo fue enviado correctamente.',
            text: '',
            icon: 'success',
          });
          this.selectedFiles = null;
          this.agregarForm.reset();
        },
        (error) => {
          console.error('Error al guardar el documento:', error);
        }
      );
    }
  }

  formDataToJSON(formData) {
    const json = {};
    for (const [key, value] of formData.entries()) {
      json[key] = value;
    }
    return JSON.stringify(json);
  }

  onFilesSelected(event: any): void {
    this.selectedFiles= Array.from(event.target.files);
  }
  
  

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  getFileName(file: File): string {
      return file.name;   
  }
  
}
