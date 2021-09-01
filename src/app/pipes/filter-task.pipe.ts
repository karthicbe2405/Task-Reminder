import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'filterTask',
  pure:false
})
export class FilterTaskPipe implements PipeTransform {

  transform(value: Task[], username : String): Task[] {
    
    if(username == '' || value.length == 0){
      return value;
    }
    else{
      let filteredTask = value.filter( (task) =>{
        if(task.assignedTo == username)
          return true;
        else
          return false;
      });

      return filteredTask;
    }

  }

}
