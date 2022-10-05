import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private users: User[] = [];
  private id = 0;

  list() {
    return this.users;
  }

  getOne(id: number) {
    return this.users.find((u) => u.id === id);
  }

  add(user: User) {
    user.id = this.id++;
    this.users.push(user);
  }

  update(user: User) {
    try {
      const index = this.users.findIndex((u) => u.id === user.id);
      this.users[index] = user;
    } catch (error) {
      console.log(error);
    }
  }

  delete(user: User) {
    try {
      const index = this.users.findIndex((u) => u.id === user.id);
      this.users.splice(index, 1);
    } catch (error) {
      console.log(error);
    }
  }
}
