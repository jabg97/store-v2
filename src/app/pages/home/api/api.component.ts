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
  templateUrl: "./api.component.html",
  styleUrls: ["./api.component.css"],
  selector: "app-api"
})
export class ApiComponent implements OnInit {
  items: Array < any > ;
  title: any;
  is_auth = false;
  key = "pk.eyJ1IjoiamFpdmVyMSIsImEiOiJja2NkamNuOTIwMDV5MnNuM3loNGJwMzI3In0.JD94ABRcJ3_6W-J4t1OVpw";
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public navService: SideNavService,
    private _api: ApiService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService) {
  

    this.items = [];
    this.title = "";
  }


  ngOnInit() {
    if (this._api.isLoggedIn) {
      this.is_auth = true;
    }


      const snackBar = this.snackBar;
 
        this.spinner.show();
        this._api.json().subscribe(data => {
          console.log(data);
          this.spinner.hide();
     
            this.items = data;
            this.title = "Api Maps";
            snackBar.open("Información Obtenida", '', {
              duration: 2000
            });
          

        });
    
  }
}
