import {Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ORLPService} from '../../../../services/orlp.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AccountVerificationService {
  private subject = new BehaviorSubject(false);
  private _controllerUrl = 'api/registration-confirm';

  constructor(private orlp: ORLPService) {
  }

  accountVerificate(token: string): Observable<Response> {
    return this.orlp.post(this._controllerUrl, token);
  }

  sendMessage() {
    this.subject.next(!this.subject.getValue());
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
