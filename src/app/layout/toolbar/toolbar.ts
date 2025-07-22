import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css']
})
export class Toolbar {}
