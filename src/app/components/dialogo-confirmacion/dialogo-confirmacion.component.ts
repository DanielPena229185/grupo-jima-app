import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DatosDialogoDTO, DialogRespuesta } from './dialogo-confirmacion.types';

@Component({
  selector: 'app-dialogo-confirmacion',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrl: './dialogo-confirmacion.component.css'
})
export class DialogoConfirmacionComponent {

  constructor(public dialogRef: MatDialogRef<DialogoConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosDialogoDTO) { }

  confirmar() {
    this.data.dialogRespuesta = DialogRespuesta.CONFIRMAR;
    this.dialogRef.close(this);
  }

  cancelar() {
    this.data.dialogRespuesta = DialogRespuesta.CANCELAR;
    this.dialogRef.close(this);
  }
}
