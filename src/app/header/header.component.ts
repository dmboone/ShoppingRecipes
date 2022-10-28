import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output() featureSelected = new EventEmitter<string>(); // event info can now be accessed by parent
  
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(feature: string){
    this.featureSelected.emit(feature); //emit this event info to parent (by using $event in app.component.html)
  }
}
