import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private apiUrl = 'api';  // URL to web api
  constructor(private http: Http) {
    this.http.get(this.apiUrl)
      .toPromise()
      .then(response => console.log("api return data:",response.json()))
      .catch(this.handleError);
  };
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
