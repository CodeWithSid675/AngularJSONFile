import { Component, OnInit } from '@angular/core';
import { AppService } from '../app-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  query: any;
  p: number = 1;
  constructor(private service: AppService) { }
  productData: any = [];
  ngOnInit(): void {
    this.service.getproductData().subscribe(response => {
      let data = response['products'];
      for (let item in data) {
        this.productData.push(data[item])
      }
      this.sortBy('popularity');
      console.log(this.productData);
    })
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
