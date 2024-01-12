import { Component } from '@angular/core';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {


  addItemDone() {
    console.log("add item");

  }

  addItemProgress() {
    console.log("add item");
  }

  addItemTodo() {
    console.log("add item");
  }
}
