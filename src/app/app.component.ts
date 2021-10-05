import { Component, VERSION } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public path = '';
  public label = '';
  public confidence = '';
  public loading = false;
  constructor(private apiService: ApiService) {}
  analyse() {
    this.loading = true;
    this.apiService
      .post('https://0j9med1ynl.execute-api.us-east-1.amazonaws.com/prod', {
        path: this.path,
      })
      .subscribe((resp: any) => {
        console.log(resp);
        this.label =
          resp.body.CustomLabels[0].Name == 'dirty'
            ? 'dirty floor'
            : resp.body.CustomLabels[0].Name;
        this.confidence = resp.body.CustomLabels[0].Confidence;
        // this.path = '';
        this.loading = false;
      });
  }
  setPath(p) {
    this.path = p;
    this.label = '';
    this.confidence = '';
  }
}
