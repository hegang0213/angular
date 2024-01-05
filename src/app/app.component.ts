import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ClarityModule } from '@clr/angular';
import '@cds/core/icon/register.js';
import { ClarityIcons, trashIcon, plusIcon } from '@cds/core/icon';
import { Todo } from './todo';
ClarityIcons.addIcons(trashIcon, plusIcon);

import { OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    //BrowserModule,
    //BrowserAnimationsModule,
    ClarityModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  task = '';
  executing = false;
  todos:Todo[] = [];

  constructor(private appService: AppService) {

  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.appService.getTodoList().subscribe(
      response => {
        this.todos = response;
      }
    )
  }

  updateTodo(e:unknown, todo:Todo) {
    this.appService.updateTodo(todo).subscribe(
      response => {
        console.log(response);
        this.getList();
      }
    )
  }

  deleteTodo(e:unknown, id:Todo['id']) {
    this.appService.deleteTodo(id).subscribe(
      response => {
        console.log(response);
        this.getList();
      }
    )
  }

  addTodo() {
    this.executing = true;
    this.appService.addTodo({task: this.task, completed: false}).subscribe(
      response => {
        let self = this;
        setTimeout(function(){
          console.log(response);
          self.getList();
          self.executing = false;
        }, 5000);
      }
    )
  }

  submit() {
    this.executing = true;
  }

  done() {
    this.executing = false;
  }
}
