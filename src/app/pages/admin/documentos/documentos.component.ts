import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
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
    'accion'
  ];

  constructor() {
    this.agregarForm = new FormGroup({
      numeroDocumento: new FormControl('', [Validators.required]),
      fechaElaboracion: new FormControl('', [Validators.required]),
      propietario: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEventos.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEventos.paginator) {
      this.dataSourceEventos.paginator.firstPage();
    }
  }
}
