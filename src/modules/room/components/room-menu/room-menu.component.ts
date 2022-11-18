import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedStore } from 'src/modules/feed/feed.store';
import { Room } from '../../room.model';
import { RoomStore } from '../../room.store';
import { RoomQueries } from '../../services/room.queries';
import { RoomService } from '../../services/room.service';
import { RoomSocketService } from '../../services/room.socket.service';
import * as roomModal from "../room-create-modal/room-create-modal.component";
@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.less']
})
export class RoomMenuComponent implements OnInit {
  roomId$: Observable<string | undefined>;

  rooms: Room[];

  @ViewChild(roomModal.RoomCreateModalComponent)
  roomModalComponent: roomModal.RoomCreateModalComponent;

  constructor(private feedStore: FeedStore, private queries: RoomQueries, private roomSocketService: RoomSocketService, private router: Router,) {
    this.roomId$ = feedStore.roomId$;
    this.rooms = [];
    this.roomSocketService.onNewRoom(room => { this.rooms.push(room) })
  }

  async ngOnInit() {
    this.rooms = await this.queries.getAll();
    // console.log(localStorage.getItem('lastVisited'))

    if (localStorage.getItem('lastVisited') === null && this.feedStore.value.roomId === undefined) this.goToRoom(this.rooms[0]);
    else if (localStorage.getItem('lastVisited') !== null) {

      if (localStorage.getItem('lastVisited') === "default")
        this.goToRoom(this.rooms[0])
      else
        // @ts-ignore
        this.goToRoom(this.rooms[+localStorage.getItem('lastVisited')])
    }

  }

  goToRoom(room: Room) {
    // TODO naviguer vers app/[id de la room]
    if (room === undefined) room = this.rooms[0]
    localStorage.setItem("lastVisited", room.id);
    this.router.navigate(['app/' + room.id])
  }

  goToLastRoom() {
    this.queries.getAll().then(all => {
      this.rooms = all;
      this.goToRoom(this.rooms[this.rooms.length - 1]);
    });
  }
}
