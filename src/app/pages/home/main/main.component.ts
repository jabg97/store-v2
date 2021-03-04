import {
  Component,
  OnInit
} from "@angular/core";
import {
  ActivatedRoute,
  Router,
  ParamMap
} from "@angular/router";
import {
  ApiService
} from "../../../services/api.service";
import {
  SideNavService
} from "src/app/services/side-nav.service";
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  NgxSpinnerService
} from "ngx-spinner";
@Component({
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
  selector: "app-main"
})
export class MainComponent implements OnInit {
  products: Array < any > ;
  title: any;
  is_auth = false;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public navService: SideNavService,
    private _api: ApiService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService) {
  

    this.products = [];
    this.title = "";
  }

   add(id,user) {
    let requestData = {
      "product_id": id,
      "user_id": user
    }
    const snackBar = this.snackBar;
    this.spinner.show();
    this._api.add(requestData).subscribe(data => {
      console.log(data);
      this.spinner.hide();
      if (data.status == 200) {
        this.navService.details = data.details;
        snackBar.open(data.message, '', {
          duration: 2000
        });
      } else {
        snackBar.open(data.message, '', {
          duration: 2000
        });
      }

    });
  }

  ngOnInit() {
    if (this._api.isLoggedIn) {
      this.is_auth = true;
    }
    this.activatedRoute.paramMap.subscribe((param) => {

      const snackBar = this.snackBar;
      if (this.router.url.includes("/query")) {
        this.spinner.show();
        this._api.query(this._api.getQuery).subscribe(data => {
          console.log(data);
          this.spinner.hide();
          if (data.status == 200) {
            this.products = data.products;
            this.title = "Resultado Busqueda";
          } else {
            snackBar.open(data.message, '', {
              duration: 2000
            });
          }

        });
      } else {
        this.spinner.show();
        this._api.index().subscribe(data => {
          console.log(data);
          this.spinner.hide();
          if (data.status == 200) {
            this.products = data.products;
            this.title = "Productos";
          } else {
            snackBar.open(data.message, '', {
              duration: 2000
            });
          }

        });
      }
    });
  }
}
