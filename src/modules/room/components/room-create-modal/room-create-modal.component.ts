import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomType } from '../../room.model';
import { RoomService } from '../../services/room.service';

export class CreateRoomFormModel {
  name: string = "";
  type: RoomType = RoomType.Text;
}

@Component({
  selector: 'app-room-create-modal',
  templateUrl: './room-create-modal.component.html',
  styleUrls: ['./room-create-modal.component.less']
})
export class RoomCreateModalComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  @Output()
  refresh: EventEmitter<any> = new EventEmitter();;

  isVisible: boolean = false;
  model = new CreateRoomFormModel();

  constructor(private roomService: RoomService) {

  }

  ngOnInit(): void {
  }

  async onOk() {
    if (this.model.name !== "" && this.model.name !== undefined && this.model.type !== undefined) {
      // TODO invoquer la méthode create du RoomService
      this.roomService.create(this.model.name, this.model.type)
      this.refresh.emit();
      this.close();
    }
  }

  onCancel() {
    this.close();
  }

  open() {
    this.isVisible = true;
    setTimeout(() => this.form.resetForm(new CreateRoomFormModel()))
  }

  close() {
    this.isVisible = false;
  }
}
