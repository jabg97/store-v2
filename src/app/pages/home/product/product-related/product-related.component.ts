import {
  Component,
  OnInit,
  Input
} from "@angular/core";

@Component({
  selector: "app-product-related",
  templateUrl: "./product-related.component.html",
  styleUrls: ["./product-related.component.css"],
})
export class ProductRelatedComponent implements OnInit {
  constructor() {}

  @Input() products: Array < any > ;
  @Input() more: Array < any > ;
  @Input() url_asset: Array < any > ;
  
  ngOnInit() {}
}
