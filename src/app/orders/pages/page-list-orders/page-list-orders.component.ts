import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss'],
})
export class PageListOrdersComponent implements OnInit {
  public title: string;
  public route: string;
  public label: string;
  public states: string[];
  public collection$: Observable<Order[]>;
  public headers: string[];

  constructor(private ordersService: OrdersService) {
    this.title = 'list of orders';
    this.route = 'add';
    this.label = 'add order';
    this.states = Object.values(StateOrder);
    this.collection$ = this.ordersService.collection$;
    this.headers = [
      'Type',
      'Client',
      'Durée',
      'Tjm HT',
      'Total HT',
      'Total TTC',
      'Etat',
    ];
  }

  ngOnInit(): void {}

  public changeTitle(): void {
    this.title = 'title changed';
  }

  public changeState(item: Order, event: any) {
    const state = event.target.value;
    this.ordersService.changeState(item, state).subscribe((data) => {
      Object.assign(item, data);
    });
  }
}
