import { Component, OnInit } from '@angular/core';
import { AppService } from '../app-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  query: any;
  p: number = 1;
  selected='title'
  constructor(private service: AppService,private spinner: NgxSpinnerService) { }
  productData: any = [];
  ngOnInit(): void {
    this.spinner.show();
    this.service.getproductData().subscribe(response => {
      let data = response['products'];
      for (let item in data) {
        this.productData.push(data[item])
      }
      this.sortBy('popularity');
      this.spinner.hide();
      console.log(this.productData);
    });
  }
  onSearchChange(searchKey) {
    this.query = searchKey;
  }
  sortBy(field: string) {
    this.productData.sort((a: any, b: any) => {
        if (Number(a[field]) < Number(b[field])) {
            return 1;
        } else if (Number(a[field]) > Number(b[field])) {
            return -1;
        } else {
            return 0;
        }
    });
    this.productData = this.productData;
}

}
