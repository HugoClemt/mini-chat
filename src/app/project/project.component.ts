import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Task, TaskForm } from '../interface/projet.interface';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  projectService = inject(ProjectService);

  changed = false;

  projetForm = new FormGroup({
    id: new FormControl("", {nonNullable: true, updateOn: "blur"}),
    title: new FormControl("", {nonNullable: true,  updateOn: "blur"}),
    tasks: new FormArray<FormGroup<TaskForm>>([]),
    status: new FormArray<FormControl<string>>([])
  })

  ngOnInit() {
    let project = this.projectService.get()
    if (project) {
      const {tasks, status, ...rest} = project;
      this.projetForm.patchValue(rest);
      tasks.forEach(task => this.addTask(task));
      status.forEach(status => this.addStatus(status));
    }
    this.projetForm.valueChanges.subscribe(e => {
      this.changed = true;
      this.update();
    });
  }

  addStatus(status?: string) {
    let control : FormControl<string> = new FormControl
    if (status) {
      control.setValue(status);
    }
    this.projetForm.controls.status.push(control);
  }

  get projet() {
    return this.projetForm.value;
  }

  addTask (task?: Task) {
    let form = new FormGroup<TaskForm>({
      title : new FormControl("", {nonNullable : true, updateOn: "blur"}),
      description : new FormControl("", {nonNullable : true, updateOn: "blur"}),
      status : new FormControl("", {nonNullable : true, updateOn: "blur"}),
      start : new FormControl("", {nonNullable : true, updateOn: "blur"}),
      end : new FormControl("", {nonNullable : true, updateOn: "blur"})
    })
    if (task) {
      form.patchValue(task);
    }
    this.projetForm.controls.tasks.push(form);
  }

  update() {
    this.projectService.update(this.projetForm.getRawValue());
    this.changed = false;
    console.log("save");
  }
}
