import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-descarga',
  templateUrl: './descarga.component.html',
  styleUrls: ['./descarga.component.css']
})
export class DescargaComponent implements OnInit {


  searchForm: FormGroup;
  constructor() {
    this.searchForm = new FormGroup({
      fechaDesde: new FormControl('', Validators.required),
      fechaHasta: new FormControl('', Validators.required),
      propietario: new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
  }

}
