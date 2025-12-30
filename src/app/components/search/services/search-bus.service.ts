import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchBusService {
  private readonly _term$ = new BehaviorSubject<string>('');
  readonly term$ = this._term$.asObservable();

  setTerm(term: string) {
    this._term$.next(term ?? '');
  }

  get term(): string {
    return this._term$.getValue();
  }
}
