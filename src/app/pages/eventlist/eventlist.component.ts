import { Component } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
})
export class EventlistComponent {
  events: any = []; // Original event data
  filteredEvents: any = []; // Search-filtered event data
  searchTerm: string = ''; // Search term

  constructor(private eventService: EventsService) {
    this.fetchEvents(); // Fetch users on component initialization
  }

  // Fetch all users from the service
  fetchEvents() {
    this.eventService.getData().subscribe(
   
      (response:any) => {
        console.log(response.data)
        this.events = response.data;
        this.filteredEvents = response.data;
       
      },
      (error:AnyCatcher) => {
        console.error(error);
      }
    );
  }

  deleteUser(id: any) {
    this.eventService.deleteUser(id).subscribe(() => {
      this.fetchEvents();
    });
  }

  onSearch() {
    const searchLower = this.searchTerm.toLowerCase();
    this.filteredEvents = this.events.filter((event: any) =>
      event.title.toLowerCase().includes(searchLower)
    );
  }
}
