import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ManageCardsService} from './manage.cards.service';
import {Subscription} from 'rxjs/Subscription';
import {CardPublic} from '../../../dto/CardsDTO/public.card.DTO';
import {AdminDeck} from '../../../dto/AdminDTO/admin.deck.DTO';
import {ORLPService} from '../../../services/orlp.service';
import {Link} from '../../../dto/link';
import {CardImage} from '../../../dto/card-image-dto/card-image';
import {CardUpdateDTO} from '../../../dto/CardsDTO/CardUpdateDTO';


@Component({
  providers: [ManageCardsService],
  templateUrl: ('./manage.cards.component.html'),
  styleUrls: ['./manage.cards.css']
})

export class ManageCardsComponent implements OnInit {
  public edit = false;
  public cards: CardPublic[] = [];
  public deck: AdminDeck;
  public card: CardPublic;
  public question: string;
  public answer: string;
  public title: string;
  public rating: number;
  public images: CardImage[] = [];
  public imgArray: string[] = [];
  public nameOfPageToBack: string;
  public selectedItem: number;
  public listOfCardsMessage = 'Loading...';
  private url: string;
  private sub: Subscription;

  constructor(private manageCardsService: ManageCardsService, private route: ActivatedRoute,
              private orlp: ORLPService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        const url = params['url'];
        const nameOfPageToBack = params['nameOfPageToBack'];
        this.url = url;
        this.nameOfPageToBack = nameOfPageToBack;
      }
    );
    this.takeDeck();
  }

  public getDeckLink(link: Link): string {
    return this.orlp.getShortLink(link);
  }

  deleteSelectedCard() {
    this.manageCardsService.deleteSelectedCard(this.decodeCardLink(this.getShortCardLink(this.card.self)))
      .subscribe(() => {
        this.getCardsList();
        this.card = null;
      });
  }

  public changeEditStatus() {
    this.edit = true;
  }

  public cancelEdit(card: CardPublic) {
    this.edit = false;
    this.card.title = this.title;
    this.card.answer = this.answer;
    this.card.question = this.question;
    this.imgArray = [];
  }

  loadImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (file: any) => {
        this.images.push(new CardImage(file.target.result));
        this.imgArray.push(file.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public updateCard(card: CardPublic) {
    this.edit = false;
    this.manageCardsService
      .updateSelectedCard(this.decodeCardLink(this.getShortCardLink(this.card.self)),
        new CardUpdateDTO(card.title, card.question, card.answer, this.imgArray));
    this.imgArray = [];
  }

  public onChangeSelectedItemColor(event, item: number) {
    this.selectedItem = item;
  }

  public deleteCardImage(cardImageIndex: number) {
    if (this.edit) {
      if (this.images[cardImageIndex].id != null) {
        this.manageCardsService.deleteCardImage(this.images[cardImageIndex].id);
      }
      this.images.splice(cardImageIndex, 1);
    }
  }

  private decodeLink(): void {
    this.url = this.orlp.decodeLink(this.url);
  }

  private takeDeck(): void {
    this.decodeLink();
    this.manageCardsService.getDeck(this.url).subscribe(
      deck => {
        this.deck = deck;
        this.getCardsList();
      });
  }

  private getCardsList() {
    this.manageCardsService.getCards(this.deck.deckId).subscribe(cards => {
      this.cards = cards;
      this.listOfCardsMessage = 'List of cards is empty';
    });
  }

  private getShortCardLink(linkSelectedCard: Link) {
    return this.orlp.getShortLink(linkSelectedCard);
  }

  private decodeCardLink(cardLink: string) {
    return this.orlp.decodeLink(cardLink);
  }

  private onCardClicked(card: CardPublic): void {
    this.edit = false;
    this.card = card;
    this.title = card.title;
    this.question = card.question;
    this.answer = card.answer;
    this.images = card.images;
  }
}
