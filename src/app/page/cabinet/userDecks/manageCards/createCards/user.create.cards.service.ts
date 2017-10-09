import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {ORLPService} from '../../../../../services/orlp.service';
import {AdminDeck} from '../../../../../dto/AdminDTO/admin.deck.DTO';
import {CreateCardDTO} from '../../../../../dto/CardsDTO/CreateCardDTO';
import {DTOConverter} from '../../../../../dto/dto.converter';



@Injectable()
export class UserCreateCardsService {

  constructor(private orlp: ORLPService) {
  }
  public createCard(createCardDTO: CreateCardDTO, categoryId: number, deckId: number ) {
    return this.orlp.post('/api/category/' + categoryId + '/decks/' + deckId + '/cards', createCardDTO)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  public getDeck(url: string): Observable<AdminDeck> {
    return this.orlp.get(url)
      .map((response: Response) => <AdminDeck> DTOConverter.jsonToAdminDeck(response.json()));
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
