import { Injectable } from '@angular/core';
import { AppDB } from '../db';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  readonly db: AppDB = new AppDB();
}
